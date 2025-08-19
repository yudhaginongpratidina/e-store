import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account",
    description: "Create an account",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {children}
        </>
    )
}
