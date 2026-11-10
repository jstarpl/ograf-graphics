/**
 * Glassmorphism Match ID Module
 * Match identification card with frosted glass aesthetic: match title, two teams with logos,
 * location and time. Logos are provided as URLs (relative URLs resolve against this folder).
 */

const DEFAULT_STATE = {
  title: "Matchday 1",
  homeTeam: { name: "Home", logo: "" },
  awayTeam: { name: "Away", logo: "" },
  location: "",
  time: "",
  accentColor: "#ff8c00",
};

const ICON_LOCATION = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>`;
const ICON_TIME = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.41 3.3 3.3-1.42 1.41L11 13.24V6h2v6.41Z"/></svg>`;

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
  left: 50%;
  top: 50%;
  width: 64cqw;
  transform: translate(-50%, -46%);
  opacity: 0;
  visibility: hidden;
}

.stage[data-visible="true"] {
  visibility: visible;
}

.title-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: -2.4cqh;
  position: relative;
  z-index: 2;
}

.title {
  padding: 1.1cqh 2.6cqh;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #000));
  box-shadow: 0 1cqh 3cqh color-mix(in srgb, var(--accent) 40%, transparent),
    inset 0 0.1cqh 0 rgba(255, 255, 255, 0.4);
  font-size: 2.4cqh;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}

.title:empty {
  display: none;
}

.card {
  position: relative;
  border-radius: 3cqh;
  background: linear-gradient(135deg, rgba(16, 24, 36, 0.74), rgba(22, 30, 48, 0.4));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 3cqh 8cqh rgba(10, 16, 24, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(140%);
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 90% at 0% 50%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%),
    radial-gradient(60% 90% at 100% 50%, rgba(120, 170, 255, 0.16), transparent 70%);
  pointer-events: none;
}

.teams {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 5.6cqh 4cqh 3.4cqh;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2cqh;
  min-width: 0;
}

.logo-frame {
  position: relative;
  width: 22cqh;
  height: 22cqh;
  display: grid;
  place-items: center;
}

.logo-frame::before {
  content: "";
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.02) 70%);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.logo-img {
  position: relative;
  max-width: 82%;
  max-height: 82%;
  object-fit: contain;
  filter: drop-shadow(0 1.2cqh 2cqh rgba(0, 0, 0, 0.45));
}

.logo-fallback {
  position: relative;
  width: 72%;
  height: 72%;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 80%, #fff), color-mix(in srgb, var(--accent) 60%, #000));
  font-size: 6.4cqh;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.02em;
  box-shadow: 0 1.2cqh 2.4cqh rgba(0, 0, 0, 0.4);
}

.team-name {
  max-width: 100%;
  font-size: 3.8cqh;
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
  text-shadow: 0 0.4cqh 1.6cqh rgba(0, 0, 0, 0.35);
  overflow-wrap: anywhere;
}

.vs {
  padding: 0 3.6cqh 5.4cqh;
  font-size: 6.4cqh;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 0.22cqh rgba(255, 255, 255, 0.85);
  text-shadow: 0 0 3cqh color-mix(in srgb, var(--accent) 55%, transparent);
}

.info {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.2cqh;
  padding: 2cqh 3cqh;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
  font-size: 2.5cqh;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(225, 233, 246, 0.92);
}

.info[hidden],
.info-item[hidden],
.divider[hidden] {
  display: none;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.1cqh;
  white-space: nowrap;
}

.info-item svg {
  width: 2.6cqh;
  height: 2.6cqh;
  color: var(--accent);
  flex: none;
}

.divider {
  width: 0.6cqh;
  height: 0.6cqh;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
}
`;

const EASE_OUT = "cubic-bezier(0.2, 0.8, 0.2, 1)";
const EASE_IN = "cubic-bezier(0.6, 0, 0.8, 0.2)";
const EASE_BACK = "cubic-bezier(0.34, 1.4, 0.64, 1)";

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

class GlassmorphismMatchId extends HTMLElement {
  constructor() {
    super();
    this._state = structuredClone(DEFAULT_STATE);
    this._currentStep = undefined;
    this._isVisible = false;
    this._animations = [];

    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = STYLE_TEXT;

    const stage = document.createElement("div");
    stage.className = "stage";
    stage.innerHTML = `
      <div class="title-wrap"><div class="title"></div></div>
      <div class="card">
        <div class="teams">
          <div class="team home">
            <div class="logo-frame"></div>
            <div class="team-name"></div>
          </div>
          <div class="vs">VS</div>
          <div class="team away">
            <div class="logo-frame"></div>
            <div class="team-name"></div>
          </div>
        </div>
        <div class="info">
          <div class="info-item location">${ICON_LOCATION}<span></span></div>
          <div class="divider"></div>
          <div class="info-item time">${ICON_TIME}<span></span></div>
        </div>
      </div>
    `;
    root.append(style, stage);

    const q = (sel) => stage.querySelector(sel);
    this._el = {
      stage,
      titleWrap: q(".title-wrap"),
      title: q(".title"),
      card: q(".card"),
      vs: q(".vs"),
      info: q(".info"),
      homeLogo: q(".home .logo-frame"),
      homeName: q(".home .team-name"),
      awayLogo: q(".away .logo-frame"),
      awayName: q(".away .team-name"),
      location: q(".location"),
      locationText: q(".location span"),
      time: q(".time"),
      timeText: q(".time span"),
      divider: q(".divider"),
    };
  }

  // ---------------------------------------------------------------- OGraf API

  async load(params) {
    if (params?.renderType !== "realtime") {
      return { statusCode: 400, statusMessage: "Non-realtime rendering is not supported." };
    }
    this._state = this._mergeState(DEFAULT_STATE, params.data);
    await this._applyState();

    if (document.fonts && document.fonts.load) {
      await Promise.all([
        document.fonts.load("800 40px Inter"),
        document.fonts.load("600 24px Inter"),
      ]).catch(() => undefined);
    }
    return { statusCode: 200 };
  }

  async dispose() {
    this._cancelAnimations(false);
    this.shadowRoot.innerHTML = "";
    return { statusCode: 200 };
  }

  async playAction(params) {
    const skipAnimation = params?.skipAnimation === true;
    const target = this._resolveTargetStep(params);

    if (target === undefined) {
      await this._animate(false, skipAnimation);
      this._currentStep = undefined;
    } else {
      await this._animate(true, skipAnimation);
      this._currentStep = target;
    }
    return { statusCode: 200, currentStep: this._currentStep };
  }

  async stopAction(params) {
    await this._animate(false, params?.skipAnimation === true);
    this._currentStep = undefined;
    return { statusCode: 200 };
  }

  async updateAction(params) {
    this._state = this._mergeState(this._state, params?.data);
    await this._applyState();
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

  // ---------------------------------------------------------------- State

  _mergeState(base, data) {
    const d = data && typeof data === "object" ? data : {};
    return {
      ...base,
      ...d,
      homeTeam: { ...base.homeTeam, ...(d.homeTeam || {}) },
      awayTeam: { ...base.awayTeam, ...(d.awayTeam || {}) },
    };
  }

  async _applyState() {
    const { title, homeTeam, awayTeam, location, time, accentColor } = this._state;
    const el = this._el;

    el.title.textContent = title || "";
    el.homeName.textContent = homeTeam?.name || "";
    el.awayName.textContent = awayTeam?.name || "";

    el.locationText.textContent = location || "";
    el.timeText.textContent = time || "";
    el.location.hidden = !location;
    el.time.hidden = !time;
    el.divider.hidden = !location || !time;
    el.info.hidden = !location && !time;

    if (accentColor) this.style.setProperty("--accent", accentColor);

    await Promise.all([
      this._setLogo(el.homeLogo, homeTeam?.logo, homeTeam?.name),
      this._setLogo(el.awayLogo, awayTeam?.logo, awayTeam?.name),
    ]);
  }

  _setLogo(frame, url, name) {
    const src = resolveUrl(url);
    const showFallback = () => {
      frame.replaceChildren();
      const fb = document.createElement("div");
      fb.className = "logo-fallback";
      fb.textContent = initials(name);
      frame.append(fb);
    };

    if (!src) {
      showFallback();
      return Promise.resolve();
    }

    const current = frame.querySelector("img");
    if (current && current.dataset.src === src) return Promise.resolve();

    return new Promise((resolve) => {
      const img = new Image();
      img.className = "logo-img";
      img.alt = name || "";
      img.decoding = "async";
      img.dataset.src = src;
      const timer = setTimeout(done, 5000);
      function done() {
        clearTimeout(timer);
        resolve();
      }
      img.onload = () => {
        frame.replaceChildren(img);
        done();
      };
      img.onerror = () => {
        showFallback();
        done();
      };
      img.src = src;
    });
  }

  _resolveTargetStep(params) {
    const stepCount = 1;
    const goto = params?.goto;
    const delta = typeof params?.delta === "number" ? params.delta : 1;
    const target = typeof goto === "number"
      ? goto
      : (typeof this._currentStep === "number" ? this._currentStep : -1) + delta;
    if (target >= stepCount) return undefined;
    return Math.max(0, target);
  }

  // ---------------------------------------------------------------- Animation

  _cancelAnimations(commit) {
    for (const anim of this._animations) {
      if (commit) {
        try {
          anim.commitStyles();
        } catch {
          /* element may not be rendered */
        }
      }
      anim.cancel();
    }
    this._animations = [];
  }

  async _animate(visible, skipAnimation) {
    if (this._isVisible === visible) return;
    this._isVisible = visible;

    const el = this._el;
    this._cancelAnimations(true);

    const anims = [];
    const add = (target, keyframes, options) => {
      const a = target.animate(keyframes, { fill: "both", ...options });
      anims.push(a);
    };

    if (visible) {
      el.stage.dataset.visible = "true";
      add(el.stage, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "linear" });
      add(el.card, [
        { clipPath: "inset(0 50% 0 50% round 3cqh)", transform: "scale(0.96)" },
        { clipPath: "inset(0 0% 0 0% round 3cqh)", transform: "scale(1)" },
      ], { duration: 650, easing: EASE_OUT });
      add(el.titleWrap, [
        { opacity: 0, transform: "translateY(-60%) scale(0.8)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ], { duration: 520, delay: 320, easing: EASE_BACK });
      add(el.homeLogo, [
        { opacity: 0, transform: "translateX(-40%) scale(0.6) rotate(-12deg)" },
        { opacity: 1, transform: "translateX(0) scale(1) rotate(0)" },
      ], { duration: 700, delay: 260, easing: EASE_BACK });
      add(el.awayLogo, [
        { opacity: 0, transform: "translateX(40%) scale(0.6) rotate(12deg)" },
        { opacity: 1, transform: "translateX(0) scale(1) rotate(0)" },
      ], { duration: 700, delay: 260, easing: EASE_BACK });
      add(el.homeName, [
        { opacity: 0, transform: "translateY(50%)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 500, delay: 460, easing: EASE_OUT });
      add(el.awayName, [
        { opacity: 0, transform: "translateY(50%)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 500, delay: 500, easing: EASE_OUT });
      add(el.vs, [
        { opacity: 0, transform: "scale(2.2)" },
        { opacity: 1, transform: "scale(1)" },
      ], { duration: 520, delay: 420, easing: EASE_OUT });
      add(el.info, [
        { opacity: 0, transform: "translateY(100%)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 500, delay: 560, easing: EASE_OUT });
    } else {
      // Single-keyframe animations animate from the current (committed) values.
      add(el.info, [{ opacity: 0, transform: "translateY(100%)" }], { duration: 260, easing: EASE_IN });
      add(el.homeName, [{ opacity: 0, transform: "translateY(40%)" }], { duration: 260, easing: EASE_IN });
      add(el.awayName, [{ opacity: 0, transform: "translateY(40%)" }], { duration: 260, easing: EASE_IN });
      add(el.vs, [{ opacity: 0, transform: "scale(0.6)" }], { duration: 260, easing: EASE_IN });
      add(el.titleWrap, [{ opacity: 0, transform: "translateY(-60%)" }], { duration: 260, easing: EASE_IN });
      add(el.homeLogo, [{ opacity: 0, transform: "translateX(-30%) scale(0.7)" }], { duration: 320, delay: 60, easing: EASE_IN });
      add(el.awayLogo, [{ opacity: 0, transform: "translateX(30%) scale(0.7)" }], { duration: 320, delay: 60, easing: EASE_IN });
      add(el.card, [{ clipPath: "inset(0 50% 0 50% round 3cqh)", transform: "scale(0.96)" }], { duration: 420, delay: 180, easing: EASE_IN });
      add(el.stage, [{ opacity: 0 }], { duration: 200, delay: 420, easing: "linear" });
    }

    this._animations = anims;

    if (skipAnimation) {
      anims.forEach((a) => a.finish());
    } else {
      await Promise.all(anims.map((a) => a.finished.catch(() => undefined)));
    }

    if (!visible && this._animations === anims && !this._isVisible) {
      el.stage.dataset.visible = "false";
    }
  }
}

export default GlassmorphismMatchId;
