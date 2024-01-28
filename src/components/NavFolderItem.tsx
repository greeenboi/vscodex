import React, { useState } from "react";
import { IFile } from "../types";
import { readDirectory } from "../helpers/filesys";
import NavFiles from "./NavFiles";

interface Props {
    file : IFile;
    
}

export default function NavFolderItem({ file }: Props) {
    const [files, setFiles] = useState<IFile[]>([])
    const [unfold, setUnfold] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const onShow  =async (e:React.MouseEvent<HTMLSpanElement,MouseEvent>) => {
        e.stopPropagation();

        if(loaded){
            setUnfold(!unfold)
            return;
        }

        const entries = await readDirectory(file.path+'/');

        setLoaded(true);
        setFiles(entries);
        setUnfold(!unfold);
    }
    return (
        <div className="source-item">
            <div className={`source-folder ${unfold? 'bg-gray-800' : ''} flex items-center gap-2 py-0.5 text-gray-500 hover:text-gray-400 cursor-pointer`} onClick={onShow}>
                <i className="ri-folder-fill text-yellow-500"></i>
                <div className="source-header flex items-center justify-between w-full group">
                    <span >
                        {file.name}
                    </span>
                    <i className="ri-arrow-down-s-line invisible group-hover:visible"></i>
                </div>
            </div>
            
            <NavFiles visible={unfold} files={files}/>
        </div>
    )
    }