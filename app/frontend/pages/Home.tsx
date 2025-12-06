import { Head, Link } from '@inertiajs/react'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <Layout>
      <Head title="Rails SaaS Starter" />

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
    </Layout>
  )
}
