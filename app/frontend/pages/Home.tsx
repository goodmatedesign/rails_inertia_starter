import { Head, Link, usePage } from '@inertiajs/react'
import { ExternalLink } from 'lucide-react'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/hooks/use-i18n'
import type { SharedProps } from '@/types'

export default function Home() {
  const { t } = useI18n()
  const { locale } = usePage<SharedProps>().props

  return (
    <Layout>
      <Head title={t("home.title")} />

      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t("home.heading")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {t("home.description")}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href={`/${locale}/sign_in`}>
            <Button size="lg">{t("home.get_started")}</Button>
          </Link>
          <a href="https://github.com/goodmatedesign/rails_inertia_starter" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline">{t("home.learn_more")} <ExternalLink className="size-4" /></Button>
          </a>
        </div>
      </main>
    </Layout>
  )
}
