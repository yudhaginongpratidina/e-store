import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Register",
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
            {children}
        </main>
    );
}