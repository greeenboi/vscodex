import { useRef, useState } from "react";
import CodeArea from "./components/CodeArea";
import Sidebar from "./components/Sidebar";
import Titlebar from "./components/Titlebar";
import { SourceProvider } from "./context/SourceContext";

export default function App() {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const posRef = useRef(null)


  const onCloseDialog = () => {
      setDialogOpen(false);
  }

  return(
    <div className="wrapper">
      <Titlebar isDialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} posRef={posRef} />
      <div id="editor" className="h-screen flex items-start overflow-hidden bg-primary">
        <SourceProvider>
          <Sidebar />
          <CodeArea />
          <dialog  open={isDialogOpen} className=" absolute z-90 top-[30%] left-[20%] w-48 h-48 overflow-hidden bg-secondary text-white border border-white  rounded-lg p-2" >
              <div className="dialog-content flex flex-col gap-4 ">
                <div className="flex flex-row justify-between items-center border-b border-white rounded-sm">
                  <p className=" font-mono">Settings</p>
                  <i onClick={onCloseDialog} className="ri-close-fill cursor-pointer hover:text-red-500 hover:bg-primary transition-all duration-150 ease-in-out p-1"></i>
                </div>

                <i  onClick={() => window.open('https://github.com/greeenboi')} className="cursor-pointer ri-bug-2-line border mx-1 p-1 border-transparent hover:border-white hover:bg-white hover:bg-opacity-5 rounded-md "><span className=" font-mono mx-2">Bug Report</span></i>
              </div>
          </dialog>
        </SourceProvider>
      </div>
    </div>
  )
}