import Image from "next/image"
import Link from "next/link"

export default function Logo({}) {

    return (
        <Link href="/" title="Go to homepage" className="hover:scale-105 transition-all">
            <Image src="/logo-no-bg.png" alt="Logo" width={140} height={140} className="md:hidden next-image-auto"/>
            <Image src="/logo-no-bg.png" alt="Logo" width={100} height={100} className="md:block hidden lg:hidden next-image-auto"/>
            <Image src="/logo-no-bg.png" alt="Logo" width={120} height={120} className="hidden lg:block next-image-auto"/>
        </Link>
    )
}