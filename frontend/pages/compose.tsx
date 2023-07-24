import { BUTTON_CLASSNAME } from "@/constants";
import { useRef } from "react";

export default function Compose() {
    const subjectRef = useRef<HTMLInputElement>(null);
    const receiverRef = useRef<HTMLInputElement>(null);
    const ccsRef = useRef<HTMLInputElement>(null);
    const bccsRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const handleSend = () => {
        fetch(`http://localhost:3000/mail`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                sender: localStorage.getItem("auth-email"),
                subject: subjectRef.current?.value,
                receiver: receiverRef.current?.value,
                body: bodyRef.current?.value,
                ccs: ccsRef.current?.value,
                bccs: bccsRef.current?.value,
            }),
        })
            .then(() => {
                window.alert("Email sent.");
            })
            .catch(() => {
                window.alert("There was an error sending an email.");
            });
    };

    return (
        <form className="rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subject"
                >
                    Subject
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    ref={subjectRef}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="receiver"
                >
                    To
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="receiver"
                    type="text"
                    placeholder="To (Comma separated)"
                    ref={receiverRef}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="ccs"
                >
                    CC
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="ccs"
                    type="text"
                    placeholder="CC (Comma separated)"
                    ref={ccsRef}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="bccs"
                >
                    BCC
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bccs"
                    type="text"
                    placeholder="BCC (Comma separated)"
                    ref={bccsRef}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="body"
                >
                    Body
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="body"
                    placeholder="Body"
                    ref={bodyRef}
                />
            </div>
            <button
                className={BUTTON_CLASSNAME}
                onClick={() => handleSend()}
            >
                Send
            </button>
        </form>
    );
}
