import { useEffect, useRef } from "react";

/**
 * Ambient "thinking model" behind the hero.
 * A living computation graph — clustered feature spaces, weighted
 * synapses, information packets propagating like inference, and
 * glacial self-reorganization. It should read as a model quietly
 * thinking, never as a particle field. Canvas-rendered, zero DOM churn.
 */

const TAU = Math.PI * 2;

interface NetNode {
  cluster: number;          // cluster index, -1 = isolated feature node
  lx: number; ly: number;   // local offset inside the cluster
  bx: number; by: number;   // base position (isolated nodes)
  x: number; y: number;     // base position after cluster transform
  fx: number; fy: number;   // final position (drift + cursor offset)
  ox: number; oy: number;   // cursor repel offset (spring-smoothed)
  ax1: number; ax2: number; ay1: number; ay2: number; // drift amplitudes
  w1: number; w2: number; w3: number; w4: number;     // angular frequencies
  p1: number; p2: number; p3: number; p4: number;     // phases
  r: number;                // radius (1–1.5 => 2–3px dots)
  a: number;                // base alpha
  c: number;                // palette index: 0 violet, 1 blue, 2 cyan
  act: number;              // computation flash 0..1 (decays ~400ms)
  birth: number;            // fade-in 0..1
  death: number;            // fade-out 1..0
  dying: boolean;
}

interface NetEdge {
  a: number;
  b: number;
  w: number;                // synapse weight 0..1 — strong = brighter, thicker, persistent
  bridge: boolean;          // inter-cluster pathway, never pruned
  grow: number;             // 0..1 growth animation (new connections grow in slowly)
  dying: boolean;
}

interface Cluster {
  x: number; y: number;     // center
  minX: number; maxX: number; // soft horizontal bounds (its stage)
  rot: number; rotV: number;  // glacial rotation
  scale: number; scaleBase: number; scaleAmp: number; scaleW: number; scaleP: number;
  vx: number; vy: number;     // glacial center drift
  radius: number;
  stage: number;
}

interface Packet {
  edge: NetEdge;
  dir: 1 | -1;              // 1: a→b, -1: b→a
  t: number;                // 0..1 progress along the edge
  dur: number;
  hops: number;
  maxHops: number;
  c: number;                // palette index
  dead: boolean;
}

interface Palette {
  v: string;
  b: string;
  c: string;
  dark: boolean;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const gauss = () => (Math.random() + Math.random() + Math.random()) / 1.5 - 1;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const readPalette = (): Palette => {
  const cs = getComputedStyle(document.documentElement);
  return {
    v: cs.getPropertyValue("--ai-violet").trim() || "265 90% 65%",
    b: cs.getPropertyValue("--ai-blue").trim() || "220 95% 62%",
    c: cs.getPropertyValue("--ai-cyan").trim() || "190 95% 60%",
    dark: document.documentElement.classList.contains("dark"),
  };
};

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let nodes: NetNode[] = [];
    let edges: NetEdge[] = [];
    let clusters: Cluster[] = [];
    let packets: Packet[] = [];
    let pairSet = new Set<number>();
    let maxNodes = 0;
    let palette = readPalette();

    let raf = 0;
    let running = false;
    let inView = true;
    let lastT = 0;
    let startT = 0;
    let learnTimer = 0;
    let nextLearnIn = rand(2.2, 3.4);
    let spawnTimer = 0;
    let nextSpawnIn = rand(1.2, 2.8);

    const mouse = { cx: 0, cy: 0, gx: 0, gy: 0, inside: false, glow: 0 };

    const rawOf = (c: number) => (c === 0 ? palette.v : c === 1 ? palette.b : palette.c);
    const connectRadius = () => Math.min(W, H) * 0.16;
    const pairKey = (a: number, b: number) => Math.min(a, b) * 4096 + Math.max(a, b);
    const hasEdge = (a: number, b: number) => pairSet.has(pairKey(a, b));
    const edgeLen = (e: NetEdge) =>
      Math.hypot(nodes[e.a].fx - nodes[e.b].fx, nodes[e.a].fy - nodes[e.b].fy);
    const degree = (i: number) => {
      let d = 0;
      for (const e of edges) if (e.a === i || e.b === i) d++;
      return d;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // ---- graph construction ------------------------------------------------

    const makeNode = (cluster: number, lx: number, ly: number, bx: number, by: number, birth = 1): number => {
      const amp = rand(2, 5); // nodes drift only a few pixels
      nodes.push({
        cluster, lx, ly, bx, by, x: bx, y: by, fx: bx, fy: by, ox: 0, oy: 0,
        ax1: amp * rand(0.35, 0.65), ax2: amp * rand(0.3, 0.5),
        ay1: amp * rand(0.35, 0.65), ay2: amp * rand(0.3, 0.5),
        w1: TAU / rand(15, 30), w2: TAU / rand(15, 30),
        w3: TAU / rand(15, 30), w4: TAU / rand(15, 30),
        p1: rand(0, TAU), p2: rand(0, TAU), p3: rand(0, TAU), p4: rand(0, TAU),
        r: rand(1, 1.5),
        a: rand(0.15, 0.2),
        c: Math.random() < 0.15 ? 2 : Math.random() < 0.5 ? 0 : 1,
        act: 0, birth, death: 1, dying: false,
      });
      return nodes.length - 1;
    };

    const addEdge = (a: number, b: number, w: number, bridge: boolean, grow = 1): NetEdge | null => {
      if (a === b || hasEdge(a, b)) return null;
      pairSet.add(pairKey(a, b));
      const e: NetEdge = { a, b, w, bridge, grow, dying: false };
      edges.push(e);
      return e;
    };

    const removeEdge = (e: NetEdge) => {
      const i = edges.indexOf(e);
      if (i >= 0) edges.splice(i, 1);
      pairSet.delete(pairKey(e.a, e.b));
    };

    const makeCluster = (stage: number, u0: number, u1: number, count: number, radius: number) => {
      const cx = rand(u0 + 0.03, u1 - 0.03) * W;
      const cy = rand(0.18, 0.82) * H;
      const ci = clusters.length;
      clusters.push({
        x: cx, y: cy,
        minX: u0 * W, maxX: u1 * W,
        rot: rand(0, TAU), rotV: rand(0.004, 0.012) * (Math.random() < 0.5 ? -1 : 1),
        scale: 1, scaleBase: 1, scaleAmp: rand(0.05, 0.1),
        scaleW: TAU / rand(35, 70), scaleP: rand(0, TAU),
        vx: rand(1, 4) * (Math.random() < 0.5 ? -1 : 1),
        vy: rand(0.6, 2.4) * (Math.random() < 0.5 ? -1 : 1),
        radius, stage,
      });
      const first = nodes.length;
      for (let i = 0; i < count; i++) {
        const lx = gauss() * radius;
        const ly = gauss() * radius;
        makeNode(ci, lx, ly, cx + lx, cy + ly);
      }
      return { ci, first, count };
    };

    const generate = () => {
      const k = clamp((W * H) / (1440 * 900), 0.55, 1.35);
      const S = Math.min(W, H);
      clusters = [];
      nodes = [];
      edges = [];
      pairSet = new Set();
      packets = [];

      // Five implied stages: feature clusters → hidden representations →
      // attention → feature fusion → outputs. Never drawn as layers —
      // the hierarchy exists only in the topology.
      const stageDefs = [
        { u0: 0.10, u1: 0.30, dense: 2, medium: 0 }, // learned features
        { u0: 0.30, u1: 0.50, dense: 0, medium: 2 }, // hidden representations
        { u0: 0.50, u1: 0.72, dense: 1, medium: 1 }, // attention (dense, near portrait)
        { u0: 0.70, u1: 0.86, dense: 0, medium: 1 }, // feature fusion
      ];
      const byStage: { ci: number; first: number; count: number }[][] = [];

      stageDefs.forEach((def, s) => {
        const made: { ci: number; first: number; count: number }[] = [];
        for (let i = 0; i < def.dense; i++) {
          made.push(makeCluster(s, def.u0, def.u1, Math.round(rand(7, 10) * k), S * rand(0.035, 0.055)));
        }
        for (let i = 0; i < def.medium; i++) {
          made.push(makeCluster(s, def.u0, def.u1, Math.round(rand(5, 8) * k), S * rand(0.06, 0.1)));
        }
        byStage.push(made);
      });

      // Intra-cluster synapses: strong, connect each node to its 2 nearest peers.
      for (const { first, count } of byStage.flat()) {
        for (let i = first; i < first + count; i++) {
          const others: { j: number; d: number }[] = [];
          for (let j = first; j < first + count; j++) {
            if (j === i) continue;
            others.push({ j, d: Math.hypot(nodes[j].bx - nodes[i].bx, nodes[j].by - nodes[i].by) });
          }
          others.sort((p, q) => p.d - q.d);
          for (const { j } of others.slice(0, 2)) addEdge(i, j, rand(0.55, 0.95), false);
        }
      }

      // Forward pathways: each cluster wires into the nearest cluster of the
      // next stage — persistent bridges that carry most of the inference flow.
      for (let s = 0; s < byStage.length - 1; s++) {
        for (const from of byStage[s]) {
          let best: { ci: number; first: number; count: number } | null = null;
          let bestD = Infinity;
          for (const to of byStage[s + 1]) {
            const d = Math.hypot(clusters[to.ci].x - clusters[from.ci].x, clusters[to.ci].y - clusters[from.ci].y);
            if (d < bestD) { bestD = d; best = to; }
          }
          if (!best) continue;
          const pairs: { a: number; b: number; d: number }[] = [];
          for (let i = from.first; i < from.first + from.count; i++) {
            for (let j = best.first; j < best.first + best.count; j++) {
              pairs.push({ a: i, b: j, d: Math.hypot(nodes[j].bx - nodes[i].bx, nodes[j].by - nodes[i].by) });
            }
          }
          pairs.sort((p, q) => p.d - q.d);
          let linked = 0;
          for (const p of pairs) {
            if (linked >= 2) break;
            if (addEdge(p.a, p.b, rand(0.5, 0.8), true)) linked++;
          }
          // Occasional skip connection two stages ahead (residual-like).
          if (s + 2 < byStage.length && byStage[s + 2].length && Math.random() < 0.6) {
            const to = byStage[s + 2][Math.floor(Math.random() * byStage[s + 2].length)];
            const a = from.first + Math.floor(Math.random() * from.count);
            const b = to.first + Math.floor(Math.random() * to.count);
            addEdge(a, b, rand(0.25, 0.45), false);
          }
        }
      }

      // Output representations: a few isolated feature nodes on the far right.
      const outputs = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < outputs; i++) {
        makeNode(-1, 0, 0, rand(0.86, 0.965) * W, rand(0.15, 0.85) * H);
      }
      // Scattered isolated feature nodes waiting to be discovered.
      const scattered = Math.round(9 * k);
      for (let i = 0; i < scattered; i++) {
        const u = 0.12 + 0.85 * Math.pow(Math.random(), 0.75);
        makeNode(-1, 0, 0, u * W, rand(0.12, 0.88) * H);
      }

      // Attach some isolated nodes with weak synapses; the rest stay
      // disconnected until the self-healing pass finds them.
      const Rc = connectRadius();
      nodes.forEach((n, i) => {
        if (n.cluster !== -1 || Math.random() < 0.45) return;
        let best = -1;
        let bestD = Rc * 1.8;
        nodes.forEach((m, j) => {
          if (j === i) return;
          const d = Math.hypot(m.bx - n.bx, m.by - n.by);
          if (d < bestD) { bestD = d; best = j; }
        });
        if (best >= 0) addEdge(i, best, rand(0.15, 0.35), false);
      });

      // A few weak exploratory connections across nearby clusters.
      const weakTarget = Math.round(10 * k);
      let tries = 0;
      let weakMade = 0;
      while (weakMade < weakTarget && tries++ < 300) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b || nodes[a].cluster === nodes[b].cluster) continue;
        const d = Math.hypot(nodes[a].bx - nodes[b].bx, nodes[a].by - nodes[b].by);
        if (d < Rc * 1.4 && addEdge(a, b, rand(0.1, 0.3), false)) weakMade++;
      }

      maxNodes = nodes.length + 18;
    };

    // ---- continuous learning ------------------------------------------------
    // Glacial reorganization: weak synapses dissolve, strong ones persist,
    // nearby clusters discover each other, nodes are born and fade away.
    // Slow enough that no single change is ever noticeable.

    const selfHeal = () => {
      if (nodes.length < 2) return;
      const i = Math.floor(Math.random() * nodes.length);
      const n = nodes[i];
      if (n.dying) return;
      let best = -1;
      let bestD = connectRadius() * 2.3;
      nodes.forEach((m, j) => {
        if (j === i || m.dying) return;
        if (n.cluster !== -1 && m.cluster === n.cluster) return;
        const d = Math.hypot(m.fx - n.fx, m.fy - n.fy);
        if (d < bestD && !hasEdge(i, j)) { bestD = d; best = j; }
      });
      if (best >= 0) addEdge(i, best, rand(0.35, 0.6), false, 0); // grows in over ~4s
    };

    const birthNode = () => {
      if (!clusters.length) return;
      const ci = Math.floor(Math.random() * clusters.length);
      const c = clusters[ci];
      const ang = rand(0, TAU);
      const rad = c.radius * rand(0.7, 1.25);
      const idx = makeNode(ci, Math.cos(ang) * rad, Math.sin(ang) * rad, c.x, c.y, 0);
      const near: { j: number; d: number }[] = [];
      nodes.forEach((m, j) => {
        if (j === idx || m.cluster !== ci) return;
        near.push({ j, d: Math.hypot(m.lx - nodes[idx].lx, m.ly - nodes[idx].ly) });
      });
      near.sort((p, q) => p.d - q.d);
      for (const { j } of near.slice(0, 2)) addEdge(idx, j, rand(0.45, 0.75), false, 0);
    };

    const killWeakNode = () => {
      const cand: number[] = [];
      nodes.forEach((n, i) => {
        if (n.dying || n.birth < 0.95) return;
        if (degree(i) <= 1) cand.push(i);
      });
      if (!cand.length) return;
      const idx = cand[Math.floor(Math.random() * cand.length)];
      nodes[idx].dying = true;
      for (const e of edges) if (e.a === idx || e.b === idx) e.dying = true;
    };

    const learn = () => {
      const Rc = connectRadius();
      // Weak synapses stretched too far as clusters drift apart dissolve.
      for (const e of edges) {
        if (e.bridge || e.dying || e.w > 0.32) continue;
        if (edgeLen(e) > Rc * 1.7 && Math.random() < 0.5) e.dying = true;
      }
      // Occasionally an unused weak connection simply fades.
      if (Math.random() < 0.35) {
        const weak = edges.filter((e) => !e.dying && !e.bridge && e.w < 0.3);
        if (weak.length) weak[Math.floor(Math.random() * weak.length)].dying = true;
      }

      const roll = Math.random();
      if (roll < 0.30) {
        selfHeal(); // two nearby disconnected clusters discover each other
      } else if (roll < 0.42 && nodes.length < maxNodes) {
        birthNode();
      } else if (roll < 0.52) {
        killWeakNode();
      } else if (roll < 0.74 && edges.length) {
        const e = edges[Math.floor(Math.random() * edges.length)];
        e.w = Math.min(1, e.w + rand(0.08, 0.2)); // reinforcement
      } else if (roll < 0.86 && edges.length) {
        const pool = edges.filter((e) => !e.bridge);
        if (pool.length) {
          const e = pool[Math.floor(Math.random() * pool.length)];
          e.w = Math.max(0.08, e.w - rand(0.08, 0.2));
          if (e.w < 0.12 && Math.random() < 0.5) e.dying = true;
        }
      }
      // else: rest — stability between updates
    };

    // ---- per-frame updates ---------------------------------------------------

    const updateNodes = (t: number, dt: number) => {
      // Clusters compress, expand, rotate and drift — almost imperceptibly.
      for (const c of clusters) {
        c.rot += c.rotV * dt;
        c.scale = c.scaleBase + c.scaleAmp * Math.sin(c.scaleW * t + c.scaleP);
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.x < c.minX) c.vx = Math.abs(c.vx);
        if (c.x > c.maxX) c.vx = -Math.abs(c.vx);
        if (c.y < H * 0.12) c.vy = Math.abs(c.vy);
        if (c.y > H * 0.88) c.vy = -Math.abs(c.vy);
      }

      const rect = canvas.getBoundingClientRect();
      const mx = mouse.cx - rect.left;
      const my = mouse.cy - rect.top;
      const inside =
        mouse.inside && mx > -60 && my > -60 && mx < rect.width + 60 && my < rect.height + 60;

      // Cursor glow follows with ~250ms inertia.
      const kg = 1 - Math.exp(-dt / 0.25);
      mouse.gx += (mx - mouse.gx) * kg;
      mouse.gy += (my - mouse.gy) * kg;
      mouse.glow += ((inside ? 1 : 0) - mouse.glow) * kg;

      for (const n of nodes) {
        if (n.cluster >= 0) {
          const c = clusters[n.cluster];
          const cos = Math.cos(c.rot);
          const sin = Math.sin(c.rot);
          n.x = c.x + (n.lx * cos - n.ly * sin) * c.scale;
          n.y = c.y + (n.lx * sin + n.ly * cos) * c.scale;
        } else {
          n.x = n.bx;
          n.y = n.by;
        }
        n.x += n.ax1 * Math.sin(n.w1 * t + n.p1) + n.ax2 * Math.sin(n.w2 * t + n.p2);
        n.y += n.ay1 * Math.sin(n.w3 * t + n.p3) + n.ay2 * Math.sin(n.w4 * t + n.p4);

        // Gentle cursor repel: max ~14px, spring return ~0.6s.
        let tx = 0;
        let ty = 0;
        if (inside) {
          const dx = n.x + n.ox - mouse.gx;
          const dy = n.y + n.oy - mouse.gy;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 0.01) {
            const f = (1 - d / 150) * 14;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        const returning = Math.abs(tx) + Math.abs(ty) < Math.abs(n.ox) + Math.abs(n.oy);
        const kr = 1 - Math.exp(-dt / (returning ? 0.6 : 0.12));
        n.ox += (tx - n.ox) * kr;
        n.oy += (ty - n.oy) * kr;
        n.fx = n.x + n.ox;
        n.fy = n.y + n.oy;

        // Computation flash decays within ~400ms.
        n.act *= Math.exp(-dt / 0.13);
        // Birth / death fades.
        if (n.birth < 1) n.birth = Math.min(1, n.birth + dt / 3);
        if (n.dying && n.death > 0) n.death = Math.max(0, n.death - dt / 3);
      }

      // Remove fully faded nodes (and remap edge indices).
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].dying && nodes[i].death <= 0) {
          for (let j = edges.length - 1; j >= 0; j--) {
            if (edges[j].a === i || edges[j].b === i) removeEdge(edges[j]);
          }
          nodes.splice(i, 1);
          for (const e of edges) {
            if (e.a > i) e.a--;
            if (e.b > i) e.b--;
          }
          pairSet = new Set<number>();
          for (const e of edges) pairSet.add(pairKey(e.a, e.b));
        }
      }

      // Synapse growth / dissolution animations.
      for (let i = edges.length - 1; i >= 0; i--) {
        const e = edges[i];
        e.grow = clamp(e.grow + (e.dying ? -dt / 3 : dt / 4), 0, 1);
        if (e.dying && e.grow <= 0) removeEdge(e);
      }
    };

    // ---- information propagation ---------------------------------------------
    // A few packets at a time travel the graph like inference: reach a node,
    // flash it, pick another connected edge (weighted, slightly different
    // route every time) and continue.

    const packetPos = (p: Packet) => {
      const A = nodes[p.edge.a];
      const B = nodes[p.edge.b];
      const t = p.dir === 1 ? p.t : 1 - p.t;
      return { x: A.fx + (B.fx - A.fx) * t, y: A.fy + (B.fy - A.fy) * t };
    };

    const spawnPacket = () => {
      if (packets.length >= 4) return;
      // Bias starts toward the input side (feature clusters).
      let pool: number[] = [];
      nodes.forEach((n, i) => {
        if (!n.dying && n.fx < W * 0.55 && degree(i) > 0) pool.push(i);
      });
      if (!pool.length) {
        nodes.forEach((n, i) => {
          if (!n.dying && degree(i) > 0) pool.push(i);
        });
      }
      if (!pool.length) return;
      const ni = pool[Math.floor(Math.random() * pool.length)];
      const opts = edges.filter((e) => !e.dying && e.grow > 0.4 && (e.a === ni || e.b === ni));
      if (!opts.length) return;
      let sum = 0;
      for (const e of opts) sum += e.w;
      let r = Math.random() * sum;
      let chosen = opts[0];
      for (const e of opts) { r -= e.w; if (r <= 0) { chosen = e; break; } }
      packets.push({
        edge: chosen,
        dir: chosen.a === ni ? 1 : -1,
        t: 0,
        dur: Math.max(0.3, edgeLen(chosen) / rand(70, 110)),
        hops: 0,
        maxHops: 4 + Math.floor(Math.random() * 5),
        c: Math.floor(Math.random() * 3),
        dead: false,
      });
    };

    const advancePackets = (dt: number) => {
      for (const p of packets) {
        // Packets slightly accelerate inside the cursor glow.
        let speed = 1;
        if (mouse.glow > 0.01) {
          const pos = packetPos(p);
          const d = Math.hypot(pos.x - mouse.gx, pos.y - mouse.gy);
          if (d < 170) speed = 1 + 1.15 * (1 - d / 170) * mouse.glow;
        }
        p.t += (dt / p.dur) * speed;
        if (p.t < 1) continue;

        const arrived = p.dir === 1 ? p.edge.b : p.edge.a;
        const n = nodes[arrived];
        if (!n || n.dying) { p.dead = true; continue; }
        n.act = 1; // computation flash at the node
        p.hops++;
        if (p.hops >= p.maxHops) { p.dead = true; continue; }

        // Choose the next hop: weighted by synapse strength, forward-biased,
        // never simply backtracking — every packet takes a different route.
        const opts: { e: NetEdge; wt: number }[] = [];
        for (const e2 of edges) {
          if (e2 === p.edge || e2.dying || e2.grow <= 0.4) continue;
          if (e2.a !== arrived && e2.b !== arrived) continue;
          const other = e2.a === arrived ? e2.b : e2.a;
          const forward = nodes[other].fx >= n.fx - 30;
          opts.push({ e: e2, wt: e2.w * (forward ? 1.5 : 0.8) + 0.05 });
        }
        if (!opts.length) { p.dead = true; continue; }
        let sum = 0;
        for (const o of opts) sum += o.wt;
        let r = Math.random() * sum;
        let next = opts[0].e;
        for (const o of opts) { r -= o.wt; if (r <= 0) { next = o.e; break; } }
        p.edge = next;
        p.dir = next.a === arrived ? 1 : -1;
        p.t = 0;
        p.dur = Math.max(0.3, edgeLen(next) / rand(70, 110));
      }
      packets = packets.filter((p) => !p.dead && !p.edge.dying && edges.includes(p.edge));
    };

    // ---- rendering -------------------------------------------------------------

    const render = () => {
      const dark = palette.dark;
      const nodeScale = dark ? 1 : 1.45; // keep nodes perceptible on the light theme
      const edgeScale = dark ? 1 : 1.5;
      const Rc = connectRadius();

      ctx.clearRect(0, 0, W, H);

      // Ambient radial glow trailing the cursor (reveals the network slightly).
      if (mouse.glow > 0.01) {
        const gr = Math.min(W, H) * 0.38;
        const gi = mouse.glow * (dark ? 1 : 0.7);
        const g = ctx.createRadialGradient(mouse.gx, mouse.gy, 0, mouse.gx, mouse.gy, gr);
        g.addColorStop(0, `hsl(${palette.v} / ${0.06 * gi})`);
        g.addColorStop(0.5, `hsl(${palette.b} / ${0.035 * gi})`);
        g.addColorStop(1, `hsl(${palette.b} / 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Synapses — weight drives thickness and brightness; strong pathways
      // persist, weak ones are thin and faint. Endpoint activation brightens.
      for (const e of edges) {
        const A = nodes[e.a];
        const B = nodes[e.b];
        const d = Math.hypot(A.fx - B.fx, A.fy - B.fy);
        const fade = Math.max(0, 1 - d / (Rc * (e.bridge ? 4.2 : 1.5)));
        const actBoost = Math.max(A.act, B.act);
        const alpha = Math.min(
          0.17,
          (0.045 + e.w * 0.06) * fade * edgeScale * e.grow * (1 + 1.1 * actBoost),
        );
        if (alpha < 0.006) continue;
        ctx.lineWidth = (0.5 + e.w * 0.7) * Math.max(0.25, e.grow);
        ctx.strokeStyle = `hsl(${rawOf(A.c)} / ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(A.fx, A.fy);
        ctx.lineTo(B.fx, B.fy);
        ctx.stroke();
      }

      // Neurons — 2–3px dots with a faint halo; computation flashes expand
      // the halo briefly. Birth/death fades keep topology changes invisible.
      for (const n of nodes) {
        const vis = n.birth * n.death;
        if (vis < 0.015) continue;
        let boost = 0;
        if (mouse.glow > 0.01) {
          const d = Math.hypot(n.fx - mouse.gx, n.fy - mouse.gy);
          if (d < 170) boost = (1 - d / 170) * mouse.glow;
        }
        const baseA = Math.min(0.6, n.a * nodeScale * vis * (1 + 0.15 * boost));
        const actA = n.act * 0.3 * vis;
        const raw = rawOf(n.c);
        ctx.fillStyle = `hsl(${raw} / ${Math.min(0.4, baseA * 0.35 + actA * 0.3)})`;
        ctx.beginPath();
        ctx.arc(n.fx, n.fy, n.r * (2.6 + 3.2 * n.act), 0, TAU);
        ctx.fill();
        ctx.fillStyle = `hsl(${raw} / ${Math.min(0.85, baseA + actA)})`;
        ctx.beginPath();
        ctx.arc(n.fx, n.fy, n.r * (1 + 0.35 * n.act), 0, TAU);
        ctx.fill();
      }

      // Information packets — ~2px luminous dots gliding along synapses.
      for (const p of packets) {
        const pos = packetPos(p);
        const fade = Math.sin(Math.PI * Math.min(1, p.t));
        const raw = rawOf(p.c);
        ctx.fillStyle = `hsl(${raw} / ${0.22 * fade})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `hsl(${raw} / ${0.85 * fade})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2, 0, TAU);
        ctx.fill();
      }
    };

    const tick = (ms: number) => {
      if (!running) return;
      const t = ms / 1000;
      if (!startT) startT = t;
      const dt = clamp(t - lastT, 0.001, 0.05);
      lastT = t;

      updateNodes(t, dt);

      // Continuous learning — one small event every few seconds.
      learnTimer += dt;
      if (learnTimer > nextLearnIn) {
        learnTimer = 0;
        nextLearnIn = rand(2.2, 3.4);
        learn();
      }

      // Information propagation.
      advancePackets(dt);
      spawnTimer += dt;
      if (spawnTimer > nextSpawnIn) {
        spawnTimer = 0;
        nextSpawnIn = rand(1.2, 2.8);
        if (packets.length < 3 && edges.length > 6) spawnPacket();
      }

      render();

      // Scroll dissolve + gentle 2s fade-in on load.
      const heroH = parent.clientHeight || 1;
      const scrollFade = clamp(1 - window.scrollY / (heroH * 0.8), 0, 1);
      const loadFade = Math.min(1, (t - startT) / 2);
      canvas.style.opacity = (scrollFade * loadFade).toFixed(3);

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      lastT = performance.now() / 1000;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Static single frame for reduced-motion users.
    const drawStatic = () => {
      updateNodes(0, 0.016);
      render();
      canvas.style.opacity = "1";
    };

    resize();
    generate();

    let resizeTimer: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        generate();
        if (reduced) drawStatic();
      }, 160);
    });
    ro.observe(parent);

    const mo = new MutationObserver(() => {
      palette = readPalette();
      if (reduced) drawStatic();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let io: IntersectionObserver | null = null;
    const onVis = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    const onMove = (e: MouseEvent) => {
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
      mouse.inside = true;
    };
    const onLeave = () => {
      mouse.inside = false;
    };

    if (reduced) {
      drawStatic();
    } else {
      io = new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      });
      io.observe(parent);
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("mousemove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      mo.disconnect();
      io?.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default NeuralNetworkBackground;
