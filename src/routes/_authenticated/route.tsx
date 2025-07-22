import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    const token: string | undefined = context.auth?.token
    if (token) {
      throw redirect({
        to: "/sign-in"
      })
    }

  },
  component: AuthenticatedLayout,
})
