import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [dark, setDark] = useState(false); // Tema oscuro
  const [translate, setTranslate] = useState(false); // Traducción

  return (
    <GlobalContext.Provider value={{ dark, setDark, translate, setTranslate }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar el contexto
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
