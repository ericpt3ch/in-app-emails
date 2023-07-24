import { BUTTON_CLASSNAME } from "@/constants";
import Link from "next/link";

function Home() {
    return (
        <div className="flex flex-col items-center">
            <Link href="/compose" className={`${BUTTON_CLASSNAME} mb-2`}>
                New email
            </Link>
            <Link href="/sent" className={`${BUTTON_CLASSNAME} mb-2`}>
                Sent emails
            </Link>
            <Link href="/received" className={`${BUTTON_CLASSNAME} mb-2`}>
                Received emails
            </Link>
        </div>
    );
}

export default Home;
