import { useEffect, useRef } from "react";

/**
 * Ambient neural network for the hero section.
 * Canvas-rendered, GPU-friendly, zero DOM churn.
 * Evolves slowly: organic node drift, dynamic connect/disconnect,
 * occasional data pulses, subtle cursor response, scroll dissolve.
 */

const TAU = Math.PI * 2;

interface NetNode {
  bx: number; by: number;      // base (cluster) position
  x: number; y: number;        // drift position
  fx: number; fy: number;      // final position (drift + cursor offset)
  ox: number; oy: number;      // cursor repel offset (spring-smoothed)
  ax1: number; ax2: number; ay1: number; ay2: number; // drift amplitudes
  w1: number; w2: number; w3: number; w4: number;     // angular frequencies
  p1: number; p2: number; p3: number; p4: number;     // phases
  r: number;                   // radius (1–1.5 => 2–3px dots)
  a: number;                   // base alpha
  c: number;                   // palette index: 0 violet, 1 blue, 2 cyan
  degree: number;              // target connection count (2–4)
}

interface NetEdge {
  a: number;
  b: number;
  bridge: boolean;             // long-range sparse connection
  alpha: number;
}

interface NetPulse {
  edge: NetEdge;
  t: number;                   // 0..1 progress along the edge
  dur: number;
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
    let pulses: NetPulse[] = [];
    let palette = readPalette();

    let raf = 0;
    let running = false;
    let inView = true;
    let lastT = 0;
    let startT = 0;
    let edgeTimer = 0;
    let pulseTimer = 0;
    let nextPulseIn = rand(2, 4);

    const mouse = { cx: 0, cy: 0, gx: 0, gy: 0, inside: false, glow: 0 };

    const rawOf = (c: number) => (c === 0 ? palette.v : c === 1 ? palette.b : palette.c);
    const connectRadius = () => Math.min(W, H) * 0.16;

    // Density gradient: near-empty left (text), peak near the portrait, fade far right.
    const densityAt = (u: number) => {
      const peak = Math.exp(-((u - 0.72) ** 2) / (2 * 0.17 ** 2));
      const rightFade = u > 0.88 ? Math.max(0.25, 1 - (u - 0.88) * 4) : 1;
      return (0.1 + 0.9 * peak) * rightFade;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const generate = () => {
      const count = clamp(Math.round((W * H) / 8000), 70, 170);

      // Organic clusters, weighted by the density gradient.
      const clusters: { x: number; y: number }[] = [];
      let guard = 0;
      while (clusters.length < 7 && guard++ < 600) {
        const u = Math.random();
        if (Math.random() < densityAt(u)) {
          clusters.push({ x: u * W, y: rand(0.1, 0.9) * H });
        }
      }
      if (!clusters.length) clusters.push({ x: W * 0.72, y: H * 0.5 });

      nodes = [];
      for (let i = 0; i < count; i++) {
        let x: number;
        let y: number;
        if (Math.random() < 0.82) {
          const c = clusters[Math.floor(Math.random() * clusters.length)];
          const s = Math.min(W, H) * rand(0.06, 0.13);
          x = c.x + gauss() * s;
          y = c.y + gauss() * s;
        } else {
          let u = Math.random();
          let g2 = 0;
          while (Math.random() > densityAt(u) && g2++ < 60) u = Math.random();
          x = u * W;
          y = Math.random() * H;
        }
        x = clamp(x, 16, W - 16);
        y = clamp(y, 16, H - 16);

        const amp = rand(5, 12); // total drift distance, split across two sines per axis
        nodes.push({
          bx: x, by: y, x, y, fx: x, fy: y, ox: 0, oy: 0,
          ax1: amp * rand(0.35, 0.65), ax2: amp * rand(0.3, 0.5),
          ay1: amp * rand(0.35, 0.65), ay2: amp * rand(0.3, 0.5),
          w1: TAU / rand(15, 30), w2: TAU / rand(15, 30),
          w3: TAU / rand(15, 30), w4: TAU / rand(15, 30),
          p1: rand(0, TAU), p2: rand(0, TAU), p3: rand(0, TAU), p4: rand(0, TAU),
          r: rand(1, 1.5),
          a: rand(0.15, 0.2),
          c: Math.random() < 0.15 ? 2 : Math.random() < 0.5 ? 0 : 1,
          degree: 2 + Math.floor(Math.random() * 3),
        });
      }

      // A few long-range bridges between distant clusters.
      edges = [];
      const Rc = connectRadius();
      const bridgeTarget = 6 + Math.floor(Math.random() * 4);
      let tries = 0;
      while (edges.length < bridgeTarget && tries++ < 250) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b) continue;
        const d = Math.hypot(nodes[a].bx - nodes[b].bx, nodes[a].by - nodes[b].by);
        if (d > Rc * 1.7 && d < Rc * 4) {
          edges.push({ a, b, bridge: true, alpha: rand(0.04, 0.06) });
        }
      }
      pulses = [];
    };

    // Re-evaluate connections using a uniform spatial grid.
    const updateEdges = () => {
      const Rc = connectRadius();
      const Rd = Rc * 1.3; // hysteresis: disconnect beyond this

      edges = edges.filter((e) => {
        if (e.bridge) return true;
        const A = nodes[e.a];
        const B = nodes[e.b];
        return Math.hypot(A.fx - B.fx, A.fy - B.fy) < Rd;
      });

      // Slowly retire random edges so the graph keeps reconfiguring.
      if (Math.random() < 0.35) {
        const removable: number[] = [];
        edges.forEach((e, i) => { if (!e.bridge) removable.push(i); });
        if (removable.length > 40) {
          edges.splice(removable[Math.floor(Math.random() * removable.length)], 1);
        }
      }

      const deg = new Array<number>(nodes.length).fill(0);
      const pairs = new Set<number>();
      edges.forEach((e) => {
        deg[e.a]++;
        deg[e.b]++;
        pairs.add(Math.min(e.a, e.b) * 1000 + Math.max(e.a, e.b));
      });

      // Build spatial grid.
      const cell = Rc;
      const cols = Math.max(1, Math.ceil(W / cell));
      const grid = new Map<number, number[]>();
      nodes.forEach((n, i) => {
        const k = Math.floor(n.fx / cell) + Math.floor(n.fy / cell) * cols;
        const arr = grid.get(k);
        if (arr) arr.push(i);
        else grid.set(k, [i]);
      });

      // Randomized order keeps growth organic.
      const order = nodes.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }

      for (const i of order) {
        if (deg[i] >= nodes[i].degree) continue;
        const n = nodes[i];
        const cx = Math.floor(n.fx / cell);
        const cy = Math.floor(n.fy / cell);
        const candidates: { j: number; d: number }[] = [];
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const arr = grid.get(gx + gy * cols);
            if (!arr) continue;
            for (const j of arr) {
              if (j === i || deg[j] >= 4) continue;
              const key = Math.min(i, j) * 1000 + Math.max(i, j);
              if (pairs.has(key)) continue;
              const d = Math.hypot(n.fx - nodes[j].fx, n.fy - nodes[j].fy);
              if (d > 1 && d < Rc) candidates.push({ j, d });
            }
          }
        }
        candidates.sort((p, q) => p.d - q.d);
        for (const { j } of candidates) {
          if (deg[i] >= nodes[i].degree || deg[j] >= 4) break;
          const key = Math.min(i, j) * 1000 + Math.max(i, j);
          pairs.add(key);
          deg[i]++;
          deg[j]++;
          edges.push({ a: i, b: j, bridge: false, alpha: rand(0.05, 0.1) });
        }
      }
    };

    const updateNodes = (t: number, dt: number) => {
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
        n.x = n.bx + n.ax1 * Math.sin(n.w1 * t + n.p1) + n.ax2 * Math.sin(n.w2 * t + n.p2);
        n.y = n.by + n.ay1 * Math.sin(n.w3 * t + n.p3) + n.ay2 * Math.sin(n.w4 * t + n.p4);

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
      }
    };

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

      // Edges — hairline, barely visible, fade with stretch.
      ctx.lineWidth = 0.75;
      for (const e of edges) {
        const A = nodes[e.a];
        const B = nodes[e.b];
        const d = Math.hypot(A.fx - B.fx, A.fy - B.fy);
        const fade = Math.max(0, 1 - d / (Rc * (e.bridge ? 4.2 : 1.3)));
        const alpha = e.alpha * fade * edgeScale;
        if (alpha < 0.006) continue;
        ctx.strokeStyle = `hsl(${rawOf(A.c)} / ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(A.fx, A.fy);
        ctx.lineTo(B.fx, B.fy);
        ctx.stroke();
      }

      // Nodes — 2–3px dots with a faint halo, +15% glow near the cursor.
      for (const n of nodes) {
        let boost = 0;
        if (mouse.glow > 0.01) {
          const d = Math.hypot(n.fx - mouse.gx, n.fy - mouse.gy);
          if (d < 170) boost = (1 - d / 170) * mouse.glow;
        }
        const alpha = Math.min(0.6, n.a * nodeScale * (1 + 0.15 * boost));
        const raw = rawOf(n.c);
        ctx.fillStyle = `hsl(${raw} / ${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(n.fx, n.fy, n.r * 2.6, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `hsl(${raw} / ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.fx, n.fy, n.r, 0, TAU);
        ctx.fill();
      }

      // Data pulses — tiny dots travelling along random edges.
      for (const p of pulses) {
        const A = nodes[p.edge.a];
        const B = nodes[p.edge.b];
        const x = A.fx + (B.fx - A.fx) * p.t;
        const y = A.fy + (B.fy - A.fy) * p.t;
        const fade = Math.sin(Math.PI * Math.min(1, p.t));
        ctx.fillStyle = `hsl(${palette.c} / ${0.2 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `hsl(${palette.c} / ${0.8 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, TAU);
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

      edgeTimer += dt;
      if (edgeTimer > 0.3) {
        edgeTimer = 0;
        updateEdges();
      }

      pulseTimer += dt;
      if (pulseTimer > nextPulseIn) {
        pulseTimer = 0;
        nextPulseIn = rand(2, 4);
        if (pulses.length < 2 && edges.length > 4) {
          pulses.push({
            edge: edges[Math.floor(Math.random() * edges.length)],
            t: 0,
            dur: rand(1.8, 2.6),
          });
        }
      }
      pulses = pulses.filter((p) => (p.t += dt / p.dur) <= 1 && edges.includes(p.edge));

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
      updateEdges();
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
        updateEdges();
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
      updateEdges();
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
