import React from "react";

const InputBox = ({ pdfUrl, setPdfUrl }) => {
  return (
    <div className="flex items-center my-3 gap-3">
      <label htmlFor="">Choose {pdfUrl && "another"} Pdf file :</label>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file.type == "application/pdf") {
            setPdfUrl(URL.createObjectURL(file));
            return;
          }
          alert("file must be pdf");
          return;
        }}
        className="my-3"
      />
    </div>
  );
};

export default InputBox;
