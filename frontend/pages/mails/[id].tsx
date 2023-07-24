import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MailDetail() {
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        (async function getData() {
            if (!id) return;
            fetch(`http://localhost:3000/mail/${id}`, {
                headers: { "Content-Type": "application/json" },
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                });
        })();
    }, [id]);
    if (!data) {
        return <></>;
    }
    return (
        <div>
            Subject: {data.subject}
            <br />
            Sender: {data.sender}
            <br />
            To: {data.receiver}
            <br />
            CCs: {data.ccs}
            <br />
            Body: {data.body}
        </div>
    );
}
