import { useEffect, useState } from "react";
import { BUTTON_CLASSNAME } from "@/constants";
import Link from "next/link";

interface ReceivedMail {
    id: string;
    subject: string;
    sender: string;
    receiver: string[];
    ccs: string[];
}

export default function Received() {
    const [received, setReceived] = useState<ReceivedMail[]>([]);
    useEffect(() => {
        (async function getMails() {
            if (typeof window === "undefined") return;
            const email = localStorage.getItem("auth-email");
            fetch(`http://localhost:3000/received?email=${email}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setReceived(data);
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
                {received.map((data, idx) => (
                    <tr key={idx}>
                        <td>{data.subject}</td>
                        <td>{data.sender}</td>
                        <td>{data.receiver}</td>
                        <td>{data.ccs}</td>
                        <td><Link className={BUTTON_CLASSNAME} href={`/mails/${data.id}`}>Detail</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
