import { IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";

import { v4 } from "uuid";
import Phonetic from "./components/Phonetic";
import { useSelectTextContext } from "./Providers/SelectTextProvider";
const Dictionary = ({ open, setOpen }) => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectText, setSelectText } = useSelectTextContext();
  const fetchMeaning = async () => {
    if (selectText) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${selectText}`
        );
        console.log("finsh fetch");
        setIsLoading(false);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setWords([...data, ...words]);
        } else {
          const error = await res.json();
          alert(error?.title);
        }
      } catch (e) {
        alert("500 Internal Server Error");
        console.log(e);
        setIsLoading(false);
      }
    }
  };
  return (
    <div
      className={`${
        !open ? "translate-x-full" : "translate-x-0"
      } transition-transform duration-500 w-[400px] mx-5 mt-10 fixed right-0 top-0 h-full bg-white shadow-lg p-5 overflow-y-auto`}
    >
      <Input
        type="text"
        value={selectText}
        placeholder="search word or select text in pdf"
        fullWidth
        onChange={(e) => setSelectText(e.target.value)}
        endAdornment={
          <IconButton onClick={() => !isLoading && fetchMeaning()}>
            <SearchIcon />
          </IconButton>
        }
      />
      {isLoading && <p className="my-2 text-lg">Loading ...</p>}
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
                      return (
                        <>
                          <p className="my-1">- {def.definition}</p>
                        </>
                      );
                    })}
                    {meaning?.synonyms?.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center my-2">
                        <span className="text-lg font-bold">synonyms :</span>
                        {meaning.synonyms?.map((syn) => (
                          <span className="text-sm border p-1 px-2 rounded-full">
                            {syn}
                          </span>
                        ))}
                      </div>
                    )}
                    {meaning?.antonyms?.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-2 items-center">
                        <span className="text-lg font-bold">antonyms :</span>
                        {meaning.antonyms?.map((syn) => (
                          <span className="text-sm border p-1 px-2 rounded-full">
                            {syn}
                          </span>
                        ))}
                      </div>
                    )}
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
