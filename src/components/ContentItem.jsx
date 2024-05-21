import React, { useState } from "react";
import {
  KeyboardArrowRight as RightIcon,
  KeyboardArrowDown as DownIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
const ContentItem = ({ content, padding, handlePageJump }) => {
  const [showItems, setShowItems] = useState(false);
  return (
    <ul className={`list-disc`} style={{ paddingLeft: padding }}>
      <div className="flex items-center border-b hover:bg-gray-100 cursor-pointer rounded">
        {content.items.length > 0 && !showItems && (
          <IconButton onClick={() => setShowItems(true)}>
            <RightIcon />
          </IconButton>
        )}
        {showItems && (
          <IconButton className="z-[1000]" onClick={() => setShowItems(false)}>
            <DownIcon />
          </IconButton>
        )}
        <p
          onClick={() => {
            console.log(content);
            handlePageJump(content.pgNum);
          }}
          className="flex-grow-1 w-full px-3 py-1"
        >
          {content.title}
        </p>
      </div>
      {content.items.length > 0 &&
        showItems &&
        content.items.map((item) => {
          return (
            <ContentItem
              content={item}
              handlePageJump={handlePageJump}
              padding={padding + 3}
            />
          );
        })}
    </ul>
  );
};

export default ContentItem;
