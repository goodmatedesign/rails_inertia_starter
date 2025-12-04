import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SharedProps } from '@/types'

export default function SignIn({ flash }: SharedProps) {
  const { data, setData, post, processing } = useForm({
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/sign_in')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Head title="Sign In" />

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Enter your email to sign in or create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {flash?.notice && (
            <div className="mb-4 p-3 rounded-md bg-green-50 text-green-800 text-sm dark:bg-green-900/20 dark:text-green-400">
              {flash.notice}
            </div>
          )}
          {flash?.alert && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-800 text-sm dark:bg-red-900/20 dark:text-red-400">
              {flash.alert}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoFocus
              />
            </div>

            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? 'Sending...' : 'Continue with Email'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
