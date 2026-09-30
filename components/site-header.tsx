"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/logout-button";
const links = [
  ["Home", "/"],
  ["Learn", "/learn"],
  ["APIs", "/apis"],
  ["Pricing", "/pricing"],
  ["Docs", "/docs"],
  ["Projects", "/projects"],
  ["About", "/about"],
];
export function SiteHeader({ initiallyAuthenticated = false }: { initiallyAuthenticated?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let client;
    try {
      client = createClient();
    } catch {
      return;
    }
    void client.auth.getUser().then(({ data }) => setAuthenticated(Boolean(data.user)));
    const { data } = client.auth.onAuthStateChange((_event, session) => setAuthenticated(Boolean(session?.user)));
    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="shell header-inner">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="QuestAPIs home"
        >
          <Image
            src="/questapis-logo.webp"
            alt=""
            width={64}
            height={64}
            priority
          />
          <span>
            QUEST<span className="brand-accent">APIS</span>
            <small>CODE · BUILD · CONQUER</small>
          </span>
        </Link>
        <button
          ref={menuButton}
          className="menu-button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-account">
          {authenticated ? <><Link className="button header-cta" href="/dashboard">Dashboard →</Link><LogoutButton /></> :
            <Link className="button header-cta" href="/login">Log in ↗</Link>}
        </div>
      </div>
    </header>
  );
}
