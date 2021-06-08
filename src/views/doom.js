import React, { useRef, useEffect } from "react";
require("js-dos");

const Dos = window.Dos;

const AhaDOOM = () => {

  const container = useRef(null);
  let DOOMInstance = null

  useEffect(() => {
    const anchor = document.createElement("a");
    anchor.href = "/extensions/pages/doliveirakn/doom/doom";
    anchor.className = "top-nag__logo brand bright"
    const image = document.createElement("img")
    image.src = "https://i2.wp.com/www.semperludo.com/wp-content/uploads/2016/05/Header-Doom-PS4.jpg";
    image.style = "height: 41px;";
    anchor.appendChild(image)
    document.getElementsByClassName("top-nav__logo")[0].replaceWith(anchor)


    Dos(container.current, {
      wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
      log: (message) => { /**/ },
      onerror: (message) => { /**/ },
      onprogress: (stage, total, loaded) => {
        console.log(stage, loaded * 100 / total + "%");
      },
      autolock: true,
    }).ready( (fs, main) => {
      fs.extract("https://js-dos.com/cdn/upload/DOOM-@evilution.zip").then(() => {
        main(["-c", "cd DOOM", "-c", "DOOM.EXE"]).then( (ci) => {
          DOOMInstance = ci;
        })
      })
    });
    return () => {
      DOOMInstance.exit();
    }
  });

  const enterFullScreen = () => {
    console.log("trying to enter full screen mode")
    DOOMInstance.fullscreen();
  }

  // Width/height properties on the canvas for game resolution
  // CSS styles height/width, is for actual game size
  return (
    <div>
      <h2> Controls</h2>
      <ul className="controls">
        <li> Move: UP, DOWN, LEFT, RIGHT</li>
        <li> Use: W</li>
        <li> Fire: S</li>
        <li> Speed on: SPACE</li>
        <li> Strafe on: ALT</li>
        <li> Strafe: A, D</li>
      </ul>
      <div className="wrapper">
        <canvas width="640" height="320" ref={container}></canvas>
        <button onClick={enterFullScreen}>Fullscreen</button>
      </div>
    </div>

  )
}


const Styles = () => {
  return (
    <style>
      {`
        header {
          background-image: url(http://www.esreality.com/files/inlineimages/2016/107724-doom_header.png);
          background-repeat: no-repeat;
          background-size: contain;
          width: 100%;
          height: 200px;
        }
        .controls {
          position: absolute;
        }
        .wrapper {
          position: relative;
          z-index: 100000;
          width: 50%;
          margin: auto;
          height: 50%;
        }
        canvas {
          width: 100%;
          height: 100%;
        }
        button {
          position: absolute;
          right: 1em;
          top: 1em;
        }
      `}
    </style>
  );
};

aha.on("doom", ({ fields, onUnmounted }, { identifier, settings }) => {

  return (
    <>
      <Styles />
      <AhaDOOM></AhaDOOM>
    </>
  );
});
