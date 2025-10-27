import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function Login() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
              <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center items-center gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        <CardAction className="w-full h-auto flex justify-start items-center text-sm gap-x-1">
            <span>if you don&apos;t have an account? </span>
          <Link className="hover:underline" href={'google.com'}>Sign Up</Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
