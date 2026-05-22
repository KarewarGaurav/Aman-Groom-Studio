"use client";



import { useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { Menu, Search, Bell, ChevronDown } from "lucide-react";

import { useAdminAuthStore } from "@/store/admin-auth-store";

import { useAdminStore } from "@/store/admin-store";

import { cn } from "@/lib/utils";

import { formatAdminDate, getAdminPageTitle } from "@/lib/admin-utils";



interface AdminTopbarProps {

  onMenuClick: () => void;

  title?: string;

}



const notifAccent: Record<string, string> = {

  order: "border-l-sky-500 bg-sky-50/60",

  inventory: "border-l-amber-500 bg-amber-50/60",

  review: "border-l-violet-500 bg-violet-50/60",

  payment: "border-l-emerald-500 bg-emerald-50/60",

};



export function AdminTopbar({ onMenuClick, title }: AdminTopbarProps) {

  const pathname = usePathname();

  const pageTitle = title ?? getAdminPageTitle(pathname);

  const admin = useAdminAuthStore((s) => s.admin);

  const notifications = useAdminStore((s) => s.notifications);

  const markRead = useAdminStore((s) => s.markNotificationRead);

  const markAllRead = useAdminStore((s) => s.markAllNotificationsRead);

  const [notifOpen, setNotifOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);



  const unread = notifications.filter((n) => !n.read).length;



  useEffect(() => {

    const close = (e: MouseEvent) => {

      if (!barRef.current?.contains(e.target as Node)) {

        setNotifOpen(false);

        setProfileOpen(false);

      }

    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);

  }, []);



  return (

    <header

      ref={barRef}

      className="z-50 shrink-0 border-b border-champagne/50 bg-warmwhite/95 shadow-soft backdrop-blur-md"

    >

      <div className="pointer-events-auto flex h-14 min-h-14 items-center gap-2 px-3 safe-x sm:h-16 sm:gap-4 sm:px-4 md:px-6 lg:px-8">

        <button

          type="button"

          onClick={onMenuClick}

          className="cursor-pointer rounded-lg border border-champagne/40 bg-champagne/20 p-2 text-charcoal hover:bg-champagne/40 lg:hidden"

          aria-label="Open menu"

        >

          <Menu className="h-5 w-5" />

        </button>



        <p className="min-w-0 flex-1 truncate font-display text-base font-medium text-burgundy sm:text-lg lg:hidden">
          {pageTitle}
        </p>



        {title ? (

          <p className="hidden font-display text-lg font-medium text-burgundy lg:block">

            {title}

          </p>

        ) : null}



        <div className="relative mx-auto hidden max-w-md flex-1 md:block">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bronze" />

          <input

            type="search"

            placeholder="Search orders, products, customers…"

            className="pointer-events-auto w-full cursor-text rounded-full border border-champagne/60 bg-ivory py-2 pl-10 pr-4 font-body text-sm text-charcoal placeholder:text-taupe/80 focus:border-burgundy/40 focus:outline-none focus:ring-2 focus:ring-burgundy/15"

          />

        </div>



        <button

          type="button"

          onClick={() => setMobileSearchOpen((v) => !v)}

          className="ml-auto cursor-pointer rounded-full border border-champagne/40 bg-champagne/25 p-2.5 text-charcoal md:hidden"

          aria-label="Toggle search"

          aria-expanded={mobileSearchOpen}

        >

          <Search className="h-5 w-5" strokeWidth={1.75} />

        </button>



        <div className="flex items-center gap-1.5 sm:gap-2 md:ml-auto">

          <div className="relative">

            <button

              type="button"

              onClick={() => {

                setNotifOpen(!notifOpen);

                setProfileOpen(false);

              }}

              className="relative cursor-pointer rounded-full border border-champagne/40 bg-champagne/25 p-2 text-charcoal transition-colors hover:bg-champagne/50 sm:p-2.5"

              aria-label="Notifications"

              aria-expanded={notifOpen}

            >

              <Bell className="h-5 w-5" strokeWidth={1.75} />

              {unread > 0 ? (

                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy font-body text-[9px] font-bold text-ivory">

                  {unread}

                </span>

              ) : null}

            </button>



            {notifOpen ? (

              <div className="absolute right-0 top-full z-[60] mt-2 w-[min(20rem,calc(100vw-1.5rem))] rounded-2xl border border-champagne/50 bg-warmwhite p-2 shadow-luxury sm:w-80">

                <div className="flex items-center justify-between border-b border-champagne/30 px-3 py-2">

                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-burgundy">

                    Notifications

                  </span>

                  <button

                    type="button"

                    onClick={markAllRead}

                    className="cursor-pointer font-body text-[10px] font-medium text-bronze hover:text-burgundy hover:underline"

                  >

                    Mark all read

                  </button>

                </div>

                <ul className="max-h-[min(18rem,50vh)] overflow-y-auto">

                  {notifications.map((n) => (

                    <li key={n.id}>

                      <button

                        type="button"

                        onClick={() => markRead(n.id)}

                        className={cn(

                          "w-full cursor-pointer border-l-4 px-3 py-3 text-left transition-colors hover:brightness-[0.98]",

                          notifAccent[n.type] ?? "border-l-champagne bg-cream/40",

                          !n.read && "ring-1 ring-inset ring-burgundy/10"

                        )}

                      >

                        <p className="font-body text-sm font-semibold text-charcoal">

                          {n.title}

                        </p>

                        <p className="mt-0.5 font-body text-xs text-charcoalsoft">

                          {n.message}

                        </p>

                        <p className="mt-1 font-body text-[10px] text-taupe">

                          {formatAdminDate(n.createdAt)}

                        </p>

                      </button>

                    </li>

                  ))}

                </ul>

              </div>

            ) : null}

          </div>



          <div className="relative">

            <button

              type="button"

              onClick={() => {

                setProfileOpen(!profileOpen);

                setNotifOpen(false);

              }}

              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-burgundy/20 bg-gradient-to-r from-burgundy/5 to-champagne/30 py-1 pl-1 pr-2 transition-colors hover:border-burgundy/35 hover:from-burgundy/10 sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3"

              aria-expanded={profileOpen}

            >

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-burgundy font-body text-[10px] font-bold text-ivory sm:h-8 sm:w-8 sm:text-xs">

                {admin?.avatarInitials ?? "AD"}

              </span>

              <span className="hidden max-w-[8rem] truncate font-body text-sm font-medium text-charcoal md:inline">

                {admin?.name ?? "Admin"}

              </span>

              <ChevronDown className="hidden h-4 w-4 text-bronze md:block" />

            </button>

            {profileOpen ? (

              <div className="absolute right-0 top-full z-[60] mt-2 w-[min(13rem,calc(100vw-1.5rem))] rounded-xl border border-champagne/50 bg-warmwhite py-2 shadow-luxury">

                <p className="truncate px-4 py-2 font-body text-xs text-charcoalsoft">

                  {admin?.email}

                </p>

                <p className="px-4 pb-2 font-body text-[10px] font-semibold uppercase tracking-wider text-burgundy">

                  {admin?.role?.replace("_", " ")}

                </p>

              </div>

            ) : null}

          </div>

        </div>

      </div>



      {mobileSearchOpen ? (

        <div className="border-t border-champagne/40 px-3 py-3 safe-x md:hidden">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bronze" />

            <input

              type="search"

              placeholder="Search orders, products…"

              className="w-full rounded-full border border-champagne/60 bg-ivory py-2.5 pl-10 pr-4 font-body text-sm text-charcoal focus:border-burgundy/40 focus:outline-none focus:ring-2 focus:ring-burgundy/15"

              autoFocus

            />

          </div>

        </div>

      ) : null}

    </header>

  );

}

