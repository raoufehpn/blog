
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { userLogin } from "../auth/actions"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Terminal } from "lucide-react"

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
             {message && (
              <Alert variant="default" className="mb-4 border-green-500 text-green-700 dark:border-green-400 dark:text-green-400 [&>svg]:text-green-700 dark:[&>svg]:text-green-400">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
            )}
            <form>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    <Button type="submit" formAction={userLogin} className="w-full">
                        Login
                    </Button>
                </div>
            </form>
             <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
