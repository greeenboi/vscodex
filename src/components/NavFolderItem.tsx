import React, { useState } from "react";
import { IFile } from "../types";
import { readDirectory, writeFile } from "../helpers/filesys";
import NavFiles from "./NavFiles";
import { nanoid } from "nanoid";
import { saveFileObject } from "../stores/file";

interface Props {
    file : IFile;
    
}

export default function NavFolderItem({ file }: Props) {
    const [files, setFiles] = useState<IFile[]>([])
    const [unfold, setUnfold] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [Newfile, setNewfile] = useState(false)
    const [filename, setFilename] = useState('')

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

    const onEnter = (key: string) => {
        // if(key === 'Enter'){
        //     setNewfile(false);
        //     setFilename('')
        // }
        if (key === 'Escape'){
            setNewfile(false);
            setFilename('')
            return;
        }

        if (key !== 'Enter') return;

        const filepath = `${file.path}/${filename}`;
        writeFile(filepath, '').then(() => {
            const id = nanoid();
            const newFile: IFile = {
                id,
                name: filename,
                path: filepath,
                kind: 'file',
            }
            saveFileObject(id, newFile);
            setFiles(prevEntries => [newFile, ...prevEntries]);
            setNewfile(false);
            setFilename('')
        })
    }

    return (
        <div className="source-item">
            <div className={`source-folder ${unfold? 'bg-gray-800' : ''} flex items-center gap-2 py-0.5 text-gray-500 hover:text-gray-400 cursor-pointer`} onClick={onShow}>
                <i className="ri-folder-fill text-yellow-500"></i>
                <div className="source-header flex items-center justify-between w-full group">
                    <span className="flex flex-row w-full gap-2 items-center" >
                        {file.name}
                        <i className={` ${unfold?  'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} invisible group-hover:visible transition-all ease-in-out duration-100`}></i>
                    </span>
                    <i className="ri-add-line invisible group-hover:visible" onClick={() => setNewfile(true)}></i>
                </div>
            </div>
            {Newfile? (
                <div className="mx-4 flex items-center gap-0.5 p-2">
                    <i className="ri-file-edit-line text-gray-300"></i>
                    <input 
                        type="text" 
                        value={filename} 
                        onChange={(e) => setFilename(e.target.value)} 
                        onKeyUp={(e) => onEnter(e.key)}
                        className="input bg-opacity-30"
                    ></input>
                </div>
            ) : null }
            <div className=" pl-4 ml-4 border-l border-white">
                <NavFiles visible={unfold} files={files} />
            </div>
        </div>
    )
}