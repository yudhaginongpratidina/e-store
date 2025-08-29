"use client"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import RegisterForm from "@/components/form/register-form"

import { FaStore } from "react-icons/fa";

export default function Page() {
    return (
        <>
            <div className="w-fit flex items-center gap-2">
                <FaStore className="w-12 h-12" />
                <h1 className="text-2xl font-bold">E-Store</h1>
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
            <Link href={"/login"} className="text-sm flex items-center gap-1">
                <span className="text-muted-foreground">I have an account? </span>
                <span className="font-bold hover:underline hover:underline-offset-4">Login</span>
            </Link>
        </>
    )
}