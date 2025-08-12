import { createContext, useContext, useState } from "react";

const sidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <sidebarContext.Provider
      value={{
        isModalSidebarOpen: isOpen,
        closeSidebar: () => setIsOpen(false),
        openSidebar: () => setIsOpen(true),
      }}
    >
      {children}
    </sidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(sidebarContext);

  if (context === undefined)
    throw new Error("Cannot access sidebar context outside its provider.");

  return context;
}

export { useSidebar };
export default SidebarProvider;
