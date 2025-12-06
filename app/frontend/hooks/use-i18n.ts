import { usePage } from "@inertiajs/react"
import i18n from "@/lib/i18n"
import type { SharedProps } from "@/types"

export function useI18n() {
  const { locale, available_locales } = usePage<SharedProps>().props

  // Sync i18n locale with server-provided locale
  if (locale && i18n.locale !== locale) {
    i18n.locale = locale
  }

  return {
    t: i18n.t.bind(i18n),
    locale,
    availableLocales: available_locales,
    i18n,
  }
}
