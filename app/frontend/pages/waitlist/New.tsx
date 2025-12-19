import { Form, Head, usePage } from '@inertiajs/react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Layout } from '@/components/layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/hooks/use-i18n'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  waitlist_position?: number
}

export default function WaitlistNew() {
  const { t } = useI18n()
  const { locale, waitlist_position } = usePage<Props>().props

  return (
    <Layout>
      <Head title={t("waitlist.title")} />

      <section className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center py-16">
        <div className="container flex flex-col items-center justify-center px-4">
          <h1 className="py-4 text-center text-5xl font-semibold tracking-tight md:py-6 lg:text-7xl">
            {t("waitlist.title")}
          </h1>
          <p className="mx-auto max-w-xl text-center text-lg text-muted-foreground">
            {t("waitlist.description")}
          </p>

          <div className="mt-10 w-full max-w-md">
            <Form action={`/${locale}/waitlist`} method="post">
              {({ processing, wasSuccessful }) => (
                wasSuccessful ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <CheckCircle className="size-16 text-green-500" />
                    <p className="text-2xl font-semibold">{t("waitlist.success")}</p>
                    {waitlist_position && (
                      <p className="text-lg text-muted-foreground">
                        {t("waitlist.position", { position: waitlist_position })}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 rounded-full bg-muted p-1.5">
                    <Input
                      type="email"
                      name="email"
                      placeholder={t("waitlist.email_placeholder")}
                      required
                      disabled={processing}
                      className="h-11 flex-1 rounded-full border-none bg-transparent shadow-none focus-visible:ring-0"
                    />
                    <Button
                      type="submit"
                      disabled={processing}
                      className="h-11 rounded-full px-6"
                    >
                      {processing && <Loader2 className="size-4 animate-spin" />}
                      {t("waitlist.submit")}
                    </Button>
                  </div>
                )
              )}
            </Form>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className="inline-flex items-center -space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Avatar key={index} className="size-8 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {String.fromCharCode(65 + index)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </span>
            <p className="text-sm tracking-tight text-muted-foreground">
              {t("waitlist.joined_count")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
