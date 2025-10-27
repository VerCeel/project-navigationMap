import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Login } from "@/components/loginRegister/Login"
import { LogIn } from "lucide-react"


export function LoginBtn() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
         <Button variant="default" className="cursor-pointer">
            <LogIn className="mr-2 h-4 w-4" />
            Login
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <Login />
        </DialogContent>
      </form>
    </Dialog>
  )
}
