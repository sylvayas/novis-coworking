import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const { locale } = router;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.spaces"), href: "/spaces" },
    { name: t("nav.pricing"), href: "/pricing" },
    { name: t("nav.events"), href: "/events" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  // Typage corrigé : newLocale est maintenant de type "fr" | "en"
  const changeLanguage = (newLocale: "fr" | "en") => {
    setLanguage(newLocale);
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/novis-mbtyn2m7.png"
                alt="NOVIS Coworking"
                width={100}
                height={100}
                priority={true}
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                scroll={false}
                className={cn(
                  "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium pointer-events-auto z-10",
                  router.pathname === item.href
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:ml-6 md:flex md:items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{locale === "fr" ? "FR" : "EN"}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="sm">
                {t("nav.register")}
              </Button>
            </Link>
            <Link
              className={cn(
                buttonVariants({ size: "sm" }),
                "max-w-52 gap-2 overflow-hidden whitespace-pre",
                "group relative w-full justify-center gap-2 rounded-md hover:ring-2 hover:ring-primary hover:ring-offset-2"
              )}
              href="/reservations"
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10" />
              <div className="flex items-center">
                <span className="ml-1 text-sm sm:text-md">{t("nav.reserve")}</span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                scroll={false}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium pointer-events-auto z-10",
                  router.pathname === item.href
                    ? "bg-secondary border-primary text-gray-700"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-base font-medium text-gray-500 hover:text-gray-700"
                onClick={() => changeLanguage(locale === "fr" ? "en" : "fr")}
              >
                <Globe className="h-4 w-4 mr-1" />
                {locale === "fr" ? "English" : "Français"}
              </Button>
              <Link
                href="/auth/login"
                className="text-base font-medium text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/auth/register"
                className="text-base font-medium text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.register")}
              </Link>
              <Link
                href="/reservations"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button size="sm" className="bg-novis-primary">
                  {t("nav.reserve")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}