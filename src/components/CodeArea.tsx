import { useSource } from "../context/SourceContext";
import useHorizontalScroll from "../context/useHorizontalScroll";
import { getFileObject } from "../stores/file";
import { IFile } from "../types";
import FileIcon from "./FileIcon";
import PreviewImage from "./PreviewImage";

export default function CodeArea (){
    const { opened, selected, setSelect, deleteOpenedFile  } = useSource();
    const scrollRef = useHorizontalScroll();
    const onSelectItem = (id: string) => {
        setSelect(id);
    }

    const close = ( e : React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        e.stopPropagation();
        deleteOpenedFile(id);
    }

    const isImage = (name: string) => {
        return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'].some( ext => name.endsWith(ext) === true);
    }

    return(
        <div id="code-area" className="w-full h-full">
            <div ref={scrollRef} className="code-tab-items flex items-center border-b border-stone-800 divide-x divide-stone-800 overflow-x-auto">
                {opened.map( item => {
                    const file = getFileObject(item) as IFile;
                    const active = item === selected ? 'bg-darken text-gray-400': '';

                    return (
                        <div 
                            onClick={() => onSelectItem(file.id)} 
                            className={` tab-item shrink-0 px-3 py-1.5 text-gray-500 cursor-pointer hover:text-gray-400 flex items-center gap-2 ${active}`}
                            key={item}
                        >
                            <FileIcon name={file.name} size="sm"/>
                            <span className="text-sm">{file.name}</span>
                            <i onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => close(e, item)} className="ri-close-line hover:text-red-400"></i>
                        </div>
                    )
                })}
            </div>
            <div className="code-contents">
                {opened.map(item =>{
                    const file = getFileObject(item) as IFile;
                    if (isImage(file.name)) return <PreviewImage key={item} path={file.path} active={item === selected} />;
                })}
            </div>
        </div>
    )
}