import React from "react";
import YouTube from "react-youtube";

const Youtube = ({ videoKey, height }) => {
  return (
    <>
      <YouTube
        videoId={videoKey}
        opts={{
          height: height,
          width: `${window.innerWidth - 64}`,
          playerVars: { autoplay: 1 },
        }}
      />
    </>
  );
};

export default Youtube;
