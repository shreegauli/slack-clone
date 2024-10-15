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

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export const SingUpCard = ({ setState }: SignUpCardProps) => {
    const {signIn} = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            if (password!== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            setPending(true);
            signIn("password", {name, email, password, flow: "signUp"})
            .catch(() => {
                setError("Failed to sign up");
 
            })
            .finally(()=>{
                setPending(false);
            })
                
        };
        

    const onProviderSignUp = (value: "github" | "google") => {
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
                        Sign Up to Continue
                    </CardTitle>
                    <CardDescription className="px-4 pt-2 text-gray-600 text-center">
                        Use your email or another service to continue
                    </CardDescription>
                </CardHeader>
                {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert className="size-4" />
                        <p>{error}</p>
                    </div>
                )}
                <CardContent className="space-y-5 px-0 pb-0">
                    <form className="space-y-4" onSubmit={onPasswordSignUp}>
                        <Input
                            disabled={pending}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="border rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                        />
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
                        <Input
                            disabled={pending}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            type="password"
                            required
                            className="border rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                        />
                        <Button
                            type="submit"
                            disabled={pending}
                            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200 rounded-md py-2"
                        >
                            Continue
                        </Button>
                    </form>
                    <Separator />
                    <div className="space-y-4">
                        <Button
                            disabled={pending}
                            onClick={() => onProviderSignUp("google")}
                            variant="outline"
                            size='lg'
                            className="w-full relative p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <FcGoogle className="absolute left-3" size={20} />
                            Continue with Google
                        </Button>

                        <Button
                            disabled={pending}
                            onClick={() => onProviderSignUp("github")}
                            variant="outline"
                            size='lg'
                            className="w-full relative p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                        >
                            <FaGithub className="absolute left-3" size={20} />
                            Continue with GitHub
                        </Button>
                    </div>
                    <p className="text-xs text-gray-600 text-center">
                        Already have an account? 
                        <span 
                          onClick={() => setState("signIn")} 
                          className="text-sky-700 hover:underline cursor-pointer"> 
                          Sign in
                        </span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};