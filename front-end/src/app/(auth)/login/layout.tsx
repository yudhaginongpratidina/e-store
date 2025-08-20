import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {children}
        </>
    )
}
