"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GradientButton, OutlineButton, GhostButton, IconButton } from "@/lib/components/buttons";
import { TiltCard, StatCard, ProfileCard } from "@/lib/components/cards";
import { Badge, StatusBadge, CountBadge } from "@/lib/components/badges";
import { TextInput, SearchInput, Textarea } from "@/lib/components/inputs";
import { Toggle, Checkbox } from "@/lib/components/toggles";
import { Modal, AlertDialog } from "@/lib/components/modals";
import { SpinnerLoader, PulseLoader, ProgressBar, Skeleton } from "@/lib/components/loaders";
import { Tooltip } from "@/lib/components/tooltips";
import CustomCursor from "@/components/CustomCursor";

const SECTIONS = [
  "Buttons", "Badges", "Cards", "Inputs", "Toggles", "Modals", "Loaders", "Tooltips",
] as const;

type Section = typeof SECTIONS[number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[0.71rem] font-medium tracking-[0.14em] uppercase text-violet mb-5 before:block before:w-[22px] before:h-px before:bg-violet">
      {children}
    </p>
  );
}

function ShowcaseSection({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 border-t border-white/[0.07]">
      <SectionLabel>{title}</SectionLabel>
      {children}
    </section>
  );
}

function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-surface2 rounded-[14px] border border-white/[0.06] overflow-hidden mt-4">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-surface">
        <span className="text-[0.72rem] font-mono text-muted">{lang}</span>
        <button
          onClick={copy}
          className="text-[0.72rem] text-muted hover:text-white transition-colors cursor-none flex items-center gap-1.5"
        >
          {copied ? (
            <><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#6fffd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span className="text-mint">Copied!</span></>
          ) : (
            <><svg width="11" height="11" viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 9V2.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>Copy</>
          )}
        </button>
      </div>
      <pre className="p-4 text-[0.8rem] font-mono leading-[1.75] text-white/80 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TabGroup({ tabs, children }: { tabs: string[]; children: (tab: string) => React.ReactNode }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div>
      <div className="flex gap-1 mb-4 bg-surface2 border border-white/[0.07] rounded-[10px] p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-3.5 py-1.5 text-[0.78rem] font-medium rounded-[8px] transition-all duration-200 cursor-none ${active === t ? "bg-violet text-white shadow-glow" : "text-muted2 hover:text-white"}`}
          >
            {t}
          </button>
        ))}
      </div>
      {children(active)}
    </div>
  );
}

// ─── Button Codes ──────────────────────────────────────────────────────────
const BUTTON_REACT = `import { GradientButton, OutlineButton, GhostButton } from "@/lib/components/buttons";

// Gradient (primary)
<GradientButton>Browse Components</GradientButton>
<GradientButton size="sm">Small</GradientButton>
<GradientButton size="lg">Large</GradientButton>

// Outline (secondary)
<OutlineButton>View on GitHub</OutlineButton>

// Ghost (tertiary)
<GhostButton>Cancel</GhostButton>`;

const BUTTON_HTML = `<!-- Gradient Button -->
<button class="btn-gradient">Browse Components</button>

<!-- Outline Button -->
<button class="btn-outline">View on GitHub</button>

<!-- Ghost Button -->
<button class="btn-ghost">Cancel</button>

<style>
.btn-gradient {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #7c6fff, #ff6fa8);
  box-shadow: 0 0 28px rgba(124,111,255,0.42);
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.btn-gradient:hover { box-shadow: 0 0 50px rgba(124,111,255,0.5); transform: translateY(-2px); }

.btn-outline {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 10px;
  font-size: 0.92rem;
  color: #fff;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.btn-outline:hover { border-color: rgba(124,111,255,0.5); background: rgba(124,111,255,0.07); }

.btn-ghost {
  display: inline-flex;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 0.92rem;
  color: #9090cc;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.btn-ghost:hover { color: #fff; background: rgba(255,255,255,0.05); }
</style>`;

// ─── Badge Codes ───────────────────────────────────────────────────────────
const BADGE_REACT = `import { Badge, StatusBadge, CountBadge } from "@/lib/components/badges";

<Badge variant="violet">New release</Badge>
<Badge variant="pink" dot>Trending</Badge>
<Badge variant="mint" dot pulse>Live</Badge>
<StatusBadge status="online" />
<CountBadge count={42} />`;

const BADGE_HTML = `<span class="badge badge-violet">New release</span>
<span class="badge badge-pink"><span class="badge-dot"></span>Trending</span>
<span class="badge badge-mint">Free</span>

<style>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.72rem;
  font-weight: 500;
  border: 1px solid;
}
.badge-violet { color: #7c6fff; background: rgba(124,111,255,0.1); border-color: rgba(124,111,255,0.3); }
.badge-pink   { color: #ff6fa8; background: rgba(255,111,168,0.1); border-color: rgba(255,111,168,0.3); }
.badge-mint   { color: #6fffd4; background: rgba(111,255,212,0.1); border-color: rgba(111,255,212,0.3); }
.badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
</style>`;

// ─── Toggle Codes ──────────────────────────────────────────────────────────
const TOGGLE_REACT = `import { Toggle, Checkbox } from "@/lib/components/toggles";

const [dark, setDark] = useState(true);

<Toggle checked={dark} onChange={setDark} label="Dark mode" />
<Toggle label="Notifications" description="Get email updates" />
<Checkbox label="Accept terms" />`;

const TOGGLE_HTML = `<label class="toggle-wrap">
  <div class="toggle-track on" id="t1">
    <div class="toggle-thumb"></div>
  </div>
  <span class="toggle-label">Dark mode</span>
</label>

<style>
.toggle-wrap { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.toggle-track { position: relative; width: 40px; height: 20px; border-radius: 10px; background: rgba(24,24,42,1); border: 1px solid rgba(255,255,255,0.13); transition: background 0.2s; }
.toggle-track.on { background: #7c6fff; border-color: transparent; }
.toggle-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.4); transition: transform 0.2s; }
.toggle-track.on .toggle-thumb { transform: translateX(20px); }
.toggle-label { font-size: 0.88rem; color: #9090cc; }
</style>`;

export default function ComponentsShowcase() {
  const [activeSection, setActiveSection] = useState<Section>("Buttons");
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [progress, setProgress] = useState(68);

  return (
    <div className="min-h-screen bg-bg text-white">
      <CustomCursor />
      {/* Fixed sidebar nav */}
      <aside className="fixed top-0 left-0 h-full w-[220px] border-r border-white/[0.07] bg-bg/95 backdrop-blur-xl z-40 hidden xl:flex flex-col py-8 px-5">
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-8 h-8 rounded-[7px] bg-surface border border-white/[0.13] flex items-center justify-center shrink-0">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path d="M3 10 Q6.5 2 10 10 Q13.5 18 17 10" stroke="url(#navLG)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <defs><linearGradient id="navLG" x1="3" y1="10" x2="17" y2="10" gradientUnits="userSpaceOnUse"><stop stopColor="#7c6fff"/><stop offset="1" stopColor="#ff6fa8"/></linearGradient></defs>
            </svg>
          </span>
          <span className="text-[0.95rem] font-bold tracking-[-0.05em]">rhythm<span className="text-violet">.ui</span></span>
        </div>
        <p className="text-[0.65rem] font-medium tracking-[0.1em] uppercase text-muted mb-3 px-1">Components</p>
        <nav className="flex flex-col gap-0.5">
          {SECTIONS.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase()}`}
              onClick={() => setActiveSection(s)}
              className={`px-3 py-2 text-[0.84rem] rounded-[8px] transition-all duration-150 no-underline ${activeSection === s ? "bg-violet/[0.12] text-violet font-medium" : "text-muted2 hover:text-white hover:bg-white/[0.04]"}`}
            >
              {s}
            </a>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/[0.07]">
          <p className="text-[0.72rem] text-muted leading-relaxed">All components are free & open source.</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="xl:ml-[220px] max-w-[860px] mx-auto px-7 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="inline-flex items-center gap-2 bg-violet/[0.08] border border-violet/20 rounded-full px-3.5 py-1.5 text-[0.77rem] text-violet mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
            60+ Free Components
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold tracking-[-0.055em] leading-[1.08] mb-4">
            Component Library<br /><span className="text-grad">Documentation</span>
          </h1>
          <p className="text-muted2 text-[0.97rem] leading-[1.72] max-w-[500px]">
            All components are copy-paste ready. React, HTML and CSS variants included. Zero dependencies beyond what's already in the project.
          </p>
        </motion.div>

        {/* Buttons */}
        <ShowcaseSection title="Buttons" id="buttons">
          <TabGroup tabs={["Preview", "React", "HTML"]}>
            {(tab) => tab === "Preview" ? (
              <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-wrap gap-3 items-center">
                <GradientButton>Browse Components</GradientButton>
                <OutlineButton>View on GitHub</OutlineButton>
                <GhostButton>Cancel</GhostButton>
                <GradientButton size="sm">Small</GradientButton>
                <GradientButton size="lg">Large</GradientButton>
                <IconButton
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  label="Arrow"
                  variant="filled"
                />
              </div>
            ) : tab === "React" ? (
              <CodeBlock code={BUTTON_REACT} lang="tsx" />
            ) : (
              <CodeBlock code={BUTTON_HTML} lang="html" />
            )}
          </TabGroup>
        </ShowcaseSection>

        {/* Badges */}
        <ShowcaseSection title="Badges" id="badges">
          <TabGroup tabs={["Preview", "React", "HTML"]}>
            {(tab) => tab === "Preview" ? (
              <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-wrap gap-3 items-center">
                <Badge variant="violet">New release</Badge>
                <Badge variant="pink" dot>Trending</Badge>
                <Badge variant="mint" dot pulse>Live</Badge>
                <Badge variant="muted">v2.0</Badge>
                <Badge variant="red">Deprecated</Badge>
                <Badge variant="yellow">Beta</Badge>
                <StatusBadge status="online" />
                <StatusBadge status="busy" />
                <CountBadge count={42} />
                <CountBadge count={999} variant="pink" />
              </div>
            ) : tab === "React" ? (
              <CodeBlock code={BADGE_REACT} lang="tsx" />
            ) : (
              <CodeBlock code={BADGE_HTML} lang="html" />
            )}
          </TabGroup>
        </ShowcaseSection>

        {/* Cards */}
        <ShowcaseSection title="Cards" id="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [perspective:1200px]">
            <TiltCard className="p-6">
              <h3 className="text-[0.95rem] font-semibold mb-2">Tilt Card</h3>
              <p className="text-muted2 text-[0.83rem] leading-relaxed">Move your cursor over this card to see the 3D tilt effect with spotlight glow.</p>
              <div className="mt-4 flex gap-2">
                <Badge variant="violet" size="sm">React</Badge>
                <Badge variant="muted" size="sm">framer-motion</Badge>
              </div>
            </TiltCard>
            <StatCard
              value="12,480"
              label="Monthly Active Users"
              trend={{ value: "18.4%", up: true }}
              icon={<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M2 14l5-5 4 3 5-6" stroke="#7c6fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
            <ProfileCard
              name="Alex Morgan"
              role="Senior Designer"
              badge="Pro"
              stats={[{ label: "Projects", value: "24" }, { label: "Commits", value: "1.2k" }, { label: "Stars", value: "89" }]}
              className="md:col-span-2"
            />
          </div>
        </ShowcaseSection>

        {/* Inputs */}
        <ShowcaseSection title="Inputs" id="inputs">
          <TabGroup tabs={["Preview", "React", "HTML"]}>
            {(tab) => tab === "Preview" ? (
              <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-col gap-5 max-w-sm">
                <TextInput label="Email" placeholder="you@example.com" icon={<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>} />
                <TextInput label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters" />
                <SearchInput placeholder="Search components..." />
                <Textarea label="Message" placeholder="Tell us what you need..." rows={3} />
              </div>
            ) : tab === "React" ? (
              <CodeBlock code={`import { TextInput, SearchInput } from "@/lib/components/inputs";\n\n<TextInput label="Email" placeholder="you@example.com" />\n<TextInput label="Password" type="password" error="Too short" />\n<SearchInput placeholder="Search..." />`} lang="tsx" />
            ) : (
              <CodeBlock code={`<div class="input-group">\n  <label>Email</label>\n  <input type="email" class="input-field" placeholder="you@example.com">\n</div>\n\n<style>\n.input-group { display:flex; flex-direction:column; gap:6px; }\n.input-group label { font-size:0.8rem; color:#9090cc; }\n.input-field {\n  background:#18182a; border:1px solid rgba(255,255,255,0.07);\n  border-radius:10px; padding:10px 12px; color:#fff;\n  font-size:0.88rem; outline:none; transition:border-color 0.2s,box-shadow 0.2s;\n}\n.input-field:focus {\n  border-color:rgba(124,111,255,0.6);\n  box-shadow:0 0 12px rgba(124,111,255,0.15);\n}\n</style>`} lang="html" />
            )}
          </TabGroup>
        </ShowcaseSection>

        {/* Toggles */}
        <ShowcaseSection title="Toggles" id="toggles">
          <TabGroup tabs={["Preview", "React", "HTML"]}>
            {(tab) => tab === "Preview" ? (
              <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-col gap-5">
                <Toggle label="Dark mode" description="Switch between light and dark theme" checked={true} />
                <Toggle label="Notifications" description="Receive email updates" />
                <Toggle label="Analytics" checked={true} size="sm" />
                <div className="border-t border-white/[0.07] pt-5 flex flex-col gap-3">
                  <Checkbox label="I accept the terms and conditions" />
                  <Checkbox label="Subscribe to newsletter" />
                  <Checkbox label="This is checked" checked={true} />
                </div>
              </div>
            ) : tab === "React" ? (
              <CodeBlock code={TOGGLE_REACT} lang="tsx" />
            ) : (
              <CodeBlock code={TOGGLE_HTML} lang="html" />
            )}
          </TabGroup>
        </ShowcaseSection>

        {/* Modals */}
        <ShowcaseSection title="Modals" id="modals">
          <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-wrap gap-3">
            <GradientButton onClick={() => setModalOpen(true)}>Open Modal</GradientButton>
            <OutlineButton onClick={() => setAlertOpen(true)}>Delete Dialog</OutlineButton>
          </div>
          <CodeBlock code={`import { Modal, AlertDialog } from "@/lib/components/modals";\n\n<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Create project"\n  description="Set up your new project."\n  footer={\n    <>\n      <OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>\n      <GradientButton>Create</GradientButton>\n    </>\n  }\n>\n  <TextInput label="Project name" placeholder="My awesome project" />\n</Modal>`} lang="tsx" />

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Create project"
            description="Set up your new project in seconds."
            footer={
              <>
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-[0.84rem] text-muted2 hover:text-white bg-surface2 rounded-[8px] border border-white/[0.07] cursor-none transition-all">Cancel</button>
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-[0.84rem] text-white rounded-[8px] cursor-none transition-all shadow-glow" style={{ background: "linear-gradient(135deg,#7c6fff,#ff6fa8)" }}>Create</button>
              </>
            }
          >
            <TextInput label="Project name" placeholder="My awesome project" />
          </Modal>
          <AlertDialog
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            onConfirm={() => {}}
            title="Delete project?"
            description="This action cannot be undone. All data will be permanently removed."
            confirmLabel="Delete"
          />
        </ShowcaseSection>

        {/* Loaders */}
        <ShowcaseSection title="Loaders" id="loaders">
          <div className="bg-surface border border-white/[0.07] rounded-[18px] p-8 flex flex-col gap-8">
            <div>
              <p className="text-muted text-[0.78rem] mb-4 uppercase tracking-[0.08em]">Spinners</p>
              <div className="flex items-center gap-6">
                <SpinnerLoader size={20} />
                <SpinnerLoader size={28} color="#ff6fa8" />
                <SpinnerLoader size={36} color="#6fffd4" />
              </div>
            </div>
            <div>
              <p className="text-muted text-[0.78rem] mb-4 uppercase tracking-[0.08em]">Pulse</p>
              <div className="flex items-center gap-8">
                <PulseLoader />
                <PulseLoader color="#ff6fa8" />
                <PulseLoader color="#6fffd4" size={10} />
              </div>
            </div>
            <div>
              <p className="text-muted text-[0.78rem] mb-4 uppercase tracking-[0.08em]">Progress</p>
              <div className="flex flex-col gap-4 max-w-sm">
                <ProgressBar value={progress} showLabel color="violet" />
                <ProgressBar value={45} color="pink" size="sm" />
                <ProgressBar value={82} color="mint" size="lg" />
                <div className="flex gap-2">
                  <button onClick={() => setProgress(p => Math.max(0, p - 10))} className="px-3 py-1.5 text-[0.78rem] text-muted2 bg-surface2 border border-white/[0.07] rounded-[8px] cursor-none hover:text-white transition-colors">−10%</button>
                  <button onClick={() => setProgress(p => Math.min(100, p + 10))} className="px-3 py-1.5 text-[0.78rem] text-muted2 bg-surface2 border border-white/[0.07] rounded-[8px] cursor-none hover:text-white transition-colors">+10%</button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-muted text-[0.78rem] mb-4 uppercase tracking-[0.08em]">Skeleton</p>
              <div className="flex flex-col gap-3 max-w-xs">
                <div className="flex items-center gap-3">
                  <Skeleton width={40} height={40} rounded="50%" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton height={12} width="70%" />
                    <Skeleton height={10} width="45%" />
                  </div>
                </div>
                <Skeleton height={120} />
                <Skeleton height={12} />
                <Skeleton height={12} width="80%" />
              </div>
            </div>
          </div>
        </ShowcaseSection>

        {/* Tooltips */}
        <ShowcaseSection title="Tooltips" id="tooltips">
          <div className="bg-surface border border-white/[0.07] rounded-[18px] p-12 flex flex-wrap items-center justify-center gap-8">
            {(["top", "bottom", "left", "right"] as const).map((placement) => (
              <Tooltip key={placement} content={`Tooltip on ${placement}`} placement={placement}>
                <OutlineButton>{placement}</OutlineButton>
              </Tooltip>
            ))}
            <Tooltip content={<span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-mint" />System online</span>} placement="top">
              <StatusBadge status="online" />
            </Tooltip>
          </div>
          <CodeBlock code={`import { Tooltip } from "@/lib/components/tooltips";\n\n<Tooltip content="This is a tooltip" placement="top">\n  <button>Hover me</button>\n</Tooltip>\n\n// Rich content\n<Tooltip content={<span>System <strong>online</strong></span>}>\n  <StatusBadge status="online" />\n</Tooltip>`} lang="tsx" />
        </ShowcaseSection>
      </main>
    </div>
  );
}
