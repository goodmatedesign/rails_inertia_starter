import { Form, Head, usePage } from '@inertiajs/react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

      <main className="container mx-auto px-4 py-24 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("waitlist.title")}</CardTitle>
            <CardDescription>
              {t("waitlist.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form action={`/${locale}/waitlist`} method="post" className="space-y-4">
              {({ processing, wasSuccessful }) => (
                wasSuccessful ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-center">
                    <CheckCircle className="size-12 text-green-500" />
                    <p className="text-lg font-medium">{t("waitlist.success")}</p>
                    {waitlist_position && (
                      <p className="text-muted-foreground">
                        {t("waitlist.position", { position: waitlist_position })}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <Input
                      type="email"
                      name="email"
                      placeholder={t("waitlist.email_placeholder")}
                      required
                      disabled={processing}
                    />
                    <Button type="submit" className="w-full" disabled={processing}>
                      {processing && <Loader2 className="size-4 animate-spin" />}
                      {t("waitlist.submit")}
                    </Button>
                  </>
                )
              )}
            </Form>
          </CardContent>
        </Card>
      </main>
    </Layout>
  )
}
