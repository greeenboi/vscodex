import { createContext, useContext, useState, useCallback } from "react";

interface ISourceContext {
    selected:string;
    setSelect: ( id: string ) => void;
    opened: string[];
    addOpenedFile: (id: string) => void;
    deleteOpenedFile: (id: string) => void;
}

const SourceContext = createContext<ISourceContext>({
    selected: '',
    setSelect:(id) => {},
    opened: [],
    addOpenedFile: (id) => {},
    deleteOpenedFile: (id) => {},
});


export const SourceProvider = ({ children }: { children: JSX.Element | JSX.Element[]}) => {
  
    const [selected, setSelected] = useState<string>('');
    const [opened, updateOpenedFiles] = useState<string[]>([]);

    const setSelect = ( id:string ) => {
        setSelected(id);
    }

    const addOpenedFile = useCallback((id: string) => {
        if(opened.includes(id)) return;
        updateOpenedFiles(prevOpen => ([...prevOpen, id]))
    }, [opened])

    const deleteOpenedFile = useCallback((id: string) => {
        updateOpenedFiles(prevOpen => (prevOpen.filter(item => item !== id)))
    }, [])

    return (
    <SourceContext.Provider value={{
        selected,
        setSelect,
        opened,
        addOpenedFile,
        deleteOpenedFile
    }}>
        {children}
    </SourceContext.Provider>
  )
}

export const useSource = () =>{
    const { selected, setSelect, opened, addOpenedFile, deleteOpenedFile } = useContext(SourceContext);

    return { selected, setSelect, opened, addOpenedFile, deleteOpenedFile }
}