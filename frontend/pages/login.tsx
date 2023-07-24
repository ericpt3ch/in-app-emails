import { useRouter } from "next/router";
import { useRef } from "react";

export default function Login() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const handleLogin = () => {
        fetch("http://localhost:3000/login", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email: inputRef.current?.value }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isAuthenticated) {
                    localStorage.setItem("auth-email", data.email);
                    router.push("/");
                } else {
                    window.alert("Authentication failed.");
                }
            });
    };
    return (
        <div>
            Please login with your email
            <input type="text" ref={inputRef} />
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}
