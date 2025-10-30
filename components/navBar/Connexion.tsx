'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Login } from "@/components/loginRegister/Login"
import { Register } from "@/components/loginRegister/Register" 
import { User } from "lucide-react"

export function LoginBtn() {

  const [view, setView] = useState<'login' | 'register'>('login')

  return (
    <Dialog onOpenChange={(open) => {

        if (!open) {
            setTimeout(() => setView('login'), 300) 
        }
    }}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer shadow-md">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">

        {view === 'login' ? (
          <Login onSwitchToRegister={() => setView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setView('login')} />
        )}
      </DialogContent>
    </Dialog>
  )
}