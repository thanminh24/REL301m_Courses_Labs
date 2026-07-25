"use client";

import {
  BarChart3,
  BookOpen,
  Brain,
  GraduationCap,
  Layers3,
  LayoutDashboard,
  Menu,
  Puzzle,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useStudy } from "@/domain/progress/study-provider";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library/", label: "Question bank", icon: BookOpen },
  { href: "/flashcards/", label: "Flashcards", icon: Layers3 },
  { href: "/match/", label: "Match", icon: Puzzle },
  { href: "/learn/", label: "Learn", icon: Brain },
  { href: "/test/", label: "Test", icon: GraduationCap },
  { href: "/progress/", label: "Progress", icon: BarChart3 },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { storageError, retrySave } = useStudy();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 780px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (mobile && open) {
      sidebarRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [mobile, open]);

  const closeMenu = () => {
    setOpen(false);
    window.requestAnimationFrame(() => menuRef.current?.focus());
  };

  const trapMenuFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (!mobile || !open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [
      ...(sidebarRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
    ];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="topbar">
        <button
          ref={menuRef}
          className="icon-button mobile-menu"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="study-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <Link className="brand" href="/">
          <span className="brand-mark">R</span>
          <span>
            <strong>REL301m</strong>
            <small>Study Studio</small>
          </span>
        </Link>
        <div className="source-badge">317 canonical questions</div>
      </header>
      <aside
        ref={sidebarRef}
        id="study-navigation"
        className={`sidebar ${open ? "sidebar-open" : ""}`}
        aria-hidden={mobile && !open}
        inert={mobile && !open}
        onKeyDown={trapMenuFocus}
      >
        <nav aria-label="Study modes">
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                className={active ? "nav-link active" : "nav-link"}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  if (mobile) closeMenu();
                }}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <p className="sidebar-note">
          Exam key and conceptual truth are shown separately when a bank item is
          ambiguous or incorrect.
        </p>
      </aside>
      {open && (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={closeMenu}
        />
      )}
      <main id="main-content" className="main-content">
        {storageError && (
          <div className="global-storage-warning" role="status">
            <span>
              <strong>Saving is unavailable.</strong> {storageError} You can
              keep studying in this tab.
            </span>
            <button className="button secondary" type="button" onClick={retrySave}>
              Retry saving
            </button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
