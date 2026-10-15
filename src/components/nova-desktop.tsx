import { useEffect, useState, type ReactNode } from "react";
import {
  Bell, FileText, FolderOpen, Grid2X2, HardDrive, Image, LockKeyhole, Music, Search,
  Settings2, SunMedium, Wifi, Bluetooth, Moon, Volume2, Globe, Terminal,
} from "lucide-react";

type AppId = "files" | "settings" | "notes" | "terminal";
type WinState = "closed" | "open" | "minimized";

const apps: { id: AppId; name: string; icon: typeof HardDrive; tone: string }[] = [
  { id: "files", name: "Files", icon: FolderOpen, tone: "dock-tone-blue" },
  { id: "notes", name: "Notes", icon: FileText, tone: "dock-tone-amber" },
  { id: "terminal", name: "Terminal", icon: Terminal, tone: "dock-tone-slate" },
  { id: "settings", name: "Settings", icon: Settings2, tone: "dock-tone-gray" },
];

export type DesktopFeature = { id: string; title: string; text: string };

function Win({ id, title, state, focused, onFocus, onClose, onMin, onMax, maxed, className = "", children }: {
  id: AppId; title: string; state: WinState; focused: boolean; maxed: boolean; className?: string;
  onFocus: () => void; onClose: () => void; onMin: () => void; onMax: () => void; children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      aria-hidden={state !== "open"}
      data-state={state}
      data-focused={focused}
      data-max={maxed}
      data-app={id}
      onMouseDown={onFocus}
      className={`mac-window ${className}`}
    >
      <header className="mac-titlebar">
        <div className="traffic">
          <button aria-label={`Close ${title}`} className="tl tl-close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <button aria-label={`Minimize ${title}`} className="tl tl-min" onClick={(e) => { e.stopPropagation(); onMin(); }} />
          <button aria-label={`Zoom ${title}`} className="tl tl-max" onClick={(e) => { e.stopPropagation(); onMax(); }} />
        </div>
        <span className="mac-title">{title}</span>
        <span className="w-10" />
      </header>
      <div className="mac-body">{children}</div>
    </section>
  );
}

export default function NovaDesktop({ features, onFeature, Logo }: {
  features: DesktopFeature[]; onFeature: (f: DesktopFeature) => void; Logo: (p: { className?: string }) => ReactNode;
}) {
  const [wins, setWins] = useState<Record<AppId, WinState>>({ files: "open", settings: "closed", notes: "closed", terminal: "closed" });
  const [order, setOrder] = useState<AppId[]>(["files"]);
  const [maxed, setMaxed] = useState<AppId | null>(null);
  const [bounce, setBounce] = useState<AppId | null>(null);
  const [launchpad, setLaunchpad] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [control, setControl] = useState(false);
  const [locked, setLocked] = useState(false);
  const [toast, setToast] = useState(false);
  const [time, setTime] = useState("10:08");
  const [active, setActive] = useState(features[0]!.id);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 30000);
    const n = setTimeout(() => setToast(true), 2200);
    return () => { clearInterval(t); clearTimeout(n); };
  }, []);

  const focus = (id: AppId) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const open = (id: AppId) => {
    if (wins[id] === "closed") { setBounce(id); setTimeout(() => setBounce(null), 700); }
    setWins((w) => ({ ...w, [id]: "open" }));
    focus(id);
    setLaunchpad(false); setSpotlight(false);
  };
  const close = (id: AppId) => { setWins((w) => ({ ...w, [id]: "closed" })); if (maxed === id) setMaxed(null); };
  const minimize = (id: AppId) => setWins((w) => ({ ...w, [id]: "minimized" }));
  const dockClick = (id: AppId) => {
    if (wins[id] === "open" && order[order.length - 1] === id) minimize(id);
    else open(id);
  };
  const closeOverlays = () => { setLaunchpad(false); setSpotlight(false); setControl(false); };

  const pick = (f: DesktopFeature) => {
    setActive(f.id); onFeature(f); closeOverlays(); setLocked(false);
    switch (f.id) {
      case "Start menu": setLaunchpad(true); break;
      case "File manager": open("files"); break;
      case "Settings": open("settings"); break;
      case "Search": setSpotlight(true); break;
      case "Quick settings": setControl(true); break;
      case "Lock screen": setLocked(true); break;
      case "Window snap": open("files"); open("notes"); setMaxed(null); break;
    }
  };
  const top = order[order.length - 1];
  const z = (id: AppId) => ({ zIndex: 10 + order.indexOf(id) });
  const snapped = active === "Window snap";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Desktop concept controls">
        {features.map((f) => (
          <button key={f.id} onClick={() => pick(f)} aria-pressed={active === f.id} className="feature-chip">{f.id}</button>
        ))}
      </div>

      <div className="desktop-frame">
        <div className="mac-screen" onClick={(e) => { if (e.target === e.currentTarget) closeOverlays(); }}>
          <div className="mac-wallpaper" aria-hidden />

          {/* Menu bar */}
          <div className="mac-menubar">
            <div className="flex items-center gap-3">
              <button aria-label="NovaOS menu" onClick={() => setLaunchpad((v) => !v)} className="text-foreground"><Logo className="size-3.5" /></button>
              <span className="font-semibold">{top ? apps.find((a) => a.id === top)?.name : "Finder"}</span>
              <span className="hidden opacity-75 sm:inline">File</span><span className="hidden opacity-75 sm:inline">Edit</span><span className="hidden opacity-75 sm:inline">View</span><span className="hidden opacity-75 md:inline">Window</span>
            </div>
            <div className="flex items-center gap-3">
              <Wifi className="size-3" />
              <button aria-label="Spotlight search" onClick={() => setSpotlight((v) => !v)}><Search className="size-3" /></button>
              <button aria-label="Control center" onClick={() => setControl((v) => !v)}><SunMedium className="size-3" /></button>
              <span className="tabular-nums">{time}</span>
            </div>
          </div>

          {/* Desktop icons */}
          <div className="absolute right-[3%] top-[11%] z-[2] grid gap-3 text-center text-[.55rem]">
            {[["Projects", FolderOpen], ["Photos", Image]].map(([n, I]) => { const Ic = I as typeof Image; return (
              <button key={n as string} onDoubleClick={() => open("files")} onClick={() => open("files")} className="desk-icon"><span className="desk-icon-img"><Ic className="size-4" /></span>{n as string}</button>
            ); })}
          </div>

          {/* Windows */}
          <div style={z("files")} className="contents">
            <Win id="files" title="Files" state={wins.files} focused={top === "files"} maxed={maxed === "files"} className={snapped ? "snap-left" : ""}
              onFocus={() => focus("files")} onClose={() => close("files")} onMin={() => minimize("files")} onMax={() => setMaxed((m) => (m === "files" ? null : "files"))}>
              <div className="grid h-full grid-cols-[30%_1fr]">
                <aside className="mac-sidebar">
                  <p className="mac-side-label">Favourites</p>
                  {["Recents", "Desktop", "Documents", "Downloads"].map((x, i) => <div key={x} className={i === 1 ? "mac-side-item is-active" : "mac-side-item"}>{x}</div>)}
                  <p className="mac-side-label mt-2">Locations</p><div className="mac-side-item">NovaOS HD</div>
                </aside>
                <div className="grid content-start grid-cols-3 gap-2 p-3 sm:grid-cols-4">
                  {["Projects", "Documents", "Images", "Music", "Archive", "Kernel"].map((x, i) => (
                    <div key={x} className="file-tile" style={{ animationDelay: `${i * 40}ms` }}>
                      <span className="file-tile-icon">{i === 3 ? <Music className="size-4" /> : i === 2 ? <Image className="size-4" /> : <FolderOpen className="size-4" />}</span>{x}
                    </div>
                  ))}
                </div>
              </div>
            </Win>
          </div>
          <div style={z("notes")} className="contents">
            <Win id="notes" title="Notes" state={wins.notes} focused={top === "notes"} maxed={maxed === "notes"} className={snapped ? "snap-right" : "win-notes"}
              onFocus={() => focus("notes")} onClose={() => close("notes")} onMin={() => minimize("notes")} onMax={() => setMaxed((m) => (m === "notes" ? null : "notes"))}>
              <div className="space-y-1.5 p-3 text-[.6rem] leading-relaxed">
                <p className="text-[.7rem] font-semibold">NovaOS ideas</p>
                <p className="opacity-75">• Calm, fast desktop</p><p className="opacity-75">• Smooth window motion</p><p className="opacity-75">• Low background usage</p>
              </div>
            </Win>
          </div>
          <div style={z("terminal")} className="contents">
            <Win id="terminal" title="Terminal" state={wins.terminal} focused={top === "terminal"} maxed={maxed === "terminal"} className="win-terminal"
              onFocus={() => focus("terminal")} onClose={() => close("terminal")} onMin={() => minimize("terminal")} onMax={() => setMaxed((m) => (m === "terminal" ? null : "terminal"))}>
              <pre className="terminal-body">{"nova@desktop ~ % uname\nNovaOS (concept)\nnova@desktop ~ % "}<span className="caret" /></pre>
            </Win>
          </div>
          <div style={z("settings")} className="contents">
            <Win id="settings" title="Settings" state={wins.settings} focused={top === "settings"} maxed={maxed === "settings"} className="win-settings"
              onFocus={() => focus("settings")} onClose={() => close("settings")} onMin={() => minimize("settings")} onMax={() => setMaxed((m) => (m === "settings" ? null : "settings"))}>
              <div className="space-y-2 p-3 text-[.6rem]">
                {[["Appearance", "Dark"], ["Accent colour", "Cyan"], ["Reduce motion", "Off"], ["Wallpaper", "Nova"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded-md bg-foreground/[.06] px-2.5 py-1.5"><span>{k}</span><span className="opacity-60">{v}</span></div>
                ))}
              </div>
            </Win>
          </div>

          {/* Launchpad */}
          <div className="mac-launchpad" data-open={launchpad} onClick={() => setLaunchpad(false)}>
            <div className="grid grid-cols-4 gap-5" onClick={(e) => e.stopPropagation()}>
              {[...apps, { id: "files" as AppId, name: "Browser", icon: Globe, tone: "dock-tone-cyan" }, { id: "settings" as AppId, name: "Store", icon: Grid2X2, tone: "dock-tone-violet" }].map((a, i) => (
                <button key={a.name} onClick={() => open(a.id)} className="lp-item" style={{ transitionDelay: launchpad ? `${i * 35}ms` : "0ms" }}>
                  <span className={`dock-icon ${a.tone}`}><a.icon className="size-5" /></span>{a.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spotlight */}
          <div className="mac-spotlight" data-open={spotlight}>
            <div className="flex items-center gap-2 px-3 py-2.5 text-[.7rem]"><Search className="size-3.5 opacity-60" /><span className="opacity-60">Spotlight Search</span><span className="caret" /></div>
            <div className="border-t border-foreground/10 p-1.5 text-[.6rem]">
              {apps.map((a) => <button key={a.id} onClick={() => open(a.id)} className="spot-row"><a.icon className="size-3.5" />{a.name}</button>)}
            </div>
          </div>

          {/* Control center */}
          <div className="mac-control" data-open={control}>
            <div className="grid grid-cols-2 gap-1.5">
              {[["Wi‑Fi", Wifi], ["Bluetooth", Bluetooth], ["Focus", Moon], ["Sound", Volume2]].map(([n, I], i) => { const Ic = I as typeof Wifi; return (
                <div key={n as string} className={i < 2 ? "cc-tile is-on" : "cc-tile"}><Ic className="size-3" />{n as string}</div>
              ); })}
            </div>
            <div className="cc-slider"><SunMedium className="size-3" /><span className="cc-track"><span style={{ width: "70%" }} /></span></div>
            <button onClick={() => { setControl(false); setLocked(true); }} className="cc-tile mt-1.5 w-full"><LockKeyhole className="size-3" />Lock screen</button>
          </div>

          {/* Notification */}
          <div className="mac-toast" data-open={toast} onClick={() => setToast(false)}>
            <span className="dock-icon dock-tone-cyan size-6"><Bell className="size-3" /></span>
            <div><p className="font-semibold">NovaOS</p><p className="opacity-70">Welcome to the concept desktop.</p></div>
          </div>

          {/* Lock screen */}
          <button className="mac-lock" data-open={locked} onClick={() => setLocked(false)} aria-label="Unlock concept desktop">
            <span className="text-3xl font-light tabular-nums md:text-5xl">{time}</span>
            <span className="mt-6 grid size-10 place-items-center rounded-full bg-foreground/15"><Logo className="size-5" /></span>
            <span className="mt-2 text-[.65rem]">Nova User · click to unlock</span>
          </button>

          {/* Dock */}
          <nav className="mac-dock" aria-label="Dock">
            <button className="dock-item" onClick={() => setLaunchpad((v) => !v)} aria-label="Launchpad">
              <span className="dock-icon dock-tone-cyan"><Logo className="size-5" /></span><span className="dock-tip">Launchpad</span>
            </button>
            <span className="dock-sep" />
            {apps.map((a) => (
              <button key={a.id} className="dock-item" data-bounce={bounce === a.id} onClick={() => dockClick(a.id)} aria-label={a.name}>
                <span className={`dock-icon ${a.tone}`}><a.icon className="size-5" /></span>
                <span className="dock-tip">{a.name}</span>
                <span className="dock-dot" data-on={wins[a.id] !== "closed"} />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
