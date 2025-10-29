'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Github, Linkedin } from "lucide-react"
import Image from "next/image"

interface RegisterProps extends React.ComponentProps<"div"> {
  onSwitchToLogin: () => void;
}

export function Register({
  className,
  onSwitchToLogin, // <-- Récupérer la prop
  ...props
}: RegisterProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-0 shadow-none"> {/* J'ai enlevé la bordure/ombre */}
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button">
                  <Github className="mr-2" />
                  <span className="sr-only">Login with Github</span>
                </Button>
                <Button variant="outline" type="button">
                  <Linkedin className="mr-2" />
                  <span className="sr-only">Login with Linkedin</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                {/* MODIFIÉ ICI */}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Empêche le rechargement
                    onSwitchToLogin(); // Appelle la fonction du parent
                  }}
                  className="font-medium underline-offset-4 hover:underline"
                >
                  Sign in
                </a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden md:block">
            <Image
                          src="/images/image.png"
                          alt="Register Image"
                          width={400}
                          height={400}
                          className="h-full object-bottom-left rounded-md w-full object-cover"
                        />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}