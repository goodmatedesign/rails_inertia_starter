import { router } from "@inertiajs/react"
import { Globe } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const locales: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  zh: { label: "中文", flag: "🇨🇳" },
}

export function LocaleSwitcher() {
  const { locale, availableLocales } = useI18n()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return

    const currentPath = window.location.pathname
    const localePattern = new RegExp(`^/(${availableLocales.join("|")})`)
    const newPath = currentPath.replace(localePattern, `/${newLocale}`)

    router.visit(newPath, { preserveState: true })
  }

  const currentLocale = locales[locale] || { label: locale.toUpperCase(), flag: "🌐" }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocale.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLocales.map((loc) => {
          const localeInfo = locales[loc] || { label: loc.toUpperCase(), flag: "🌐" }
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => switchLocale(loc)}
              className={loc === locale ? "bg-accent" : ""}
            >
              <span className="mr-2">{localeInfo.flag}</span>
              {localeInfo.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
