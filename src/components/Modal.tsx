"use client";
import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal(props: Props) {
  const { isOpen, onClose, children } = props;

  const modalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    modalRootRef.current = document.getElementById("modal-root");
  }, []);

  if (!isOpen) return null;

  return modalRootRef.current
    ? ReactDOM.createPortal(
        <div className={"fixed inset-0 flex items-center justify-center z-50"}>
          <div
            className={
              "absolute inset-0 w-full h-full bg-black bg-opacity-20 z-2"
            }
            onClick={onClose}
          ></div>
          <div
            className={
              "bg-white p-4 rounded-lg shadow-lg z-3 relative w-10/12 flex flex-col "
            }
          >
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 self-end"
              onClick={onClose}
            >
              Close
            </button>
            <div className='w-full overflow-x-auto'>
                <div className="min-w-fit md:w-full">
                    {children}
                </div>
            </div>
          </div>
        </div>,
        modalRootRef.current,
      )
    : null;
}
