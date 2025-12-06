import { Link, router, usePage } from "@inertiajs/react";
import { Book, Menu, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useI18n } from "@/hooks/use-i18n";
import type { SharedProps } from "@/types";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
}

const Navbar = ({
  logo,
  menu,
}: NavbarProps) => {
  const { user, locale } = usePage<SharedProps>().props;
  const { t } = useI18n();

  // Default values with translations
  const defaultLogo = {
    url: `/${locale}`,
    title: t("app_name"),
  };

  const defaultMenu: MenuItem[] = [
    {
      title: t("nav.features"),
      url: "#",
      items: [
        {
          title: t("nav.feature_1"),
          description: t("nav.feature_1_desc"),
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: t("nav.feature_2"),
          description: t("nav.feature_2_desc"),
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    { title: t("nav.pricing"), url: "#" },
    { title: t("nav.posts"), url: `/${locale}/posts` },
  ];

  const activeLogo = logo || defaultLogo;
  const activeMenu = menu || defaultMenu;

  const handleSignOut = () => {
    router.delete(`/${locale}/sign_out`);
  };
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={activeLogo.url} className="flex items-center gap-2">
              <span className="text-xl font-bold">{activeLogo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {activeMenu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  {t("nav.sign_out")}
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <Link href={`/${locale}/sign_in`}>{t("nav.sign_in")}</Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex h-16 items-center justify-between lg:hidden">
          {/* Logo */}
          <Link href={activeLogo.url} className="flex items-center gap-2">
            <span className="text-xl font-bold">{activeLogo.title}</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={activeLogo.url} className="flex items-center gap-2">
                    <span className="text-xl font-bold">{activeLogo.title}</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {activeMenu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <LocaleSwitcher />

                <div className="flex flex-col gap-3">
                  {user ? (
                    <>
                      <span className="text-sm text-muted-foreground">{user.name}</span>
                      <Button variant="outline" onClick={handleSignOut}>
                        {t("nav.sign_out")}
                      </Button>
                    </>
                  ) : (
                    <Button asChild>
                      <Link href={`/${locale}/sign_in`}>{t("nav.sign_in")}</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
