import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { useFlash } from "@/hooks/use-flash"

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  useFlash()

  return (
    <>
      {children}
      <Toaster richColors />
    </>
  )
}
