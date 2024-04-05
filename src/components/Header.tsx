import { useState } from "react";
import logo from "../assets/taugor.png";
import { useAuth } from "../domain/auth-management/context/AuthProvider";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { PiSignOutBold } from "react-icons/pi";

export function Header(){

    const { currentUser, signout } = useAuth();

    const [tray, setTray] = useState(false);



    return(
        <header style={{background: "#fefeff"}} className="w-full flex justify-between relative">
            <div className="px-9 py-3 border-r">
                <img src={logo} className="h-12"/>
            </div>
            <div>

            </div>
            <div 
                onClick={() => setTray(!tray)}
                className="flex items-center px-9 hover:bg-slate-100 transition-all cursor-pointer gap-3 border-l"
            >
                <span className="font-medium">
                    {currentUser?.displayName}
                </span>

                <div className="flex items-center gap-1">
                    <div className="bg-[#269eef] p-2 rounded-full">
                        <FaUser color="#fff" />
                    </div>
                    <div>
                        <IoMdArrowDropdown />
                    </div>
                </div>
            </div>

            <div className="bg-[#e7ebee] h-[3px] absolute bottom-0 w-full">
                <div className="h-full w-[88%] bg-[#269eef]">

                </div>
            </div>

            <div className={`absolute w-[225px] bg-[#fefeff] right-0 top-[72px] overflow-hidden ${tray ? "h-min" : "h-0"} transition-all`}>
                <ul>
                    <li className="flex items-center gap-3 py-6 px-3 cursor-pointer hover:bg-slate-100">
                        <div>
                            <TiHome size={25} />
                        </div>
                        <span>
                            Home
                        </span>
                    </li>
                    <li className="flex items-center gap-3 py-6 px-3 cursor-pointer hover:bg-slate-100">
                        <div>
                            <FaUserPlus size={25} />
                        </div>
                        <span>
                            Criar funcionário
                        </span>
                    </li>
                    <li 
                        onClick={signout}
                        className="flex items-center gap-3 py-6 px-3 cursor-pointer hover:bg-slate-100 mt-2 border-t"
                    >
                        <div>
                            <PiSignOutBold />
                        </div>
                        <span>
                            Sair
                        </span>
                    </li>
                </ul>
            </div>
        </header>
    );
}