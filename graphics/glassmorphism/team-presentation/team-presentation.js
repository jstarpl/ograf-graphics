/**
 * Glassmorphism Team Presentation Module
 * Squad presentation with frosted glass aesthetic.
 *
 * Step model (stepCount: -1, dynamic):
 *   step 0      -> player list beside a large team logo
 *   step 1..N   -> player 1..N featured (photo, number, name)
 *   step N+1    -> back to the team logo, then the cycle repeats
 * The graphic only animates out on stopAction().
 *
 * Logos and photos are URLs; relative URLs resolve against this graphic's folder.
 */

const DEFAULT_STATE = {
  teamName: "Team",
  subtitle: "",
  logo: "",
  players: [],
  accentColor: "#ff8c00",
};

const STYLE_TEXT = `
:host {
  position: absolute;
  inset: 0;
  display: block;
  pointer-events: none;
  container-type: size;
  font-family: "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  color: rgba(245, 248, 255, 0.95);
  --accent: #ff8c00;
}

* {
  box-sizing: border-box;
}

.stage {
  position: absolute;
  left: 8cqw;
  right: 8cqw;
  top: 11cqh;
  bottom: 11cqh;
  opacity: 0;
  visibility: hidden;
}

.stage[data-visible="true"] {
  visibility: visible;
}

.panel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 41% 1fr;
  border-radius: 3cqh;
  background: linear-gradient(135deg, rgba(16, 24, 36, 0.78), rgba(22, 30, 48, 0.42));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 3cqh 8cqh rgba(10, 16, 24, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(140%);
  overflow: hidden;
}

/* ------------------------------------------------------------ left column */

.side {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 5cqh 3.6cqh 4cqh 4.4cqh;
}

.header {
  flex: none;
  padding-bottom: 2.2cqh;
  margin-bottom: 2.6cqh;
  border-bottom: 0.35cqh solid var(--accent);
}

.subtitle {
  font-size: 2.2cqh;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8cqh;
}

.subtitle:empty {
  display: none;
}

.team-name {
  font-size: 5.6cqh;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-shadow: 0 0.4cqh 1.6cqh rgba(0, 0, 0, 0.35);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.team-name[data-long="true"] {
  font-size: 4.4cqh;
}

.list {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(var(--rows, 1), minmax(0, var(--row-h, 6cqh)));
  grid-auto-columns: 1fr;
  column-gap: 1.6cqh;
  row-gap: var(--row-gap, 1cqh);
  align-content: start;
}

.row {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(var(--row-h) * 0.26);
  min-width: 0;
  padding: 0 calc(var(--row-h) * 0.26) 0 calc(var(--row-h) * 0.14);
  border-radius: calc(var(--row-h) * 0.22);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 400ms ease, border-color 400ms ease, transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 400ms ease;
}

.row.active {
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 55%, transparent), color-mix(in srgb, var(--accent) 18%, transparent));
  border-color: color-mix(in srgb, var(--accent) 80%, #fff 0%);
  box-shadow: 0 0.8cqh 2.4cqh color-mix(in srgb, var(--accent) 30%, transparent);
  transform: translateX(1.2cqh);
}

.row-thumb {
  flex: none;
  width: calc(var(--row-h) * 0.74);
  height: calc(var(--row-h) * 0.74);
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.row-thumb img,
.row-thumb svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  display: block;
}

.list[data-columns="1"] .row-thumb {
  display: block;
}

.list:not([data-columns="1"]) .row-thumb {
  display: none;
}

.list:not([data-columns="1"]) .row {
  gap: calc(var(--row-h) * 0.16);
}

.row-number {
  flex: none;
  min-width: calc(var(--row-h) * 0.7);
  font-size: calc(var(--row-h) * 0.46);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: var(--accent);
  transition: color 400ms ease;
}

.row.active .list[data-columns="1"] .row-thumb {
  display: block;
}

.list:not([data-columns="1"]) .row-thumb {
  display: none;
}

.list:not([data-columns="1"]) .row {
  gap: calc(var(--row-h) * 0.16);
}

.row-number {
  color: #fff;
}

.row-name {
  min-width: 0;
  font-size: calc(var(--row-h) * 0.4);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ------------------------------------------------------------ feature area */

.feature {
  position: relative;
  margin: 2.4cqh 2.4cqh 2.4cqh 0;
  border-radius: 2.4cqh;
  overflow: hidden;
  background:
    radial-gradient(70% 80% at 50% 50%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015));
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.layer {
  position: absolute;
  inset: 0;
}

/* logo layer */
.logo-layer {
  display: grid;
  place-items: center;
}

.logo-glow {
  position: absolute;
  width: 62cqh;
  height: 62cqh;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0) 65%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.logo-img {
  position: relative;
  max-width: 70%;
  max-height: 64%;
  object-fit: contain;
  filter: drop-shadow(0 2cqh 3cqh rgba(0, 0, 0, 0.45));
}

.logo-fallback {
  position: relative;
  width: 40cqh;
  height: 40cqh;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 80%, #fff), color-mix(in srgb, var(--accent) 60%, #000));
  font-size: 14cqh;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 2cqh 4cqh rgba(0, 0, 0, 0.4);
}

/* player layer */
.big-number {
  position: absolute;
  right: 5%;
  top: 40%;
  transform: translateY(-50%);
  font-size: 30cqh;
  line-height: 1;
  font-weight: 900;
  font-style: italic;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 0.3cqh color-mix(in srgb, var(--accent) 75%, transparent);
  opacity: 0.85;
  white-space: nowrap;
}

.photo-frame {
  position: absolute;
  left: 7%;
  top: 7%;
  height: 74%;
  aspect-ratio: 5 / 6;
  border-radius: 2.2cqh;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 2.4cqh 5cqh rgba(0, 0, 0, 0.45);
}

.photo-frame img,
.photo-frame svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  display: block;
}

.nameplate {
  position: absolute;
  left: 4%;
  right: 6%;
  bottom: 6%;
  display: flex;
  align-items: center;
  gap: 2.4cqh;
  padding: 1.8cqh 3cqh;
  border-radius: 1.8cqh;
  background: linear-gradient(135deg, rgba(16, 24, 36, 0.82), rgba(22, 30, 48, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-left: 0.6cqh solid var(--accent);
  box-shadow: 0 1.6cqh 4cqh rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(14px) saturate(140%);
}

.plate-number {
  flex: none;
  font-size: 6cqh;
  font-weight: 900;
  line-height: 1;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.plate-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4cqh;
}

.plate-name {
  font-size: 4.6cqh;
  font-weight: 800;
  line-height: 1.05;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.plate-team {
  font-size: 2cqh;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(220, 230, 244, 0.8);
}
`;

const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.6, 0, 0.8, 0.2)";
const EASE_BACK = "cubic-bezier(0.34, 1.35, 0.64, 1)";

const SILHOUETTE = (number) => `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="200" height="240" fill="rgba(255,255,255,0.06)"/>
  <ellipse cx="100" cy="92" rx="40" ry="46" fill="rgba(255,255,255,0.28)"/>
  <path d="M18 240 C22 178 58 156 100 156 C142 156 178 178 182 240 Z" fill="rgba(255,255,255,0.28)"/>
  <text x="100" y="222" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="44" fill="rgba(255,255,255,0.55)">${escapeHtml(number)}</text>
</svg>`;

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function resolveUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    return new URL(url, import.meta.url).href;
  } catch {
    return url;
  }
}

function initials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

class GlassmorphismTeamPresentation extends HTMLElement {
  constructor() {
    super();
    this._state = structuredClone(DEFAULT_STATE);
    this._currentStep = undefined;
    this._phase = 0;
    this._isVisible = false;
    this._mainAnims = [];
    this._layerAnims = [];
    this._activeLayer = null;
    this._imageCache = new Map(); // resolved url -> Promise<boolean>

    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = STYLE_TEXT;

    const stage = document.createElement("div");
    stage.className = "stage";
    stage.innerHTML = `
      <div class="panel">
        <div class="side">
          <div class="header">
            <div class="subtitle"></div>
            <div class="team-name"></div>
          </div>
          <div class="list"></div>
        </div>
        <div class="feature"></div>
      </div>
    `;
    root.append(style, stage);

    const q = (sel) => stage.querySelector(sel);
    this._el = {
      stage,
      panel: q(".panel"),
      header: q(".header"),
      subtitle: q(".subtitle"),
      teamName: q(".team-name"),
      list: q(".list"),
      feature: q(".feature"),
    };
  }

  // ---------------------------------------------------------------- OGraf API

  async load(params) {
    if (params?.renderType !== "realtime") {
      return { statusCode: 400, statusMessage: "Non-realtime rendering is not supported." };
    }
    this._state = this._mergeState(DEFAULT_STATE, params.data);
    await this._preloadImages();
    this._renderStatic();

    if (document.fonts && document.fonts.load) {
      await Promise.all([
        document.fonts.load("800 56px Inter"),
        document.fonts.load("600 28px Inter"),
      ]).catch(() => undefined);
    }
    return { statusCode: 200 };
  }

  async dispose() {
    this._finishLayerAnims();
    this._cancelMainAnims(false);
    this.shadowRoot.innerHTML = "";
    return { statusCode: 200 };
  }

  async playAction(params) {
    const skipAnimation = params?.skipAnimation === true;
    const target = this._resolveTargetStep(params);
    const phase = this._phaseForStep(target);

    if (!this._isVisible) {
      this._currentStep = target;
      this._phase = phase;
      this._setLayer(phase, false);
      this._updateActiveRow();
      await this._animateMain(true, skipAnimation);
    } else {
      this._currentStep = target;
      if (phase !== this._phase || !this._activeLayer) {
        this._phase = phase;
        this._updateActiveRow();
        await this._setLayer(phase, !skipAnimation);
      }
    }

    return { statusCode: 200, currentStep: this._currentStep };
  }

  async stopAction(params) {
    this._finishLayerAnims();
    await this._animateMain(false, params?.skipAnimation === true);
    this._currentStep = undefined;
    this._phase = 0;
    return { statusCode: 200 };
  }

  async updateAction(params) {
    this._state = this._mergeState(this._state, params?.data);
    await this._preloadImages();
    this._renderStatic();

    if (this._activeLayer) {
      this._phase = this._phaseForStep(this._currentStep ?? 0);
      this._finishLayerAnims();
      this._setLayer(this._phase, false);
      this._updateActiveRow();
    }
    return { statusCode: 200 };
  }

  async customAction() {
    return { statusCode: 200 };
  }

  async goToTime() {
    return { statusCode: 400, statusMessage: "Non-realtime rendering is not supported." };
  }

  async setActionsSchedule() {
    return { statusCode: 400, statusMessage: "Non-realtime rendering is not supported." };
  }

  // ---------------------------------------------------------------- State & steps

  _mergeState(base, data) {
    const d = data && typeof data === "object" ? data : {};
    const merged = { ...base, ...d };
    merged.players = Array.isArray(merged.players) ? merged.players.filter((p) => p && typeof p === "object") : [];
    return merged;
  }

  _players() {
    return this._state.players;
  }

  _resolveTargetStep(params) {
    // stepCount is -1 (dynamic): playAction never transitions to the end, only stopAction does.
    const goto = params?.goto;
    const delta = typeof params?.delta === "number" ? params.delta : 1;
    const target = typeof goto === "number"
      ? goto
      : (typeof this._currentStep === "number" ? this._currentStep : -1) + delta;
    return Math.max(0, Math.floor(target));
  }

  /** 0 = team logo, 1..N = player index + 1. Cycles back to the logo after the last player. */
  _phaseForStep(step) {
    const cycle = this._players().length + 1;
    return ((step % cycle) + cycle) % cycle;
  }

  // ---------------------------------------------------------------- Rendering

  _preloadImages() {
    const urls = [this._state.logo, ...this._players().map((p) => p.photo)]
      .map(resolveUrl)
      .filter(Boolean);
    const promises = urls.map((src) => {
      if (!this._imageCache.has(src)) {
        this._imageCache.set(
          src,
          new Promise((resolve) => {
            const img = new Image();
            const timer = setTimeout(() => resolve(false), 5000);
            img.onload = () => {
              clearTimeout(timer);
              resolve(true);
            };
            img.onerror = () => {
              clearTimeout(timer);
              resolve(false);
            };
            img.src = src;
          })
        );
      }
      return this._imageCache.get(src);
    });
    return Promise.all(promises);
  }

  _makeImage(url, className, alt) {
    const img = document.createElement("img");
    if (className) img.className = className;
    img.alt = alt || "";
    img.decoding = "sync";
    img.src = resolveUrl(url);
    return img;
  }

  _renderStatic() {
    const { teamName, subtitle, accentColor } = this._state;
    const el = this._el;
    el.teamName.textContent = teamName || "";
    el.subtitle.textContent = subtitle || "";
    if (accentColor) this.style.setProperty("--accent", accentColor);

    const players = this._players();
    const n = Math.max(players.length, 1);
    const columns = n > 16 ? 3 : n > 8 ? 2 : 1;
    const rows = Math.ceil(n / columns);
    // Available list height is roughly 54cqh; rows shrink to fit, capped for short lists.
    const gap = rows > 8 ? 0.7 : 1.1;
    const rowH = Math.min(7.6, (54 - gap * (rows - 1)) / rows);
    el.teamName.dataset.long = String((teamName || "").length > 18);
    el.list.dataset.columns = String(columns);
    el.list.style.setProperty("--rows", String(rows));
    el.list.style.setProperty("--row-h", `${rowH.toFixed(3)}cqh`);
    el.list.style.setProperty("--row-gap", `${gap}cqh`);

    el.list.replaceChildren();
    players.forEach((player, i) => {
      const row = document.createElement("div");
      row.className = "row";
      row.dataset.index = String(i);

      const number = document.createElement("div");
      number.className = "row-number";
      number.textContent = player.number ?? "";

      const thumb = document.createElement("div");
      thumb.className = "row-thumb";
      this._fillPhoto(thumb, player);

      const name = document.createElement("div");
      name.className = "row-name";
      name.textContent = player.name || "";

      row.append(number, thumb, name);
      el.list.append(row);
    });
    this._updateActiveRow();
  }

  _fillPhoto(container, player) {
    const src = resolveUrl(player.photo);
    const cached = src ? this._imageCache.get(src) : undefined;
    const setFallback = () => {
      container.innerHTML = SILHOUETTE(player.number ?? "");
    };
    if (!src) {
      setFallback();
      return;
    }
    container.replaceChildren(this._makeImage(player.photo, "", player.name));
    // If the image failed during preload, swap in the fallback.
    cached?.then((ok) => {
      if (!ok) setFallback();
    });
  }

  _updateActiveRow() {
    const activeIndex = this._phase - 1;
    for (const row of this._el.list.children) {
      row.classList.toggle("active", Number(row.dataset.index) === activeIndex);
    }
  }

  _buildLayer(phase) {
    const layer = document.createElement("div");
    const parts = {};

    if (phase === 0) {
      layer.className = "layer logo-layer";
      const glow = document.createElement("div");
      glow.className = "logo-glow";
      layer.append(glow);

      const src = resolveUrl(this._state.logo);
      let logo;
      if (src) {
        logo = this._makeImage(this._state.logo, "logo-img", this._state.teamName);
        this._imageCache.get(src)?.then((ok) => {
          if (!ok) logo.replaceWith(this._logoFallback());
        });
      } else {
        logo = this._logoFallback();
      }
      layer.append(logo);
      parts.main = logo;
      parts.glow = glow;
    } else {
      const player = this._players()[phase - 1] || {};
      layer.className = "layer player-layer";

      const bigNumber = document.createElement("div");
      bigNumber.className = "big-number";
      bigNumber.textContent = player.number ?? "";

      const frame = document.createElement("div");
      frame.className = "photo-frame";
      this._fillPhoto(frame, player);

      const plate = document.createElement("div");
      plate.className = "nameplate";
      plate.innerHTML = `
        <div class="plate-number"></div>
        <div class="plate-text">
          <div class="plate-name"></div>
          <div class="plate-team"></div>
        </div>`;
      plate.querySelector(".plate-number").textContent = player.number ?? "";
      plate.querySelector(".plate-name").textContent = player.name || "";
      plate.querySelector(".plate-team").textContent = this._state.teamName || "";

      layer.append(bigNumber, frame, plate);
      parts.bigNumber = bigNumber;
      parts.frame = frame;
      parts.plate = plate;
    }
    return { layer, parts, phase };
  }

  _logoFallback() {
    const fb = document.createElement("div");
    fb.className = "logo-fallback";
    fb.textContent = initials(this._state.teamName);
    return fb;
  }

  _finishLayerAnims() {
    for (const a of this._layerAnims) {
      try {
        a.finish();
      } catch {
        /* ignore */
      }
    }
    this._layerAnims = [];
    // Remove every layer except the active one
    for (const child of [...this._el.feature.children]) {
      if (!this._activeLayer || child !== this._activeLayer.layer) child.remove();
    }
  }

  /** Swap the feature area to the given phase. */
  async _setLayer(phase, animate) {
    this._finishLayerAnims();

    const previous = this._activeLayer;
    const next = this._buildLayer(phase);
    this._activeLayer = next;
    this._el.feature.append(next.layer);

    if (!animate) {
      previous?.layer.remove();
      return;
    }

    const anims = [];
    const add = (target, keyframes, options) => {
      anims.push(target.animate(keyframes, { fill: "both", ...options }));
    };

    if (previous) {
      add(previous.layer, [
        { opacity: 1, transform: "translateX(0) scale(1)" },
        { opacity: 0, transform: "translateX(-10%) scale(0.94)" },
      ], { duration: 380, easing: EASE_IN });
    }
    this._addLayerInAnims(next, add, previous ? 220 : 0);

    this._layerAnims = anims;
    await Promise.all(anims.map((a) => a.finished.catch(() => undefined)));
    if (this._layerAnims === anims) {
      previous?.layer.remove();
      anims.forEach((a) => a.cancel()); // end states equal the CSS defaults
      this._layerAnims = [];
    }
  }

  _addLayerInAnims({ parts, phase }, add, delay) {
    if (phase === 0) {
      add(parts.glow, [
        { opacity: 0, transform: "scale(0.6)" },
        { opacity: 1, transform: "scale(1)" },
      ], { duration: 700, delay, easing: EASE_OUT });
      add(parts.main, [
        { opacity: 0, transform: "scale(0.55) rotate(-10deg)" },
        { opacity: 1, transform: "scale(1) rotate(0)" },
      ], { duration: 720, delay: delay + 60, easing: EASE_BACK });
    } else {
      add(parts.bigNumber, [
        { opacity: 0, transform: "translate(20%, -50%) scale(1.25)" },
        { opacity: 0.85, transform: "translate(0, -50%) scale(1)" },
      ], { duration: 700, delay, easing: EASE_OUT });
      add(parts.frame, [
        { opacity: 0, transform: "translateX(18%) scale(1.06)", clipPath: "inset(0 0 100% 0 round 2.2cqh)" },
        { opacity: 1, transform: "translateX(0) scale(1)", clipPath: "inset(0 0 0% 0 round 2.2cqh)" },
      ], { duration: 640, delay: delay + 60, easing: EASE_OUT });
      add(parts.plate, [
        { opacity: 0, transform: "translateY(60%)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 520, delay: delay + 260, easing: EASE_BACK });
    }
  }

  // ---------------------------------------------------------------- Main in/out

  _cancelMainAnims(commit) {
    for (const anim of this._mainAnims) {
      if (commit) {
        try {
          anim.commitStyles();
        } catch {
          /* element may not be rendered */
        }
      }
      anim.cancel();
    }
    this._mainAnims = [];
  }

  async _animateMain(visible, skipAnimation) {
    if (this._isVisible === visible) return;
    this._isVisible = visible;

    const el = this._el;
    this._cancelMainAnims(true);

    const anims = [];
    const add = (target, keyframes, options) => {
      anims.push(target.animate(keyframes, { fill: "both", ...options }));
    };
    const rows = [...el.list.children];
    const rowStagger = Math.min(70, 500 / Math.max(rows.length, 1));

    if (visible) {
      el.stage.dataset.visible = "true";
      // Clear inline styles left behind by an interrupted animation
      for (const node of [el.stage, el.panel, el.header, el.feature, ...rows]) {
        node.style.removeProperty("opacity");
        node.style.removeProperty("transform");
        node.style.removeProperty("clip-path");
      }
      add(el.stage, [{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: "linear" });
      add(el.panel, [
        { transform: "translateY(4%) scale(0.97)", clipPath: "inset(0 100% 0 0 round 3cqh)" },
        { transform: "translateY(0) scale(1)", clipPath: "inset(0 0% 0 0 round 3cqh)" },
      ], { duration: 760, easing: EASE_OUT });
      add(el.header, [
        { opacity: 0, transform: "translateX(-12%)" },
        { opacity: 1, transform: "translateX(0)" },
      ], { duration: 560, delay: 220, easing: EASE_OUT });
      rows.forEach((row, i) => {
        add(row, [
          { opacity: 0, transform: "translateX(-24%)" },
          { opacity: 1, transform: "translateX(0)" },
        ], { duration: 520, delay: 360 + i * rowStagger, easing: EASE_OUT });
      });
      add(el.feature, [
        { opacity: 0, transform: "scale(0.94)" },
        { opacity: 1, transform: "scale(1)" },
      ], { duration: 640, delay: 300, easing: EASE_OUT });
      if (this._activeLayer) {
        this._addLayerInAnims(this._activeLayer, add, 420);
      }
    } else {
      rows.slice().reverse().forEach((row, i) => {
        add(row, [{ opacity: 0, transform: "translateX(-20%)" }], {
          duration: 260,
          delay: i * Math.min(30, rowStagger),
          easing: EASE_IN,
        });
      });
      add(el.feature, [{ opacity: 0, transform: "scale(0.95)" }], { duration: 320, easing: EASE_IN });
      add(el.header, [{ opacity: 0, transform: "translateX(-10%)" }], { duration: 280, delay: 80, easing: EASE_IN });
      add(el.panel, [{ clipPath: "inset(0 0 0 100% round 3cqh)", transform: "translateY(2%) scale(0.98)" }], {
        duration: 480,
        delay: 220,
        easing: EASE_IN,
      });
      add(el.stage, [{ opacity: 0 }], { duration: 220, delay: 480, easing: "linear" });
    }

    this._mainAnims = anims;

    if (skipAnimation) {
      anims.forEach((a) => a.finish());
    } else {
      await Promise.all(anims.map((a) => a.finished.catch(() => undefined)));
    }

    // All intro animations end on the CSS defaults (except the stage opacity), so drop them once done.
    // This keeps the active-row highlight transform and later layer transitions free of leftover fills.
    if (visible && this._mainAnims === anims && this._isVisible) {
      el.stage.style.opacity = "1";
      anims.forEach((a) => a.cancel());
      this._mainAnims = [];
    }

    if (!visible && this._mainAnims === anims && !this._isVisible) {
      el.stage.dataset.visible = "false";
      this._activeLayer?.layer.remove();
      this._activeLayer = null;
    }
  }
}

export default GlassmorphismTeamPresentation;
