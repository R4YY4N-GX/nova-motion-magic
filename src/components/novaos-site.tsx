import { useState } from "react";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  AudioLines,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Cpu,
  Download,
  FileText,
  Fingerprint,
  Gamepad2,
  Grid2X2,
  HardDrive,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Monitor,
  MousePointer2,
  PanelLeft,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NovaDesktop from "@/components/nova-desktop";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const links = [
  ["Overview", "overview"],
  ["Features", "features"],
  ["Performance", "performance"],
  ["Compatibility", "comparison"],
  ["Compare", "applications"],
  ["Roadmap", "roadmap"],
  ["FAQ", "faq"],
] as const;

const featureCards = [
  { icon: Layers3, title: "Lightweight by design", body: "Aiming to minimize unnecessary background services, resource-heavy components, and idle activity." },
  { icon: Fingerprint, title: "An independent foundation", body: "A long-term goal to create an original kernel and operating system—not simply re-skin a desktop." },
  { icon: LayoutDashboard, title: "A familiar desktop", body: "A clear Start menu, taskbar, file manager, settings, shortcuts, and considered window management." },
  { icon: Sparkles, title: "Smooth interactions", body: "Subtle motion for windows, applications, desktop switching, and everyday navigation." },
  { icon: Code2, title: "Efficient applications", body: "A preference for lightweight applications and efficient system APIs where practical." },
  { icon: Gamepad2, title: "Gaming, in time", body: "A long-term ambition. Actual support will depend on future drivers, graphics, and game compatibility." },
];

const targets = [
  ["Low idle memory usage", "Target"],
  ["Fewer unnecessary processes", "Design goal"],
  ["Fast startup", "Target"],
  ["Responsive interactions", "Design goal"],
  ["Efficient idle CPU use", "Target"],
];

const applicationModes = [
  { id: "native", title: "Native", eyebrow: "Built for the system", strength: "Can make efficient use of system APIs and resources.", tradeoff: "Efficiency still depends on how each application is implemented.", use: "System tools, focused desktop apps" },
  { id: "web", title: "Web", eyebrow: "Runs in a browser", strength: "Easy to distribute and update across different devices.", tradeoff: "Resource use varies widely with the app and the browser.", use: "Services, content, collaboration" },
  { id: "electron", title: "Electron", eyebrow: "Web tech, packaged", strength: "A shared browser runtime can simplify cross-platform development.", tradeoff: "Bundling a runtime can add memory and storage overhead.", use: "Cross-platform apps where the trade-offs fit" },
];

const comparisonRows = [
  { category: "foundation", label: "Operating system foundation", nova: "Independent OS is a long-term goal", windows: "Established commercial operating system", linux: "A family of operating systems" },
  { category: "foundation", label: "Kernel", nova: "Original kernel: long-term development goal", windows: "Windows NT kernel family", linux: "Linux kernel" },
  { category: "experience", label: "Desktop experience", nova: "Familiar direction with original branding", windows: "Familiar desktop for many people", linux: "Varies by distribution and desktop" },
  { category: "experience", label: "Resource philosophy", nova: "Efficiency is a goal; no benchmarks yet", windows: "Varies by version, setup, and apps", linux: "Lightweight desktop options are available" },
  { category: "experience", label: "Customization", nova: "Configurable desktop is a planned direction", windows: "Options vary across editions and tools", linux: "Many distributions and environments" },
  { category: "ecosystem", label: "Applications", nova: "Native ecosystem is a long-term goal", windows: "Broad desktop application ecosystem", linux: "Broad range; availability varies" },
  { category: "ecosystem", label: "Gaming", nova: "Long-term goal; compatibility unestablished", windows: "Broad catalogue; support varies by title", linux: "Varies by game, driver, and compatibility layer" },
  { category: "ecosystem", label: "Software installation", nova: "Secure, convenient system is planned", windows: "Store and other installation methods", linux: "Package tools vary by distribution" },
  { category: "hardware", label: "Hardware & drivers", nova: "Limited initial target, expand gradually", windows: "Broad device and peripheral support", linux: "Support varies by device and distribution" },
  { category: "hardware", label: "Security & updates", nova: "Transparent controls are design goals", windows: "Established update and security systems", linux: "Tools and policies vary by distribution" },
  { category: "hardware", label: "Development status", nova: "In development", windows: "Established product", linux: "Actively developed across many projects" },
  { category: "hardware", label: "Ease of adoption", nova: "Not ready to replace an existing OS", windows: "Widely familiar and supported", linux: "Depends on distribution and experience" },
];

const useCases = [
  ["Everyday computing", "Planned direction", "Web browsing, files, documents, media, and daily tasks."],
  ["Productivity", "Planned direction", "Multitasking, window snapping, keyboard shortcuts, and virtual desktops."],
  ["Development", "Long-term goal", "A useful developer environment, terminal tools, efficient builds, and APIs."],
  ["Gaming", "Long-term goal", "Graphics, controllers, launchers, and compatibility remain areas to explore."],
  ["Resource-constrained PCs", "Design goal", "A modular base and efficient desktop intended to avoid needless overhead."],
  ["Customization", "Planned direction", "Accent colors, wallpapers, taskbar preferences, and animation settings."],
] as const;

const desktopFeatures = [
  { id: "Desktop", title: "A calm desktop", text: "An original NovaOS visual language with familiar tools, a focused workspace, and a flexible taskbar." },
  { id: "Start menu", title: "A thoughtful Start menu", text: "A planned home for pinned apps, recent files, and straightforward navigation." },
  { id: "File manager", title: "Files, in reach", text: "A proposed file browser with a clear sidebar, recent locations, and simple folder navigation." },
  { id: "Settings", title: "Settings with clarity", text: "An intended place to adjust appearance, devices, privacy, updates, and system preferences." },
  { id: "Quick settings", title: "Quick settings", text: "A concept for nearby network, sound, and system controls alongside notifications." },
  { id: "Window snap", title: "Room for every task", text: "Window snapping and multiple workspaces are part of the planned desktop direction." },
  { id: "Lock screen", title: "A considered sign-in", text: "A future lock screen and account experience will follow the needs of the finished system." },
  { id: "Search", title: "Search across the desktop", text: "A discoverable way to find apps and settings is planned for the NovaOS desktop." },
];

const roadmap = [
  ["01", "Foundation", "Architecture, development environment, an emulator boot path, diagnostics, and debugging tools."],
  ["02", "Core system", "Memory management, interrupts, basic scheduling, initial device support, and filesystem research."],
  ["03", "Usable system", "Application loading, input, graphics output, storage tools, and essential services."],
  ["04", "Desktop environment", "Window management, shell, Start menu, taskbar, file manager, settings, and input."],
  ["05", "Application ecosystem", "Native application framework, installation, security model, developer tools, and updates."],
  ["06", "Hardware & gaming research", "Graphics strategy, audio, networking, controller support, and compatibility research."],
  ["07", "Early public builds", "Recovery, hardware testing, documentation, security reviews, and safe public downloads."],
] as const;

const faqs = [
  ["Is NovaOS available to download?", "NovaOS is in development. Public downloads will be announced when a usable build is available."],
  ["Is NovaOS based on Linux?", "The long-term goal is an independent operating system with its own kernel. NovaOS is not intended to be simply a Linux distribution with a different desktop."],
  ["Will NovaOS use less RAM than Windows?", "Reducing unnecessary memory use is a core design goal. Reliable comparisons require a working build and controlled benchmarks."],
  ["Will NovaOS run Windows applications?", "Windows application compatibility is not a primary initial requirement. Future options may be researched, but support is not guaranteed."],
  ["Will NovaOS support gaming?", "Gaming is a long-term goal. Support will depend on graphics drivers, APIs, game compatibility, anti-cheat systems, and other technical requirements."],
  ["Will there be a mobile version?", "A mobile edition is a future possibility, not a currently available product."],
  ["Which devices will NovaOS support?", "Development will begin with a limited hardware target. Broader support can be considered after the core system is stable."],
  ["Can I contribute?", "Community and contributions are coming soon. A real repository or contribution process has not been announced."],
] as const;

function NovaMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 40 40" fill="none">
      <path d="M20 2.8 24.3 15.7 37.2 20l-12.9 4.3L20 37.2l-4.3-12.9L2.8 20l12.9-4.3L20 2.8Z" fill="url(#nova-gradient)" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <defs><linearGradient id="nova-gradient" x1="6" y1="34" x2="34" y2="6" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" stopOpacity=".42"/><stop offset=".52" stopColor="currentColor"/><stop offset="1" stopColor="currentColor" stopOpacity=".68"/></linearGradient></defs>
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <a className="inline-flex items-center gap-2.5 text-foreground" href="#overview" aria-label="NovaOS home"><NovaMark className="size-8 text-brand-cyan" /><span className={compact ? "font-semibold" : "font-display text-lg font-semibold"}>NovaOS</span></a>;
}

function SiteHeader({ onDownload }: { onDownload: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="page-width flex min-h-[4.4rem] items-center justify-between gap-6">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
          {links.map(([label, id]) => <a key={id} className="top-link nav-link text-[.78rem]" href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <span className="pill-status">In development</span>
          <Button onClick={onDownload} size="sm" className="gap-2 rounded-sm px-4">Download <ArrowRight /></Button>
        </div>
        <Button aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} variant="outline" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-4 py-3 md:hidden">
        <div className="page-width grid gap-1">{links.map(([label, id]) => <a key={id} className="top-link rounded-md px-3 py-2.5 text-sm" href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<Button onClick={() => { setMenuOpen(false); onDownload(); }} className="mt-2">Download NovaOS <ArrowRight /></Button></div>
      </nav>}
    </header>
  );
}

function SectionHeading({ kicker, title, copy, align = "left" }: { kicker: string; title: string; copy?: string; align?: "left" | "center" }) {
  return <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><div className={`section-kicker ${align === "center" ? "justify-center" : ""}`}>{kicker}</div><h2 className="section-title">{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

function DesktopPreview() {
  const [selectedFeature, setSelectedFeature] = useState(desktopFeatures[0]!);
  return (
    <div className="space-y-6">
      <NovaDesktop features={desktopFeatures} onFeature={setSelectedFeature} Logo={NovaMark} />
      <p aria-live="polite" className="mx-auto max-w-2xl text-center text-sm leading-7 text-muted-foreground"><span className="font-medium text-foreground">{selectedFeature.title}.</span> {selectedFeature.text} <span className="text-brand-cyan">Concept only—not a working OS.</span></p>
    </div>
  );
}

function SiteFooter({ onDownload }: { onDownload: () => void }) {
  return <footer className="border-t border-border bg-surface-deep">
    <div className="page-width grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
      <div><Brand/><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Independent by design. Lightweight by intention. Familiar by experience.</p><div className="mt-4 pill-status">An independent OS in development</div></div>
      <div><p className="mb-3 text-sm font-semibold">Explore</p><div className="grid gap-2.5 text-sm">{links.slice(0, 5).map(([name, id]) => <a key={id} className="footer-link" href={`#${id}`}>{name}</a>)}</div></div>
      <div><p className="mb-3 text-sm font-semibold">NovaOS</p><div className="grid gap-2.5 text-sm"><a className="footer-link" href="#devices">Desktop edition</a><a className="footer-link" href="#devices">Mobile concept</a><a className="footer-link" href="#security">Privacy goals</a><button className="footer-link text-left" onClick={onDownload}>Download center</button></div></div>
      <div><p className="mb-3 text-sm font-semibold">Coming soon</p><div className="grid gap-2.5 text-sm text-muted-foreground"><span>Documentation</span><span>Community</span><span>Development updates</span><span>Contributions</span></div></div>
    </div>
    <div className="page-width flex flex-col gap-2 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} NovaOS. Project in development.</span><span>Future plans are not current product capabilities.</span></div>
  </footer>;
}

export default function NovaOSSite() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "mobile">("desktop");
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <main className="site-shell" data-reduced-motion={reduceMotion}>
      <SiteHeader onDownload={() => setDownloadOpen(true)} />
      <section id="overview" className="relative scroll-mt-20 overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="subtle-grid absolute inset-x-0 top-0 h-[42rem]" />
        <div className="hero-halo" />
        <div className="hero-orbit left-1/2 top-[-28rem] -translate-x-1/2" />
        <div className="page-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface-deep/80 px-3 py-1.5 text-xs text-muted-foreground"><NovaMark className="size-4 text-brand-cyan"/><span>Independent by design</span><span className="mx-1 h-3 w-px bg-border"/><span className="text-brand-cyan">In development</span></div>
            <h1 className="font-display text-[2.85rem] font-medium leading-[1.04] tracking-normal sm:text-6xl lg:text-[4.5rem]">Meet NovaOS.<br/><span className="text-brand-cyan">A new kind of desktop experience.</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">An independent operating system designed around efficiency, simplicity, and a desktop experience that feels natural. Built with a vision for less overhead, smooth interactions, and more control over your PC.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3"><Button asChild size="lg" className="rounded-sm px-6"><a href="#features">Explore NovaOS <ArrowDown/></a></Button><Button size="lg" variant="outline" className="rounded-sm px-6" onClick={() => setDownloadOpen(true)}>Download NovaOS <Download/></Button></div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-brand-cyan"/>A product in development</span><span className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-brand-cyan"/>No unsupported benchmarks</span><span className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-brand-cyan"/>No public download yet</span></div>
          </div>
          <div className="mt-16 md:mt-20"><DesktopPreview /></div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-border/70 py-5 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><Cpu className="size-4 text-brand-cyan"/>Independent kernel is a long-term goal</span><span className="inline-flex items-center gap-2"><Zap className="size-4 text-brand-violet"/>Efficiency is a design goal</span><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-success"/>Future plans, clearly labelled</span></div>
        </div>
      </section>

      <section id="devices" className="section-space scroll-mt-16 border-t border-border/70 bg-surface-deep/55">
        <div className="page-width">
          <SectionHeading kicker="One vision. Multiple devices." title="One vision. Multiple devices." copy="The NovaOS desktop is the focus. A phone edition remains a future possibility, not a product in development." />
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Choose a device concept">
            <Button variant={selectedDevice === "desktop" ? "secondary" : "outline"} aria-pressed={selectedDevice === "desktop"} onClick={() => setSelectedDevice("desktop")}><Monitor/> NovaOS Desktop</Button>
            <Button variant={selectedDevice === "mobile" ? "secondary" : "outline"} aria-pressed={selectedDevice === "mobile"} onClick={() => setSelectedDevice("mobile")}><Smartphone/> NovaOS Mobile</Button>
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            <article className={`interactive-card rounded-md p-5 md:p-7 ${selectedDevice === "desktop" ? "border-brand-cyan/50" : "opacity-80"}`}>
              <div className="device-visual"><div className="monitor-shell"><div className="mini-screen"/></div></div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-xl font-medium">NovaOS Desktop</h3><span className="pill-status">Desktop edition · In development</span></div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Designed for desktop productivity, everyday computing, development, and a long-term gaming-focused experience.</p>
              <div className="mt-5 flex flex-wrap gap-3"><Button asChild size="sm" variant="outline"><a href="#desktop">Explore desktop <ArrowRight/></a></Button><Button asChild size="sm" variant="ghost"><a href="#roadmap">View roadmap</a></Button></div>
            </article>
            <article className={`interactive-card rounded-md p-5 md:p-7 ${selectedDevice === "mobile" ? "border-brand-violet/55" : "opacity-80"}`}>
              <div className="device-visual"><div className="phone-shell"><div className="phone-screen"><div className="flex items-center justify-between text-[.42rem] text-foreground/75"><span>9:41</span><span>● ● ▰</span></div><div className="mx-auto grid size-9 place-items-center rounded-xl border border-foreground/10 bg-foreground/10 text-brand-cyan"><NovaMark className="size-6"/></div><div className="grid grid-cols-3 gap-1.5">{Array.from({ length: 6 }, (_, i) => <span key={i} className="aspect-square rounded-md border border-foreground/10 bg-foreground/[.07]"/>)}</div></div></div></div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-xl font-medium">NovaOS Mobile</h3><span className="pill-status">Future possibility</span></div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Explore the future of NovaOS on phones, with a vision for a lightweight, connected, intuitive mobile experience. Mobile development has not been announced.</p>
              <div className="mt-5 flex flex-wrap gap-3"><Button asChild size="sm" variant="outline"><a href="#roadmap">Explore mobile plans <ArrowRight/></a></Button></div>
            </article>
          </div>
        </div>
      </section>

      <section id="features" className="section-space scroll-mt-16">
        <div className="page-width"><SectionHeading kicker="Why NovaOS?" title="Less overhead. More room to do what matters." copy="A set of deliberate product goals for an independent desktop operating system. These are intentions—not claims about a finished build."/>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featureCards.map(({ icon: Icon, title, body }, index) => <article key={title} className="interactive-card min-h-48 rounded-md p-5"><div className="flex items-center justify-between"><span className="icon-tile"><Icon className="size-[1.15rem]"/></span><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-6 font-display text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
        </div>
      </section>

      <section id="performance" className="section-space scroll-mt-16 border-y border-border/70 bg-surface-deep/55">
        <div className="page-width grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div><SectionHeading kicker="Performance philosophy" title="Your hardware should work for you." copy="NovaOS aims to reduce unnecessary background activity, keep the base system modular, and use resources thoughtfully—without pretending any of that has been measured yet."/><ul className="mt-7 grid gap-3 text-sm text-muted-foreground">{["Load services only when useful, where practical", "Use memory and idle CPU efficiently", "Prefer efficient native apps when they fit", "Support GPU-accelerated rendering where possible", "Make optional animation easy to reduce"].map((item) => <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-brand-cyan"/>{item}</li>)}</ul></div>
          <div className="space-y-5">
            <div className="glass-surface rounded-md p-5 md:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="section-kicker">System thinking</span><h3 className="mt-3 font-display text-xl font-medium">A focused foundation</h3></div><span className="pill-status">Illustrative only · not measured</span></div>
              <div className="mt-7 space-y-3"><div className="flex items-center gap-3"><span className="w-28 shrink-0 text-xs text-muted-foreground">Core system</span><span className="target-bar w-[30%]"/><span className="text-xs text-muted-foreground">Essential foundations</span></div><div className="flex items-center gap-3"><span className="w-28 shrink-0 text-xs text-muted-foreground">On-demand services</span><span className="target-bar w-[19%] bg-brand-violet"/><span className="text-xs text-muted-foreground">When useful</span></div><div className="flex items-center gap-3"><span className="w-28 shrink-0 text-xs text-muted-foreground">Your applications</span><span className="target-bar w-[43%] bg-success"/><span className="text-xs text-muted-foreground">The work you choose</span></div></div>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">Concept diagram—not a measurement, allocation, or performance claim.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">{targets.map(([target, status]) => <div key={target} className="flex items-start justify-between gap-3 border-b border-border py-3"><span className="text-sm text-foreground/90">{target}</span><span className="shrink-0 text-[.68rem] text-brand-cyan">{status}</span></div>)}</div>
            <p className="text-xs leading-5 text-muted-foreground">Actual performance will depend on hardware, drivers, applications, and the final implementation. No benchmark results are available.</p>
          </div>
        </div>
      </section>

      <section id="applications" className="section-space scroll-mt-16">
        <div className="page-width"><SectionHeading kicker="Application choices" title="Less unnecessary overhead. Smarter application choices." copy="NovaOS aims to favor efficient technologies while choosing the right tool for each application—not banning a particular framework."/>
          <div className="mt-10 grid gap-3 lg:grid-cols-3">{applicationModes.map((app, index) => <article key={app.id} className="interactive-card rounded-md p-5 md:p-6"><div className="flex items-start justify-between"><span className="icon-tile">{index === 0 ? <Code2/> : index === 1 ? <Layers3/> : <Grid2X2/>}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-5 font-display text-xl font-medium">{app.title}</h3><p className="mt-1 text-xs text-brand-cyan">{app.eyebrow}</p><div className="mt-5 space-y-4 text-sm leading-6"><div><p className="text-xs font-semibold uppercase text-muted-foreground">Strength</p><p className="mt-1 text-foreground/85">{app.strength}</p></div><div><p className="text-xs font-semibold uppercase text-muted-foreground">Trade-off</p><p className="mt-1 text-muted-foreground">{app.tradeoff}</p></div><div className="border-t border-border pt-3"><p className="text-xs text-muted-foreground">Often suitable for</p><p className="mt-1 text-foreground/85">{app.use}</p></div></div></article>)}</div>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">Reduced reliance on heavyweight runtimes is a design goal. Efficiency depends on the application and how it is built.</p>
        </div>
      </section>

      <section id="comparison" className="section-space scroll-mt-16 border-y border-border/70 bg-surface-deep/55">
        <div className="page-width"><SectionHeading kicker="A clear-eyed comparison" title="Different foundations. Different priorities." copy="NovaOS is an early project, not a mature replacement for Windows or Linux. The comparison describes different approaches—not a universal ranking."/>
          <Tabs defaultValue="all" className="mt-8">
            <TabsList className="h-auto max-w-full flex-wrap justify-start gap-1 bg-transparent p-0">{([["all", "All topics"], ["foundation", "Foundation"], ["experience", "Experience"], ["ecosystem", "Ecosystem"], ["hardware", "Hardware & status"]] as const).map(([value, label]) => <TabsTrigger key={value} value={value} className="rounded-full border border-border bg-background px-3 py-2 text-xs data-[state=active]:border-brand-cyan/50 data-[state=active]:bg-secondary">{label}</TabsTrigger>)}</TabsList>
            {[["all", comparisonRows], ...(["foundation", "experience", "ecosystem", "hardware"].map((category) => [category, comparisonRows.filter((row) => row.category === category)] as const))].map(([tab, rows]) => <TabsContent key={tab as string} value={tab as string} className="mt-5 focus-visible:ring-0"><div className="comparison-scroll rounded-md border border-border bg-background"><table className="comparison-table"><caption className="sr-only">NovaOS, Windows, and Linux comparison</caption><thead><tr><th scope="col">Category</th><th scope="col">NovaOS</th><th scope="col">Windows</th><th scope="col">Linux</th></tr></thead><tbody>{(rows as typeof comparisonRows).map((row) => <tr key={row.label}><th scope="row" className="text-left">{row.label}</th><td>{row.nova}</td><td>{row.windows}</td><td>{row.linux}</td></tr>)}</tbody></table></div></TabsContent>)}
          </Tabs>
          <div className="mt-5 flex gap-3 rounded-md border border-brand-cyan/20 bg-brand-cyan/5 p-4"><CircleHelp className="mt-0.5 size-4 shrink-0 text-brand-cyan"/><p className="text-sm leading-6 text-muted-foreground">NovaOS aims to develop its own kernel over time. It is not yet a mature replacement for Windows or Linux, and claims about speed, security, compatibility, or superiority would be premature.</p></div>
        </div>
      </section>

      <section id="use-cases" className="section-space scroll-mt-16">
        <div className="page-width"><SectionHeading kicker="What is NovaOS optimized for?" title="For everyday work. And what comes next." copy="Each focus area is a direction for the project, not a promise that the capability is already available."/>
          <Accordion type="single" collapsible className="mt-8 grid gap-x-12 md:grid-cols-2">{useCases.map(([title, status, body], index) => <AccordionItem key={title} value={title} className="faq-item"><AccordionTrigger className="gap-4 py-5 text-left hover:no-underline"><span className="flex min-w-0 items-center gap-3"><span className="text-xs text-brand-cyan">0{index + 1}</span><span className="font-medium">{title}</span></span><span className="ml-auto mr-2 shrink-0 text-[.66rem] text-muted-foreground">{status}</span></AccordionTrigger><AccordionContent className="pl-8 pr-4 text-sm leading-6 text-muted-foreground">{body}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>

      <section id="desktop" className="section-space scroll-mt-16 border-y border-border/70 bg-surface-deep/55">
        <div className="page-width"><SectionHeading kicker="The desktop experience" title="Familiar where it helps. Original where it matters." copy="Explore a proposed desktop interface. The interactive preview is a design concept—not a working operating system."/><div className="mt-9"><DesktopPreview/></div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border border-border px-5 py-4"><div><p className="font-medium">Reduce motion</p><p className="mt-1 text-sm text-muted-foreground">Simplify nonessential transitions. Your system preference is respected too.</p></div><Button variant={reduceMotion ? "secondary" : "outline"} role="switch" aria-checked={reduceMotion} onClick={() => setReduceMotion((value) => !value)}>{reduceMotion ? <Check/> : <MousePointer2/>}{reduceMotion ? "Reduced motion on" : "Reduced motion off"}</Button></div>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Opening and closing windows, notifications, search, settings, quick controls, and the Start menu can be explored above. Motion can be simplified or disabled by your device accessibility preference.</p>
        </div>
      </section>

      <section id="security" className="section-space scroll-mt-16">
        <div className="page-width grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><SectionHeading kicker="Security & privacy" title="Designed with control and transparency in mind." copy="Security and privacy are product design goals, not proven advantages over established systems."/></div>
          <div className="grid gap-x-8 sm:grid-cols-2">{[[ShieldCheck, "Clear permissions", "A permission model people can understand."], [LockKeyhole, "Secure installation", "Software installation designed around safeguards."], [Check, "Verified updates", "A clear approach to trusted system updates."], [Layers3, "Isolation, where supported", "Process and memory isolation suited to the final architecture."], [Fingerprint, "Transparent privacy", "Privacy settings that make system behavior visible."], [Bell, "Useful system status", "Clear security status and update notifications."]].map(([Icon, title, description]) => { const FeatureIcon = Icon as typeof ShieldCheck; return <div key={title as string} className="flex gap-3 border-b border-border py-4"><span className="icon-tile size-9 shrink-0"><FeatureIcon className="size-4"/></span><div><h3 className="text-sm font-medium">{title as string}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{description as string}</p></div></div>; })}</div>
          <div className="lg:col-start-2"><p className="text-xs leading-5 text-muted-foreground">These principles remain design goals until implemented and tested in a real NovaOS release.</p></div>
        </div>
      </section>

      <section id="download" className="section-space scroll-mt-16 border-y border-border/70 bg-surface-deep/55">
        <div className="page-width"><SectionHeading kicker="Download center" title="Your next operating system starts here." copy="NovaOS is in development. Public installation images will be provided when a suitable build is ready."/>
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <article className="glass-surface rounded-md p-6 md:p-8"><div className="flex items-start justify-between gap-4"><span className="icon-tile"><Monitor/></span><span className="pill-status">Not yet available</span></div><h3 className="mt-6 font-display text-2xl font-medium">NovaOS Desktop</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">For desktop PCs and laptops. Initial x86-64 target is subject to development progress.</p><div className="my-6 grid gap-3 border-y border-border py-5 text-sm sm:grid-cols-2"><div><p className="text-xs text-muted-foreground">Release</p><p className="mt-1">Not yet available</p></div><div><p className="text-xs text-muted-foreground">Download size</p><p className="mt-1">Not announced</p></div><div><p className="text-xs text-muted-foreground">Release notes</p><p className="mt-1">Coming soon</p></div><div><p className="text-xs text-muted-foreground">Checksum</p><p className="mt-1">Not announced</p></div></div><Button onClick={() => setDownloadOpen(true)}>Download NovaOS <Download/></Button></article>
            <article className="interactive-card rounded-md p-6 md:p-8"><div className="flex items-start justify-between gap-4"><span className="icon-tile text-brand-violet"><Smartphone/></span><span className="pill-status">Future possibility</span></div><h3 className="mt-6 font-display text-2xl font-medium">NovaOS Mobile</h3><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">A conceptual direction for phones. Mobile development has not been confirmed and no download is available.</p><div className="mt-6 border-y border-border py-5 text-sm"><p className="text-xs text-muted-foreground">Availability</p><p className="mt-1">No mobile release announced</p></div><Button asChild variant="outline" className="mt-5"><a href="#roadmap">Explore mobile plans <ArrowRight/></a></Button></article>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-space scroll-mt-16">
        <div className="page-width grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20"><div><SectionHeading kicker="Proposed development path" title="The work, in stages." copy="A proposed sequence, not a dated release plan. Each phase is currently marked planned."/><p className="mt-6 pill-status">All phases · Planned</p></div>
          <div className="relative space-y-0 pl-8"> <div className="timeline-line"/>{roadmap.map(([number, title, body]) => <article key={number} className="relative border-b border-border py-5 last:border-b-0"><span className="absolute -left-[2rem] top-[1.45rem] grid size-[1.15rem] place-items-center rounded-full border border-brand-cyan/60 bg-background text-[.52rem] text-brand-cyan">{number}</span><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-lg font-medium">{title}</h3><span className="text-[.7rem] text-muted-foreground">Planned</span></div><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{body}</p></article>)}</div>
          <div className="lg:col-start-2"><div className="flex gap-3 rounded-md border border-border bg-surface-deep/60 p-4"><ArrowLeftRight className="mt-0.5 size-4 shrink-0 text-brand-cyan"/><p className="text-xs leading-5 text-muted-foreground">Phases and sequencing may change as engineering progresses. No milestone is complete or in progress unless announced.</p></div></div>
        </div>
      </section>

      <section id="faq" className="section-space scroll-mt-16 border-y border-border/70 bg-surface-deep/55">
        <div className="page-width grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"><div><SectionHeading kicker="Frequently asked" title="Good questions. Honest answers." copy="What is known, what is planned, and what remains open."/></div>
          <Accordion type="single" collapsible className="w-full">{faqs.map(([question, answer]) => <AccordionItem key={question} value={question} className="faq-item"><AccordionTrigger className="py-5 text-left text-[.95rem] font-medium hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pr-8 text-sm leading-6 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>

      <section id="community" className="section-space scroll-mt-16">
        <div className="page-width"><div className="glass-surface relative overflow-hidden rounded-md p-7 md:p-10"><div className="subtle-grid absolute inset-0 opacity-40"/><div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><div className="section-kicker">Community & updates</div><h2 className="section-title max-w-2xl text-3xl md:text-4xl">A new platform starts with thoughtful work.</h2><p className="section-copy max-w-xl">Development updates, documentation, source code, and community channels will be shared when official links are available.</p></div><span className="pill-status w-fit">Community coming soon</span></div>
            <div className="relative mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{[["Development updates", "Project progress and announcements"], ["Technical blog", "Ideas behind the platform"], ["Source code", "Official repository"], ["Bug reporting", "Report an issue"], ["Community discussions", "Meet other early supporters"], ["Contribution guide", "Help shape the project"]].map(([name, description]) => <div key={name} className="flex items-start justify-between gap-3 border-t border-border/70 py-4"><div><h3 className="text-sm font-medium">{name}</h3><p className="mt-1 text-xs text-muted-foreground">{description}</p></div><span className="shrink-0 text-[.68rem] text-muted-foreground">Soon</span></div>)}</div>
          </div></div>
      </section>

      <SiteFooter onDownload={() => setDownloadOpen(true)} />
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="max-h-[min(90vh,40rem)] overflow-y-auto border-border bg-popover sm:max-w-md">
          <DialogHeader><div className="icon-tile mb-3"><Download/></div><DialogTitle className="font-display text-2xl">NovaOS is in development</DialogTitle><DialogDescription className="pt-2 text-left leading-6">Public installation images are not yet available. We will share a download when a usable build is ready. No file will be downloaded.</DialogDescription></DialogHeader>
          <div className="grid gap-3 rounded-md border border-border bg-surface-deep p-4 text-sm"><div className="flex justify-between gap-3"><span className="text-muted-foreground">Release status</span><span>Not yet available</span></div><div className="flex justify-between gap-3"><span className="text-muted-foreground">Architecture</span><span>x86-64 target, subject to progress</span></div><div className="flex justify-between gap-3"><span className="text-muted-foreground">Release notes</span><span>Coming soon</span></div></div>
          <Button disabled className="w-full" aria-label="Download unavailable—coming soon">Download coming soon <Download/></Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}