import { BUTTON_CLASSNAME } from "@/constants";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    if (typeof window !== "undefined") {
        const email = localStorage.getItem("auth-email");
        if (router.pathname !== "/login" && !email) {
            router.replace("/login");
        }
    }
    return (
        <>
            <header className="mb-5 mt-5 pl-2">
                <Link href="/" className={BUTTON_CLASSNAME}>Home Page</Link>
            </header>
            <main className="min-h-screen px-5">
                <Component {...pageProps} />
            </main>
        </>
    );
}
