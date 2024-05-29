import React, { createContext, useState } from "react";

// creating the context using react's createContext() func
export const FontContext = createContext();

// Creare il provider per il contesto
export const FontProvider = ({ children }) => {
  const [font, setFont] = useState("Helvetica");

  const toggleFont = () => {
    setFont((prevFont) =>
      prevFont === "Helvetica" ? "Comic Sans MS" : "Helvetica",
    );
  };

  return (
    <FontContext.Provider value={{ font, toggleFont }}>
      {children}
    </FontContext.Provider>
  );
};
