import React, { useEffect, useRef } from "react";
import { useSelectTextContext } from "./Providers/SelectTextProvider";

const Layout = ({ children }) => {
  const { selectText, setSelectText } = useSelectTextContext();
  const documentRef = useRef();
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectText = selection.toString().trim();
      if (selectText) {
        console.log("selectText : ", selectText);
        setSelectText(selectText);
      }
    };
    documentRef.current?.addEventListener("mouseup", handleSelection);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      documentRef.current?.removeEventListener("mouseup", handleSelection);
    };
  });
  return <div ref={documentRef}>{children}</div>;
};

export default Layout;
