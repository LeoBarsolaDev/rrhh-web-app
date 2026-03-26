import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Frame from "../../../shared/components/frame";
import Sidebar from "../../../shared/components/sidebar";
import { Subtitle, Title } from "../../../shared/components/text";
import { faBrush, faGear } from "@fortawesome/free-solid-svg-icons";
import Radio from "../../../shared/components/radio";
import { useEffect, useState } from "react";

function ColorSample({color=""} : {color:string}){
    return (
        <div
            className="w-8 h-8 rounded-sm border-3 border-gray-200 shadow-2xl"
            style={{ backgroundColor: color }}
        />
  );
}

export default function SettingsPage(){
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme || "coral"
        )
        localStorage.setItem("theme", theme || "coral");
    }, [theme])
    return(
        <>
            <Sidebar />
            <div 
                className="
                    xl:ml-52 lg:ml-48 md:ml-40 md:mt-0 ml-0 mt-24 
                    min-h-[calc(100dvh-6rem)] flex justify-center items-center
                "
            >
                <Frame styles="w-9/10 max-h-8/10" rounded>
                    <div className="
                        w-full h-1/10
                        border-b-4 border-separator
                        flex justify-start items-center p-4
                    ">
                        <span className="
                        flex gap-2 items-center 
                        text-2xl text-foreground font-bold 
                        ">
                            <FontAwesomeIcon icon={faGear} /> Ajustes
                        </span>
                    </div>

                    <div className="p-4 flex flex-col gap-4 w-full">
                        <Subtitle> <FontAwesomeIcon icon={faBrush} /> Temas </Subtitle>

                        <div className="flex gap-4 w-full sm:flex-row flex-col">
                            <Radio
                                name="theme"
                                value="coral"
                                selected={theme}
                                onChange={setTheme}
                            >
                                <span className="flex flex-col h-full items-center gap-2"> <ColorSample color="#C2AAA6"/> Coral </span>
                            </Radio>
                            
                            <Radio
                                name="theme"
                                value="light"
                                selected={theme}
                                onChange={setTheme}
                            >
                                <span className="flex flex-col h-full items-center gap-2"> <ColorSample color="#FFFFFF"/> Claro </span>
                            </Radio>

                            <Radio
                                name="theme"
                                value="dark"
                                selected={theme}
                                onChange={setTheme}
                            >
                                <span className="flex flex-col h-full items-center gap-2"> <ColorSample color="#121212"/> Oscuro </span>
                            </Radio>
                        </div>
                    </div>
                </Frame>
            </div>
        </>
    )
}