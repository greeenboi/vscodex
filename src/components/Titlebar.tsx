import { useState } from "react"
import { appWindow } from "@tauri-apps/api/window"



export default function Titlebar() {
    const [isScaleUp, setScaleUp] = useState(false)
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