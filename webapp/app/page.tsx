'use client'
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      window.location.href = '/tasks'
    } else {
      alert('Login failed')
    }
  }

  return (
    <main className="min-h-screen bg-[#434343] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Manda Tasks</h1>
          <p className="text-gray-300">Faça login para ver suas tarefas</p>
        </div>
        <form className="bg-white rounded-lg shadow-lg p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4003F]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4003F]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E4003F] text-white py-2 px-4 rounded-md hover:bg-[#E4003F]/90 transition-colors flex items-center justify-center"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}