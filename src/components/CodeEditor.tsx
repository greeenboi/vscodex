import { nanoid } from "nanoid";
import { useMemo, useRef } from "react";
import { EditorView, basicSetup} from 'codemirror'


interface Props {
    id: string;
    active: boolean;
}

export default function CodeEditor({ id, active } : Props) {
    const isRendered = useRef(0);
    const editorId = useMemo(() => nanoid() ,[])
    const visible = active ? 'block' : 'hidden';
    const editorRef = useRef<null>(null);

    const update
}