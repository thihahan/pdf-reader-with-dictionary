import React, { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TableOfContents from "./TableOfContents";
import Dictionary from "./Dictionary";
import Header from "./components/Header";
import InputBox from "./components/InputBox";
import Menu from "./components/Menu";
import { Drawer } from "@mui/material";
import Sidebar from "./components/Sidebar";
import {
  Flexboard,
  FlexboardProvider,
  FlexboardFrame,
  ResizerType,
  Position,
} from "@dorbus/flexboard";

const App = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [menuPageNum, setMenuPageNum] = useState(1);
  const [selectText, setSelectText] = useState("");
  const [scale, setScale] = useState(1);
  const [openDict, setOpenDict] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  const viewerRef = useRef();
  const [isTocShow, setIsTocShow] = useState(false);
  const previousVisibleStartIndex = useRef(-1);
  const listRef = useRef();
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageJump = (pgNum) => {
    const pgIndex = pgNum - 1;
    if (pgNum > 0 && pgNum < numPages) {
      listRef.current.scrollToItem(pgIndex, "start");
      setMenuPageNum(pgNum);
    }
  };

  useEffect(() => {}, []);
  const renderPage = useCallback(
    ({ index, style }) => {
      return (
        <div style={style} className="">
          <Page
            pageNumber={index + 1}
            className={`page_${index + 1}`}
            scale={scale}
          />
          <hr className="my-1" />
        </div>
      );
    },
    [scale]
  );

  const onItemsRendered = useCallback(({ visibleStartIndex }) => {
    if (previousVisibleStartIndex.current !== visibleStartIndex) {
      previousVisibleStartIndex.current = visibleStartIndex;
      setMenuPageNum(visibleStartIndex + 1);
    }
  }, []);

  return (
    <div className="mb-10 mt-20">
      <Menu
        pageNumber={menuPageNum}
        numPages={numPages}
        pdfUrl={pdfUrl}
        setPageNumber={setMenuPageNum}
        scale={scale}
        setScale={setScale}
        openDict={openDict}
        setOpenDict={setOpenDict}
        isTocShow={isTocShow}
        setIsTocShow={setIsTocShow}
        handlePageJump={handlePageJump}
      />

      {pdfUrl && (
        <FlexboardProvider>
          <Flexboard
            direction={Position.left}
            draggable={true}
            width={400}
            minWidth={200}
            maxWidth={300}
            resizerStyle={{ backgroundColor: "gray" }}
            resizerType={ResizerType.gutterlane}
          >
            <div>
              {" "}
              <TableOfContents
                handlePageJump={handlePageJump}
                pdfUrl={pdfUrl}
              />
            </div>
          </Flexboard>
          <FlexboardFrame>
            <div ref={viewerRef} className="overflow-y-scroll">
              <Document
                onItemClick={(props) => {
                  const pgNum = props.pageNumber;
                  if (pgNum) {
                    listRef.current.scrollToItem(pgNum - 1, "start");
                  }
                  console.log(props.pageNumber);
                }}
                onLoadSuccess={onDocumentLoadSuccess}
                file={pdfUrl}
                className={""}
              >
                {numPages && (
                  <List
                    ref={listRef}
                    width={"100%"}
                    height={viewerRef.current.clientWidth || 500}
                    itemCount={numPages}
                    estimatedItemSize={numPages}
                    onItemsRendered={onItemsRendered}
                    itemSize={() =>
                      scale * (viewerRef?.current.clientHeight || 500)
                    }
                    className="overflow-x-scroll overflow-y-hidden"
                  >
                    {renderPage}
                  </List>
                )}
              </Document>
              <Dictionary
                open={openDict}
                selectText={selectText}
                setSelectText={setSelectText}
                setOpen={setOpenDict}
              />
            </div>
          </FlexboardFrame>
        </FlexboardProvider>
        //<div className="container">
        //   <Sidebar />
        //   <div className="frame">
        //
        //   </div>
        //
        // </div>
      )}
      <div className="mx-10">
        <InputBox pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} />
      </div>
      <Header />
    </div>
  );
};

export default App;
