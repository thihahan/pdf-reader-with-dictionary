import { IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

import { v4 } from "uuid";
import Phonetic from "./components/Phonetic";
const Dictionary = ({ open, setOpen, selectText, setSelectText }) => {
  const [words, setWords] = useState([]);

  const fetchMeaning = async () => {
    if (selectText) {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectText}`
      );
      if (res.ok) {
        const data = await res.json();
        setWords([...data, ...words]);
        return;
      }
      const error = await res.json();
      alert(error?.title);
    }
  };
  return (
    <div
      className={`${
        !open && "hidden"
      } transition-all duration-500 w-[400px] mx-5 mt-10`}
    >
      <Input
        type="text"
        value={selectText}
        fullWidth
        onChange={(e) => setSelectText(e.target.value)}
        endAdornment={
          <IconButton onClick={() => fetchMeaning()}>
            <SearchIcon />
          </IconButton>
        }
      />
      {words.map((word) => {
        return (
          <div className="my-2">
            <h3 className="text-2xl">{word?.word}</h3>
            {word?.phonetics &&
              word?.phonetics?.map((phonetic) => (
                <Phonetic phonetic={phonetic} key={v4()} />
              ))}
            <div>
              {word?.meanings?.map((meaning) => {
                return (
                  <>
                    <h3 className="text-xl">
                      part of speech - {meaning?.partOfSpeech.toUpperCase()}
                    </h3>
                    {meaning?.definitions?.map((def) => {
                      return <p className="my-1">- {def.definition}</p>;
                    })}
                  </>
                );
              })}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Dictionary;