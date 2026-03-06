import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Sidebar } from '~/components/layout/Sidebar'
import { getSession } from '~/lib/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: '/login' })
    }
    return { user: session.user }
  },
  component: AuthedLayout,
})

function AuthedLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
