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
  const [viewerSize, setViewerSize] = useState({ width: 500, height: 500 });
  const viewerRef = useRef();
  const [isTocShow, setIsTocShow] = useState(false);
  const previousVisibleStartIndex = useRef(-1);
  const listRef = useRef();
  const [pageHeight, setPageHeight] = useState(0);
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

  useEffect(() => {
    const loadPdf = async () => {
      const newPdf = await pdfjs.getDocument(pdfUrl).promise;
      const page = await newPdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      console.log("height : ", viewport.height);
      setPageHeight(viewport.height);
    };
    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (listRef.current) {
      const temp = menuPageNum;
      listRef.current.resetAfterIndex(0, true);
      handlePageJump(temp);
    }
  }, [scale]);

  return (
    <div className={`mb-10 ${pdfUrl && "mt-20"}`}>
      {pdfUrl && (
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
      )}

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
                className={"h-full"}
              >
                {numPages && pageHeight > 0 && (
                  <List
                    ref={listRef}
                    width={"100%"}
                    height={pageHeight}
                    itemCount={numPages}
                    estimatedItemSize={numPages}
                    onItemsRendered={onItemsRendered}
                    itemSize={() => scale * pageHeight}
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
