"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function LogoutPage() {
  const { signOut } = useAuthActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <h1 className="text-4xl font-bold mb-4">You’re Logged Out!</h1>
      <p className="text-lg mb-8">Thank you for using our service. We hope to see you again soon!</p>
      <UserButton />
      <Button 
        className="mt-8 px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  );
}