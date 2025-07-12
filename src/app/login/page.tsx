import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { login } from "../auth/actions"

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
            Enter your admin credentials to access the dashboard.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="admin"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    <Button type="submit" formAction={login} className="w-full">
                        Login
                    </Button>
                </div>
            </form>
        </CardContent>
        </Card>
    </div>
  )
}
