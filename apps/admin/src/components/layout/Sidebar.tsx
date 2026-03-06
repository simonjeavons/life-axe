import { Link, useLocation } from '@tanstack/react-router'
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react'
import { logout } from '~/lib/auth'
import { useNavigate } from '@tanstack/react-router'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: BookOpen },
  { to: '/products/new', label: 'Create Guide', icon: Plus },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <aside className="w-56 h-screen bg-panel border-r border-[rgba(255,255,255,0.08)] flex flex-col shrink-0">
      {/* Brand */}
      <div className="h-14 flex items-center px-5 border-b border-[rgba(255,255,255,0.08)]">
        <Link to="/dashboard" className="text-lg font-bold tracking-tight">
          Life<span className="text-accent">Axe</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-foreground-secondary hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[rgba(255,255,255,0.08)] p-3 space-y-0.5">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground-secondary hover:bg-[rgba(255,255,255,0.06)] hover:text-foreground transition-colors w-full cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
