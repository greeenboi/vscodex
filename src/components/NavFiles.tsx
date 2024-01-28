import { useSource } from "../context/SourceContext"
import { IFile } from "../types";
import FileIcon from "./FileIcon";
import NavFolderItem from "./NavFolderItem";

interface Props {
    files: IFile[];
    visible: boolean;
}

export default function NavFiles({ files, visible} : Props) {
    const {setSelect, selected, addOpenedFile} = useSource();
    const onShow = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, file: IFile) =>{
        e.stopPropagation();
        if(file.kind === 'file'){
            setSelect(file.id);
            addOpenedFile(file.id);
        }
    }


    return(
        <div className={`source-codes ${visible ? '' : 'hidden'}`}>
            {files.map(file => {
                const isSelected = file.id === selected;
                if( file.kind === 'directory' ){
                    return (
                        <NavFolderItem  key={file.id} file={file}  />
                    )
                }
                return(
                    <div onClick={(e) => onShow(e, file)} key={file.id} className={`source-item ${isSelected ? 'source-item-active' : ''} flex items-center gap-2 px-4 py-0.5 text-gray-500 hover:text-gray-300 cursor-pointer active:border border-gray-600 hover:bg-gray-500 my-1 ease-in-out transition-all `}>
                        <FileIcon name={file.name} />
                        <span className="text-sm">{file.name}</span>
                    </div>
                )
            })}
        </div>
    )
}