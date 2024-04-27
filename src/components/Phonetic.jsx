import { IconButton } from "@mui/material";
import {
  Search as SearchIcon,
  VolumeUp as AudioIcon,
} from "@mui/icons-material";
import React, { useRef } from "react";

const Phonetic = ({ phonetic }) => {
  const audioRef = useRef();
  return (
    <div className="flex gap-2 items-center">
      <IconButton onClick={() => audioRef.current?.play()}>
        <AudioIcon />
      </IconButton>
      <p>{phonetic?.text}</p>
      <audio src={phonetic?.audio} ref={audioRef} className="hidden" />
    </div>
  );
};

export default Phonetic;
