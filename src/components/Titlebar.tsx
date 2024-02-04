import {  useState } from "react"
import { appWindow } from "@tauri-apps/api/window"

interface SettingsDialogProps{
    isDialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    posRef: React.MutableRefObject<null>;
}


export default function Titlebar({isDialogOpen, setDialogOpen, posRef}: SettingsDialogProps) {
    const [isScaleUp, setScaleUp] = useState(false);
    ;

    const onMinimize = () => {
        appWindow.minimize()
    }
    const onScaleup = () => {
        appWindow.toggleMaximize()
        setScaleUp(true)
    }

    const onScaleDown = () => {
        appWindow.toggleMaximize()
        setScaleUp(false)
    }

    const onClose = () => {
        appWindow.close()
    }

    

    return (
        <div id="titlebar" data-tauri-drag-region>
            <div className="flex items-center gap-1 5 pl-2">
                <img src="/vscodex.webp" alt="tauri icon" className="w-[18px]" />
                <span className="text-xs uppercase text-pretty font-mono ">
                    VScodex
                </span>
            </div>
            <div className="titlebar-actions">
                <i ref={posRef} className="titlebar-icon ri-settings-line mx-2" onClick={() => setDialogOpen(!isDialogOpen)}>
                    
                </i>
                <i className="titlebar-icon ri-subtract-line" onClick={onMinimize}></i>

                {
                    isScaleUp ?
                    <i className="titlebar-icon ri-file-copy-line" onClick={onScaleDown}></i>:
                    <i className="titlebar-icon ri-stop-line" onClick={onScaleup}></i>
                }

                <i id="ttb-close" className="titlebar-icon ri-close-fill" onClick={onClose}></i>
            </div>
        </div>
    )
}