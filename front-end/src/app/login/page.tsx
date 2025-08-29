"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import LoginForm from "@/components/form/login-form"

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
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
            <Link href={"/register"} className="text-sm flex items-center gap-1">
                <span className="text-muted-foreground">Don't have an account? </span>
                <span className="font-bold hover:underline hover:underline-offset-4">Create</span>
            </Link>
        </>
    )
}