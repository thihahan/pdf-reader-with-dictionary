import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import ContentItem from "./components/ContentItem";

const TableOfContents = ({ pdfUrl, handlePageJump }) => {
  const [tableOfContents, setTableOfContents] = useState([]);
  useEffect(() => {
    const extractTableOfContents = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const toc = [];
        await pdf.getOutline().then((outline) => {
          if (outline) {
            outline.forEach((item) => {
              toc.push(item);
              // You can recursively print sub-items if needed
            });
          } else {
            console.log("No outline found");
          }
        });

        async function modifyItem(item) {
          const pgIndex = await pdf.getPageIndex(item.dest[0]);
          return { ...item, pgNum: pgIndex + 1 };
        }

        async function modifyItems(items) {
          const result = await Promise.all(
            items.map(async (item) => {
              let items = [];
              if (item.items.length > 0) {
                items = await modifyItems(item.items);
              }
              const data = await modifyItem(item);
              return { ...data, items };
            })
          );
          return result;
        }
        const result = await modifyItems(toc);
        setTableOfContents(result);
      } catch (e) {
        console.log("error : ", e);
      }
    };
    extractTableOfContents();
  }, [pdfUrl]);

  useEffect(() => {
    console.log("table of contents", tableOfContents);
  }, [tableOfContents]);

  return (
    <div className={`px-3 h-dvh overflow-y-scroll`}>
      {tableOfContents &&
        tableOfContents.map((content) => {
          return (
            <ContentItem
              handlePageJump={handlePageJump}
              content={content}
              padding={2}
            />
          );
        })}
    </div>
  );
};

export default TableOfContents;
