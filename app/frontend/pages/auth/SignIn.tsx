import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/hooks/use-i18n'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { SharedProps } from '@/types'

export default function SignIn() {
  const { t } = useI18n()
  const { locale } = usePage<SharedProps>().props
  const { data, setData, post, processing } = useForm({
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/${locale}/sign_in`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Head title={t("auth.sign_in.title")} />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-end mb-2">
            <LocaleSwitcher />
          </div>
          <CardTitle className="text-2xl">{t("auth.sign_in.welcome")}</CardTitle>
          <CardDescription>
            {t("auth.sign_in.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action="/auth/google_oauth2" method="post">
            <input type="hidden" name="authenticity_token" value={document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''} />
            <Button type="submit" variant="outline" className="w-full">
              {t("auth.sign_in.continue_google")}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("auth.sign_in.or")}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.sign_in.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("auth.sign_in.email_placeholder")}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? t("auth.sign_in.sending") : t("auth.sign_in.continue_email")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
