import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Input } from '@life-axe/ui'
import { login } from '~/lib/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Life<span className="text-accent">Axe</span>
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Digital Guide Creator
          </p>
        </div>

        <div className="bg-panel border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="rounded-lg bg-error/10 border border-error/20 px-3 py-2">
                <p className="text-xs text-error">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              state={loading ? 'loading' : 'idle'}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
