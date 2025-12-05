import { Head, Link, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import type { SharedProps } from '@/types'

export default function Home({ user }: SharedProps) {
  const handleSignOut = () => {
    router.delete('/sign_out')
  }

  return (
    <div className="min-h-screen bg-background">
      <Head title="Rails SaaS Starter" />

      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-xl font-bold">SaaS Starter</span>
          <nav className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <Link href="/sign_in">
                <Button>Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Build your SaaS faster
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A modern Rails starter with React, Inertia.js, and Tailwind CSS.
          Everything you need to launch your next project.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/sign_in">
            <Button size="lg">Get Started</Button>
          </Link>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </main>
    </div>
  )
}
