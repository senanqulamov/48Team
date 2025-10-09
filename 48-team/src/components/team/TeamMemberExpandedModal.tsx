"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { TeamMemberProfile } from "@/data/teamData";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { projects as allProjects } from "@/lib/projects";
import type { TeamProject } from "@/data/teamData";

// Projects grid (memoized) - placed before modal component usage
const ProjectsGrid = React.memo(function ProjectsGrid({ memberProjects }: { memberProjects: TeamProject[] }) {
  const enriched = React.useMemo(() => {
    const seenTitles = new Set<string>();
    return memberProjects.map(mp => {
      const match = mp.projectId ? allProjects.find(p => p.id === mp.projectId) : allProjects.find(p => p.title.toLowerCase() === mp.title.toLowerCase());
      const title = match?.title || mp.title;
      if (seenTitles.has(title)) return null; // de-dupe
      seenTitles.add(title);
      return {
        key: 'member-' + title,
        title,
        description: mp.description || match?.shortDescription || match?.description || '',
        image: match?.image || null,
        technologies: match?.technologies || match?.techTags || [],
        link: match ? `/projects#p-${match.id}` : '/projects',
        contribution: mp.contribution || '',
        source: 'member' as const,
      };
    }).filter(Boolean) as Array<{
      key: string; title: string; description: string; image: string | null; technologies: (string | undefined)[]; link: string; contribution: string; source: 'member'
    }>;
  }, [memberProjects]);

  const merged = enriched; // Only show explicitly assigned member projects

  if (!merged.length) return <p className="text-sm text-muted-foreground">No projects yet.</p>;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {merged.map(p => (
        <li key={p.key} className="group relative rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition shadow-sm hover:shadow-md overflow-hidden">
          {p.image && (
            <div className="relative h-28 w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            </div>
          )}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-start gap-2 min-h-[2.25rem]">
              <span className="mt-1 block size-2 rounded-full bg-primary/50 group-hover:bg-primary/80 transition" />
              <h4 className="font-medium text-sm md:text-[0.9rem] leading-tight line-clamp-2">{p.title}</h4>
            </div>
            {p.contribution && <p className="text-[10px] uppercase tracking-wide text-primary/70 font-medium">{p.contribution}</p>}
            {p.description && <p className="text-[11px] md:text-xs text-muted-foreground/90 leading-relaxed line-clamp-3">{p.description}</p>}
            {p.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {p.technologies.filter(Boolean).slice(0, 4).map((t: string | undefined) => (
                  t ? <span key={t} className="px-1.5 py-0.5 rounded bg-background/80 border border-border/60 text-[10px] uppercase tracking-wide text-muted-foreground">{t}</span> : null
                ))}
                {p.technologies.filter(Boolean).length > 4 && <span className="text-[10px] text-muted-foreground/70">+{p.technologies.filter(Boolean).length - 4}</span>}
              </div>
            )}
            <div className="pt-1">
              <Link href={p.link} className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary/50 rounded-sm">
                <span>View</span>
                <svg width="10" height="10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none" />
        </li>
      ))}
    </ul>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

// Lightweight skeleton for project cards
const ProjectsSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => (
  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="relative rounded-xl border border-border bg-muted/30 overflow-hidden animate-pulse">
        <div className="h-28 w-full bg-muted" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
          <div className="flex gap-1 pt-1">
            <span className="h-4 w-10 bg-muted rounded" />
            <span className="h-4 w-8 bg-muted rounded" />
            <span className="h-4 w-12 bg-muted rounded" />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export interface TeamMemberExpandedModalProps {
  open: boolean;
  member: TeamMemberProfile | null;
  onCloseAction: () => void;
  layoutId?: string; // slug used to connect with the card
  onExited?: () => void; // callback after exit animation completes
  // New enhancements:
  onNavigate?: (dir: 'next' | 'prev') => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  neighborImages?: string[]; // prefetch adjacent member images
}

export function TeamMemberExpandedModal({ open, member, onCloseAction, layoutId, onExited, onNavigate, hasNext, hasPrev, neighborImages = [] }: TeamMemberExpandedModalProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement | null>(null); // progress bar width controller
  const [mounted, setMounted] = React.useState(false);
  // const [scrollProgress, setScrollProgress] = React.useState(0); // removed to reduce re-renders
  const [activeSection, setActiveSection] = React.useState<string>('overview');
  const [projectsLoading, setProjectsLoading] = React.useState(true);
  const sectionIds = React.useMemo(() => ['overview','skills','projects','contact'], []);
  // Derived content
  const overviewParagraph = React.useMemo(() => {
    if (!member?.about?.length) return null;
    const joined = member.about.join(' ');
    return joined.length > 650 ? joined.slice(0, 640).trimEnd() + '…' : joined;
  }, [member?.about]);
  const stats = React.useMemo(() => ({
    skills: member?.skills?.length || 0,
    projects: member?.projects?.length || 0,
    highlights: member?.about?.length || 0,
  }), [member]);
  // Curate related projects from global list based on overlapping technologies
  const prefersReducedMotion = useReducedMotion();

  // Mount flag for portal safety (SSR)
  React.useEffect(() => setMounted(true), []);
  // Reset projects loading when member changes
  React.useEffect(() => {
    if (open && member) {
      setProjectsLoading(true);
      const t = setTimeout(() => setProjectsLoading(false), 220); // simulate async fetch
      return () => clearTimeout(t);
    }
  }, [member, open]);

  useOutsideClick(ref, () => {
    if (open) onCloseAction();
  });

  // Scroll lock + Lenis pause
  React.useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    interface LenisController { stop?: () => void; start?: () => void }
    const lenis = (window as unknown as { lenis?: LenisController }).lenis;

    if (open) {
      const scrollY = window.scrollY;
      // Lock scroll using position fixed to prevent iOS overscroll / Lenis conflicts
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      if (lenis?.stop) lenis.stop();
      queueMicrotask(() => closeBtnRef.current?.focus());
    } else {
      // Restore styles (scroll restoration handled in cleanup when closing)
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      if (lenis?.start) lenis.start();
    }

    return () => {
      // On unmount or close restore and scroll back
      const frozenTop = body.style.top;
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.width = previousBodyWidth;
      body.style.top = previousBodyTop;
      if (frozenTop) {
        const y = parseInt(frozenTop.replace(/^-/, '').replace('px', ''), 10) || 0;
        window.scrollTo(0, y);
      }
      if (lenis?.start) lenis.start();
    };
  }, [open, mounted]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseAction();
      if (e.key === 'Tab' && ref.current) {
        // Basic focus trap
        const focusable = ref.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
            last.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCloseAction]);

  // Scroll progress listener now manipulates DOM directly to avoid component re-renders
  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !open) return;
    let ticking = false;
    const update = () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (progressRef.current) {
        const clamped = Math.min(1, Math.max(0, Number.isFinite(pct) ? pct : 0));
        // Only update when difference > ~0.5% to reduce layout thrash
        const prevWidth = progressRef.current.style.width;
        const nextWidth = (clamped * 100).toFixed(1) + '%';
        if (prevWidth !== nextWidth) progressRef.current.style.width = nextWidth;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    // Initialize
    update();
    return () => el.removeEventListener('scroll', onScroll);
  }, [open]);

  // Section intersection observer
  React.useEffect(() => {
    if (!open) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: el, threshold: 0.25, rootMargin: '-35% 0px -50% 0px' }
    );
    sectionIds.forEach(id => {
      const node = el.querySelector('#' + id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [open, sectionIds]);

  const scrollToSection = React.useCallback((id: string) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const target = el.querySelector<HTMLElement>('#' + id);
    if (target) {
      const offset = 80; // approximate sticky header height
      const top = Math.max(0, target.offsetTop - offset);
      setActiveSection(id); // optimistic update so tab indicator moves immediately
      el.scrollTo({ top, behavior: 'smooth' });
    } else {
      setActiveSection(id);
    }
  }, []);

  // Arrow key navigation for members
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && hasNext) {
        onNavigate?.('next');
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate?.('prev');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, hasNext, hasPrev, onNavigate]);

  // Prefetch neighbor images
  React.useEffect(() => {
    if (!open || !neighborImages.length) return;
    const unique = Array.from(new Set(neighborImages.filter(Boolean)));
    unique.forEach(src => {
      if (!src) return;
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [open, neighborImages]);

  // Reset scroll position when member changes
  React.useEffect(() => {
    if (open && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
      setActiveSection('overview');
      if (progressRef.current) progressRef.current.style.width = '0%';
    }
  }, [member?.name, open]);

  const titleId = layoutId ? `team-expanded-title-${layoutId}` : undefined;

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && member && layoutId && (
          <>
           {/* Overlay */}
           <motion.div
             key="team-overlay"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.25, ease: 'easeOut' }}
             className="fixed inset-0 z-[100]">
             <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
             <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-soft-light bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
             <div className="absolute inset-0 pointer-events-none bg-[url('/placeholder.svg')] bg-center opacity-5" />
           </motion.div>

           {/* Container with nav buttons + card (for outside click scope) */}
           <div className="fixed inset-0 z-[110] grid place-items-center p-2 sm:p-4 md:p-6 lg:p-8" aria-hidden={false}>
             <div
               ref={ref}
               className="relative w-full max-w-[76rem] h-full md:h-auto md:max-h-[94vh] flex items-stretch min-h-0"
             >
                {/* Prev button (outside card sticking to left edge) */}
               {hasPrev && (
                 <motion.button
                   type="button"
                   aria-label="Previous team member"
                   onClick={() => onNavigate?.('prev')}
                   className={cn(
                     'group absolute left-1 sm:-left-12 top-1/2 -translate-y-1/2 z-[115]',
                     'flex items-center justify-center h-11 w-11 rounded-full border border-border',
                     'bg-background/70 backdrop-blur-md shadow-md hover:bg-background/90',
                     'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
                   )}
                   initial={{ opacity: 0, x: -12 }}
                   animate={{ opacity: 1, x: 0, transition: { delay: 0.15 } }}
                   exit={{ opacity: 0, x: -10 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><path d="M15 18l-6-6 6-6"/></svg>
                 </motion.button>
               )}

               {/* Next button (outside card sticking to right edge) */}
               {hasNext && (
                 <motion.button
                   type="button"
                   aria-label="Next team member"
                   onClick={() => onNavigate?.('next')}
                   className={cn(
                     'group absolute right-1 sm:-right-12 top-1/2 -translate-y-1/2 z-[115]',
                     'flex items-center justify-center h-11 w-11 rounded-full border border-border',
                     'bg-background/70 backdrop-blur-md shadow-md hover:bg-background/90',
                     'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
                   )}
                   initial={{ opacity: 0, x: 12 }}
                   animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                   exit={{ opacity: 0, x: 10 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><path d="M9 18l6-6-6-6"/></svg>
                 </motion.button>
               )}

               {/* Expanding card */}
               <motion.div
                  layoutId={`card-${layoutId}`}
                  aria-labelledby={titleId}
                  role="dialog"
                  aria-modal="true"
                  className={cn(
                   'relative w-full h-full md:h-auto md:max-h-[94vh] flex flex-col min-h-0',
                    'bg-card/95 dark:bg-background/95 rounded-3xl shadow-xl border border-border',
                    'backdrop-blur-xl overflow-hidden focus:outline-none will-change-transform will-change-opacity'
                 )}
                 initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                 animate={{ opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.32, ease: 'easeOut' } }}
                 exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 14, transition: { duration: prefersReducedMotion ? 0.15 : 0.26, ease: 'easeIn' } }}
                 onAnimationComplete={() => { if (!open && onExited) onExited(); }}
               >
                 {/* Progress bar */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-transparent">
                   <div ref={progressRef} className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-[width] duration-300 will-change-[width]" style={{ width: '0%' }} />
                 </div>

                 {/* Close Button */}
                 <motion.button
                   ref={closeBtnRef}
                   type="button"
                   onClick={onCloseAction}
                   aria-label="Close"
                   className="absolute top-3 right-3 z-20 flex items-center justify-center h-9 w-9 rounded-full bg-muted/80 hover:bg-muted/90 border border-border shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 focus:outline-none"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   whileTap={{ scale: 0.92 }}
                 >
                   <span className="sr-only">Close</span>
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
                 </motion.button>

                 {/* Header (avatar + name + role + stats + tabs) */}
                 <div className="relative z-10 p-6 pb-3 md:p-8 md:pb-4 border-b border-border/70 bg-gradient-to-b from-background/70 via-background/40 to-background/10">
                   <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                     <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-border shadow-inner">
                       <Image
                         src={member.image}
                         alt={member.name}
                         fill
                         className="object-cover object-center"
                         sizes="112px"
                         priority
                       />
                       <div className="absolute inset-0 ring-1 ring-inset ring-primary/10" />
                     </div>
                     <div className="flex-1 min-w-0 flex flex-col gap-3">
                       <div>
                         <h2 id={titleId} className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{member.name}</h2>
                         <p className="text-muted-foreground text-sm md:text-base mt-1">{member.role}</p>
                       </div>
                       <div className="flex flex-wrap gap-3 text-[11px] md:text-xs">
                         <span className="px-2 py-1 rounded-full bg-muted/60 border border-border/70">{stats.skills} Skills</span>
                         <span className="px-2 py-1 rounded-full bg-muted/60 border border-border/70">{stats.projects} Projects</span>
                         <span className="px-2 py-1 rounded-full bg-muted/60 border border-border/70">{stats.highlights} Highlights</span>
                       </div>
                     </div>
                   </div>

                   {/* Tabs */}
                   <div className="mt-6 relative">
                     <div className="flex gap-1 md:gap-1.5 relative w-full">
                       {sectionIds.map(id => {
                         const active = activeSection === id;
                         return (
                           <button
                             key={id}
                             type="button"
                             onClick={() => scrollToSection(id)}
                             className={cn(
                               'relative px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium capitalize transition-colors',
                               active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                             )}
                           >
                             <span className="relative z-10">{id}</span>
                             {active && (
                               <motion.span
                                 layoutId="tm-tab-indicator"
                                 className="absolute inset-0 rounded-md bg-muted/70 dark:bg-muted/40 border border-border/70 shadow-sm"
                                 transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                               />
                             )}
                           </button>
                         );
                       })}
                     </div>
                   </div>
                 </div>

                 {/* Scrollable content */}
                 <div
                   ref={scrollContainerRef}
                   className="relative flex-1 min-h-0 overflow-y-auto px-6 md:px-8 pt-6 pb-10 space-y-20 scroll-smooth [-webkit-overflow-scrolling:touch] overscroll-contain [touch-action:pan-y]"
                 >
                   {/* Overview Section */}
                   <section id="overview" aria-label="Overview" className="space-y-6">
                     <header className="space-y-1">
                       <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">Overview</h3>
                       <p className="text-xs text-muted-foreground">Snapshot about {member.name.split(' ')[0]}</p>
                     </header>
                     {overviewParagraph && (
                       <p className="text-sm md:text-[15px] leading-relaxed text-muted-foreground/90 max-w-3xl">{overviewParagraph}</p>
                     )}
                     {member.about?.length > 1 && (
                       <ul className="grid gap-2 text-sm md:text-[13.5px] max-w-2xl">
                         {member.about.map((a, i) => (
                           <li key={i} className="flex gap-2 items-start">
                             <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                             <span className="text-muted-foreground/95 leading-relaxed">{a}</span>
                           </li>
                         ))}
                       </ul>
                     )}
                   </section>

                   {/* Skills Section */}
                   <section id="skills" aria-label="Skills" className="space-y-6">
                     <header className="space-y-1">
                       <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">Skills</h3>
                       <p className="text-xs text-muted-foreground">Core competencies & tools</p>
                     </header>
                     {member.skills?.length ? (
                       <div className="flex flex-wrap gap-2">
                         {member.skills.map(s => (
                           <span key={s} className="px-2 py-1 rounded-lg bg-muted/50 border border-border/70 text-[11px] md:text-[12px] tracking-wide uppercase text-muted-foreground hover:bg-muted/70 transition">{s}</span>
                         ))}
                       </div>
                     ) : <p className="text-sm text-muted-foreground">No skills listed.</p>}
                   </section>

                   {/* Projects Section */}
                   <section id="projects" aria-label="Projects" className="space-y-6">
                     <header className="space-y-1">
                       <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">Projects</h3>
                       <p className="text-xs text-muted-foreground">Member & related work samples</p>
                     </header>
                     {projectsLoading ? (
                       <ProjectsSkeleton count={Math.min(Math.max(member.projects?.length || 0, 4), 8)} />
                     ) : (
                       <ProjectsGrid memberProjects={member.projects || []} />
                     )}
                   </section>

                   {/* Contact Section */}
                   <section id="contact" aria-label="Contact" className="space-y-6">
                     <header className="space-y-1">
                       <h3 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">Contact</h3>
                       <p className="text-xs text-muted-foreground">Connect or follow {member.name.split(' ')[0]}</p>
                     </header>
                     {member.socials ? (
                       <ul className="flex flex-wrap gap-3 text-sm">
                         {Object.entries(member.socials).map(([k, v]) => (
                           v ? (
                             <li key={k}>
                               <a
                                 href={v}
                                 target={k === 'email' ? undefined : '_blank'}
                                 rel={k === 'email' ? undefined : 'noopener noreferrer'}
                                 className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted/60 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-muted-foreground hover:text-foreground transition"
                               >
                                 <span className="capitalize">{k}</span>
                                 <svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition">
                                   <path d="M18 13v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
                                   <path d="M15 3h6v6" />
                                   <path d="M10 14 21 3" />
                                 </svg>
                               </a>
                             </li>
                           ) : null
                         ))}
                       </ul>
                     ) : <p className="text-sm text-muted-foreground">No socials provided.</p>}
                   </section>
                 </div>

                 {/* Bottom gradient fade */}
                 <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/60 to-transparent" />
               </motion.div>
             </div>
           </div>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
