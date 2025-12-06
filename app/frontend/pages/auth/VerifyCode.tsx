import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/hooks/use-i18n'
import { LocaleSwitcher } from '@/components/locale-switcher'
import type { SharedProps } from '@/types'

interface VerifyCodeProps {
  email: string
}

export default function VerifyCode({ email }: VerifyCodeProps) {
  const { t } = useI18n()
  const { locale } = usePage<SharedProps>().props
  const { data, setData, post, processing } = useForm({
    code: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(`/${locale}/sign_in/verify`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Head title={t("auth.verify_code.title")} />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-end mb-2">
            <LocaleSwitcher />
          </div>
          <CardTitle className="text-2xl">{t("auth.verify_code.title")}</CardTitle>
          <CardDescription>
            {t("auth.verify_code.subtitle", { email })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">{t("auth.verify_code.code")}</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t("auth.verify_code.code_placeholder")}
                value={data.code}
                onChange={(e) => setData('code', e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
                autoComplete="one-time-code"
                autoFocus
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={processing || data.code.length !== 6}>
              {processing ? t("auth.verify_code.verifying") : t("auth.verify_code.verify")}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t("auth.verify_code.check_spam")}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
