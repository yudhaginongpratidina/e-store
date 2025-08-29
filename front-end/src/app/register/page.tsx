"use client"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { FaStore } from "react-icons/fa";

type FormData = {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { email, password } = formData;
            toast.success("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
            })
            console.log(email, password);
        } catch (error) {
            console.log(error);
        }
    }

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
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">Create</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Link href={"/login"} className="text-sm flex items-center gap-1">
                <span className="text-muted-foreground">I have an account? </span>
                <span className="font-bold hover:underline hover:underline-offset-4">Login</span>
            </Link>
        </>
    )
}