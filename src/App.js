import { useRef } from "react";
import "./App.css";

const visible = {
  opacity: 1,
  pointerEvents: "auto",
};

const hidden = {
  opacity: 0,
  pointerEvents: "none",
};

const getCenter = (rect) => {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const getFlipProperties = ({ firstRect, lastRect }) => {
  const firstCenter = getCenter(firstRect);
  const lastCenter = getCenter(lastRect);

  const deltaX = firstCenter.x - lastCenter.x;
  const deltaY = firstCenter.y - lastCenter.y;
  const scale = firstRect.width / lastRect.width;

  return {
    transforms: [
      {
        transform: `translateX(${deltaX}px) translateY(${deltaY}px) scale(${scale})`,
      },
      {
        transform: `translateX(0) translateY(0) scale(1)`,
      },
    ],
    options: {
      duration: 1000,
      easing: "cubic-bezier(0.2, 0, 0.2, 1)",
    },
  };
};

function App() {
  const smallBlueRef = useRef(null);
  const largeRedRef = useRef(null);

  const handleClick = (firstRef, finalRef) => {
    if (!firstRef || !finalRef) return;

    const { transforms, options } = getFlipProperties({
      firstRect: firstRef.getBoundingClientRect(),
      lastRect: finalRef.getBoundingClientRect(),
    });

    Object.assign(firstRef.style, hidden);
    Object.assign(finalRef.style, visible);

    finalRef.animate(transforms, options);
  };

  const handleClickBlue = () => {
    return handleClick(smallBlueRef.current, largeRedRef.current);
  };

  const handleClickRed = () => {
    return handleClick(largeRedRef.current, smallBlueRef.current);
  };

  return (
    <div className="app">
      <div className="container">
        <div
          style={visible}
          ref={smallBlueRef}
          onClick={handleClickBlue}
          className="square small-blue"
        />
        <div
          style={hidden}
          ref={largeRedRef}
          onClick={handleClickRed}
          className="square large-red"
        />
      </div>
    </div>
  );
}

export default App;
