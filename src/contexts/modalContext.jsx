import { createContext, useContext, useState } from "react";

const modalContext = createContext();

function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <modalContext.Provider value={{ isOpen, toggleModal: setIsOpen }}>
      {children}
    </modalContext.Provider>
  );
}

function useModal() {
  const context = useContext(modalContext);

  if (context === undefined)
    throw new Error("Cannot access modal hook outside its provider.");

  return context;
}

export { useModal };
export default ModalProvider;
