'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Login } from "@/components/loginRegister/Login"
import { Register } from "@/components/loginRegister/Register" // <-- Importer Register
import { LogIn, User } from "lucide-react"

export function LoginBtn() {
  // Gérer l'état pour savoir quel composant afficher
  const [view, setView] = useState<'login' | 'register'>('login')

  return (
    <Dialog onOpenChange={(open) => {
        // Réinitialiser à la vue 'login' à chaque fermeture
        if (!open) {
            setTimeout(() => setView('login'), 300) // Petit délai pour l'animation
        }
    }}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer shadow-md">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        {/* Affichage conditionnel basé sur l'état */}
        {view === 'login' ? (
          <Login onSwitchToRegister={() => setView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setView('login')} />
        )}
      </DialogContent>
    </Dialog>
  )
}