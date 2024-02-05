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
        console.log(file.id);
        if(file.kind === 'file'){
            setSelect(file.id);
            addOpenedFile(file.id);
        }
    }

    // const handleDeleteFile = (path: string) => {

    // }

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
                    <div onClick={(e) => onShow(e, file)} key={file.id} className={`w-full source-item ${isSelected ? 'source-item-active' : ''} flex flex-row justify-between items-center px-4 py-0.5 text-[#AEAEAE] hover:text-gray-300 cursor-pointer active:border border-gray-600 hover:bg-gray-500 my-1 ease-in-out transition-all `}>
                        <div className="flex flex-row gap-1">
                            <FileIcon name={file.name} />
                            <span className="text-sm">{file.name}</span>
                        </div>
                        {/* <i className="ri-delete-bin-6-line text-gray-500 hover:text-red-700" onClick={}></i> */}
                    </div>
                )
            })}
        </div>
    )
}