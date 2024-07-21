import Link from "next/link";

interface Props{
    children: React.ReactNode
    name: string
    isOpen:boolean
    href:string
}
const SidebarPage = ({children,name, isOpen, href}:Props) =>
{   
    return(
        <Link href={href} legacyBehavior>

        <a 
        href ="#" 
        className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-blacl stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
        >
            {children}
            {isOpen &&(
            <p className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide" >
                {name}
            </p>
            )}
        </a>
        </Link>
    )
}

export default SidebarPage