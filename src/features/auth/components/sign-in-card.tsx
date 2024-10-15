import { useAuthActions } from "@convex-dev/auth/react";
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import {TriangleAlert} from "lucide-react";
import {Card, 
    CardContent, 
    CardDescription, 
    CardHeader,
    CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator";
import { SignInFlow } from "../types"
import React, { useState } from "react"

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export const SingInCard = ({ setState }: SignInCardProps) => {
    const {signIn} = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        signIn("password", { email, password, flow: "signIn" })
        .catch(() => {
setError("Invalid email or password")
        })
        .finally(()=> {
            setPending(false);
        });
    };

    const onProviderSignIn = (value: "github" | "google") => {
        setPending(true);
        signIn(value)
        
        .finally(()=>{
            setPending(false);
        })
    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                        Login to Continue
                    </CardTitle>
                    <CardDescription className="px-4 pt-2 text-gray-600 text-center">
                        Use your email or another service to continue
                    </CardDescription>
                </CardHeader>
             {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
<TriangleAlert className="size-4" />
<p> {error}</p>
                    </div>
                )}
                <CardContent className="space-y-5 px-0 pb-0">
                    <form className="space-y-4" onSubmit={onPasswordSignIn}>
                        <Input
                            disabled={pending}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                            required
                            className="border rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                        />
                        <Input
                            disabled={pending}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            required
                            className="border rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200 rounded-md py-2"
                            size="lg"
                            disabled={pending}
                        >
                            Continue
                        </Button>
                    </form>
                    <Separator />
                    <div className="space-y-4">
                        <Button
                            disabled={pending}
                            onClick={() => onProviderSignIn ("google")}
                            variant="outline"
                            size='lg'
                            className="w-full relative py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <FcGoogle className="absolute left-3" size={20} />
                            Continue with Google
                        </Button>

                        <Button
                            disabled={pending}
                            onClick={() => onProviderSignIn ("github")}
                            variant="outline"
                            size='lg'
                            className="w-full relative py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <FaGithub className="absolute left-3" size={20} />
                            Continue with GitHub
                        </Button>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                        Don't have an account? 
                        <span 
                          onClick={() => setState("signUp")} 
                          className="text-sky-700 hover:underline cursor-pointer"> 
                          Sign up
                        </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};