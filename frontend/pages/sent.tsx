import { BUTTON_CLASSNAME } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SentMail {
    id: number;
    subject: string;
    receiver: string[];
    ccs: string[];
}

export default function Sent() {
    const [sent, setSent] = useState<SentMail[]>([]);
    useEffect(() => {
        (async function getMails() {
            if (typeof window === "undefined") return;
            const email = localStorage.getItem("auth-email");
            fetch(`http://localhost:3000/sent?email=${email}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            })
                .then((res) => res.json())
                .then((data: SentMail[]) => {
                    setSent(data);
                });
        })();
    }, []);
    return (
        <table className="table-auto border-separate border-spacing-2 border border-slate-400">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>To</th>
                    <th>CC</th>
                    <th>BCC</th>
                </tr>
            </thead>
            <tbody>
                {sent.map((data, idx) => (
                    <tr key={idx}>
                        <td>{data.subject}</td>
                        <td>{data.receiver}</td>
                        <td>{data.ccs}</td>
                        <td><Link className={BUTTON_CLASSNAME} href={`/mails/${data.id}`}>Detail</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
