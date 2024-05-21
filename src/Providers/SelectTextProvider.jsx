import { createContext, useContext, useRef, useState } from "react";

const SelectTextContext = createContext();

export const useSelectTextContext = () => {
  return useContext(SelectTextContext);
};

export default function SelectTextProvider({ children }) {
  const [selectText, setSelectText] = useState("");
  return (
    <SelectTextContext.Provider value={{ selectText, setSelectText }}>
      {children}
    </SelectTextContext.Provider>
  );
}
