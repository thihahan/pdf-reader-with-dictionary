import { IconButton, Input, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  ArrowForwardIos as NextIcon,
  ArrowBackIosNew as BackIcon,
} from "@mui/icons-material";
import TableOfContents from "./TableOfContents";
import Dictionary from "./Dictionary";

const App = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectText, setSelectText] = useState("");
  const [tempNum, setTempNum] = useState();
  const [scale, setScale] = useState(100);
  const [openDict, setOpenDict] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTempNum(1);
  }
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

  useEffect(() => {
    setTempNum(pageNumber);
  }, [pageNumber]);
  return (
    <div className="m-10">
      <p>
        Our dictionary API operates under the Creative Commons
        Attribution-ShareAlike 3.0 License (CC BY-SA 3.0). You can find more
        details about this license at{" "}
        <a
          className="underline text-blue-700 font-bold"
          href="https://creativecommons.org/licenses/by-sa/3.0/"
        >
          Creative Commons
        </a>
        . We source our dictionary data from{" "}
        <a
          className="underline text-blue-700 font-bold"
          href="https://en.wiktionary.org/wiki"
        >
          Wiktionary
        </a>{" "}
        and utilize the API provided by{" "}
        <a
          className="underline text-blue-700 font-bold"
          href="https://api.dictionaryapi.dev/"
        >
          DictionaryAPI
        </a>{" "}
        These sources serve as invaluable contributors to the richness and
        accuracy of the information we provide.
      </p>
      <div className="flex items-center my-3 gap-3">
        <label htmlFor="">Choose {pdfUrl && "another"} Pdf file :</label>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file.type == "application/pdf") {
              setPdfUrl(URL.createObjectURL(file));
              console.log(e.target.files[0]);
              return;
            }
            alert("file must be pdf");
            return;
          }}
          className="my-3"
        />
      </div>
      {pdfUrl && (
        <div>
          <button
            className="px-3 bg-sky-600 text-white py-2 hover:bg-sky-700 transition-all duration-400 rounded my-3"
            onClick={() => setOpenDict((pre) => !pre)}
          >
            {openDict ? "Close" : "Open"} Dictionary
          </button>
        </div>
      )}

      {pdfUrl && (
        <div className="flex">
          <div className="flex-grow">
            <div className="flex justify-between">
              <div className="flex border px-3 rounded">
                <input
                  type="text"
                  value={tempNum}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setTempNum(Number(e.target.value));
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      let num = e.target.value;
                      if (Number(num) != null) {
                        num = Number(num);
                        if (num <= numPages) {
                          setPageNumber(num);
                          return;
                        }
                      }
                    }
                  }}
                  className="border-r w-14 p-2 focus:outline-none"
                />
                <p className="p-2">of {numPages}</p>
              </div>
              <div>
                <input
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  type="range"
                  max={500}
                  min={50}
                />
              </div>
            </div>
            <div className="relative flex justify-center border my-5">
              <Document
                inputRef={documentRef}
                onLoadSuccess={onDocumentLoadSuccess}
                file={pdfUrl}
              >
                <Page
                  className="w-full"
                  scale={scale / 100 || 1}
                  pageNumber={pageNumber || 1}
                />
              </Document>
              <IconButton
                onClick={() => {
                  if (pageNumber < numPages) {
                    setPageNumber((pre) => pre + 1);
                    setTempNum((pre) => pre + 1);
                  }
                }}
                sx={{
                  position: "absolute",
                  zIndex: 1000,
                  right: 10,
                  top: "40%",
                }}
              >
                <NextIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber((pre) => pre - 1);
                    setTempNum((pre) => pre - 1);
                  }
                }}
                sx={{
                  position: "absolute",
                  zIndex: 1000,
                  left: 10,
                  top: "40%",
                }}
              >
                <BackIcon />
              </IconButton>
            </div>
          </div>
          <Dictionary
            open={openDict}
            selectText={selectText}
            setSelectText={setSelectText}
            setOpen={setOpenDict}
          />
        </div>
      )}
    </div>
  );
};

export default App;
