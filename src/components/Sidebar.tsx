import { useState } from "react"
import { IFile } from "../types"
import { open } from "@tauri-apps/api/dialog"
import NavFiles from "./NavFiles";
import { readDirectory } from "../helpers/filesys";


export default function Sidebar() {
    const [projectName, setProjectName] = useState("");
    const [files, setFiles] = useState<IFile[]>([]);

    const loadFile = async () => {
        const selected = await open({ 
            directory: true,
        });

        if (!selected) return;

        console.log(selected);
        setProjectName(selected as string);
        readDirectory(selected + '/' ).then((files) => {
            // console.log(files);
            setFiles(files);
        })
    }

    return (
        <aside id="sidebar" className="w-60 shrink-0 h-full bg-darken">
            <div className="sidebar-header flex flex-col items-center justify-between my-2 p-4 py-2.5">
                <button onClick={loadFile} className="project-explorer flex flex-row justify-between items-center">
                    File Explorer
                    <i className="ri-folder-open-line hover:bg-gray-700 rounded-lg transition-all ease-in-out duration-200 p-1"></i>
                </button>
                <span className="project-name whitespace-nowrap text-gray-400 text-xs my-2">{projectName}</span>

                <div className="code-structure">
                    <NavFiles files={files} visible={true} />
                </div>
            </div>
        </aside>
    )
}