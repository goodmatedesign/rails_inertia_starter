import { Head } from '@inertiajs/react'
import { Layout } from '@/components/layout'
import { useI18n } from '@/hooks/use-i18n'

export default function Pricing() {
  const { t } = useI18n()

  return (
    <Layout>
      <Head title={t("pricing.title")} />

      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t("pricing.heading")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {t("pricing.wip")}
        </p>
      </main>
    </Layout>
  )
}
