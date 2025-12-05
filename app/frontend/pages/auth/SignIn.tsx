import { Head, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignIn() {
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
            Sign in or create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action="/auth/google_oauth2" method="post">
            <input type="hidden" name="authenticity_token" value={document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''} />
            <Button type="submit" variant="outline" className="w-full">
              Continue with Google
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

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
