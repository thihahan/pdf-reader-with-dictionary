import React, { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

const TableOfContents = ({ pdfUrl }) => {
  const [tableOfContents, setTableOfContents] = useState([]);
  useEffect(() => {
    const extractTableOfContents = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const toc = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          textContent.items.forEach((item) => {
            const text = item.str.trim();
            const fontSize = Math.sqrt(
              item.transform[0] ** 2 + item.transform[1] ** 2
            ); // Calculate font size based on transform matrix
            if (fontSize > 20) {
              // Example threshold for large font size
              // Assume text item with large font size is a TOC entry
              toc.push({ title: text, pageNumber: i });
            }
          });
        }
        setTableOfContents(toc);
      } catch (e) {
        console.log("error : ", e);
      }
    };
    extractTableOfContents();
  }, [pdfUrl]);

  useEffect(() => {
    console.log("table of contents", tableOfContents);
  }, [tableOfContents]);
  return <div></div>;
};

export default TableOfContents;
