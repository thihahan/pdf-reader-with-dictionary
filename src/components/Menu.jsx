import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Subject as DictionaryIcon,
  BorderAll as TOCIcon,
  Remove as MinusIcon,
  Add as PlusIcon,
} from "@mui/icons-material";

const Menu = ({
  pdfUrl,
  pageNumber,
  setPageNumber,
  scale,
  setScale,
  numPages,
  openDict,
  setOpenDict,
  isTocShow,
  setIsTocShow,
  handlePageJump,
}) => {
  const [temp, setTemp] = useState(pageNumber);
  useEffect(() => {
    setTemp(pageNumber);
  }, [pageNumber]);
  return (
    <div className="fixed top-0 border-b px-4 py-2 mb-3 bg-gray-200 w-full z-[1000]">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          {pdfUrl && (
            <>
              <IconButton onClick={() => setIsTocShow(!isTocShow)}>
                <TOCIcon />
              </IconButton>
              <div className="flex border border-r-gray-700 px-3">
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      if (Number(temp) && temp > 0 && temp < numPages) {
                        handlePageJump(Number(temp));
                      } else {
                        setTemp(pageNumber);
                      }
                    }
                  }}
                  className="border-r text-center w-14 p-2 focus:outline-none"
                />
                <p className="p-2">of {numPages}</p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex border items-center gap-2">
                  <IconButton onClick={() => setScale(scale - 0.1)}>
                    <MinusIcon />
                  </IconButton>
                  <span>Scale: {Math.round(scale * 100)}%</span>
                  <IconButton onClick={() => setScale(scale + 0.1)}>
                    <PlusIcon />
                  </IconButton>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <p>Dictionary</p>
          <IconButton onClick={() => setOpenDict(!openDict)}>
            <DictionaryIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Menu;
