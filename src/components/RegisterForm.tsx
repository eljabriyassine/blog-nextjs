"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [userInputs, setUserInputs] = useState({
    name: { value: "", error: "" },
    username: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  })
  const [generalError, setGeneralError] = useState("")
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInputs((prev) => ({
      ...prev,
      [name]: { ...prev[name as keyof typeof userInputs], value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")

    // Perform client-side validation here

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInputs.name.value,
          username: userInputs.username.value,
          email: userInputs.email.value,
          password: userInputs.password.value,
        }),
      })

      if (response.ok) {
        router.push("/login")
      } else {
        const data = await response.json()
        setGeneralError(data.message || "Registration failed. Please try again.")
      }
    } catch (err) {
      setGeneralError("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" name="name" value={userInputs.name.value} onChange={handleInputChange} />

      <Label htmlFor="username">Username</Label>
      <Input type="text" id="username" name="username" value={userInputs.username.value} onChange={handleInputChange} />

      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" name="email" value={userInputs.email.value} onChange={handleInputChange} />

      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        value={userInputs.password.value}
        onChange={handleInputChange}
      />

      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={userInputs.confirmPassword.value}
        onChange={handleInputChange}
      />

      {generalError && <p className="text-red-500">{generalError}</p>}
      <Button type="submit">Register</Button>
    </form>
  )
}

