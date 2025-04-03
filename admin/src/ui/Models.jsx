import { useState } from "react";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext } from "react";
import { UseOutsideClick } from "./UseOutsideClick";

const Overlay = ({ children }) => {
  return (
    <div className="fixed overflow-y-auto h top-0 left-0 w-full h-screen bg-backdrop-color bg-opacity-70 backdrop-filter backdrop-blur-sm z-50 transition-all duration-500 ">
      {children}
      {/* Use the close function to make sure user can close the modal as background overlay */}
    </div>
  );
};

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const { ref } = UseOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <div
        className="fixed  w-[90%] mx-auto lg:w-[50%] top-1/2 bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg p-8 transition-all duration-500"
        ref={ref}
      >
        <button
          onClick={close}
          className="absolute  top-3 right-4 bg-transparent border-none p-1 rounded-sm transition-all duration-200 hover:bg-gray-100"
        >
          <HiXMark className="w-10 h-10 text-gray-700  " />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
