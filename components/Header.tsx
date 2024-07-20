import { useRouter } from "next/router"
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
interface HeaderProps{
    label: string;
    showArrowBack?: boolean;
}

const Header:React.FC<HeaderProps> = ({ label, showArrowBack }) => {
    const router = useRouter();
    const handleBack = useCallback(() => {
        router.back();
    }, [router]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2">
            {
                showArrowBack && (
                    <BiArrowBack size={20} color="white" onClick={handleBack} 
                        className="cursor-pointer hover:opacity-70 transition"
                    />
                )
            }
            <h1 className="text-xl text-white font-semibold">{label}</h1>
        </div>
    </div>
  )
}

export default Header