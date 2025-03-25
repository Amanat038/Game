import React, { useState } from "react";

const MatrixGame = () => {
   const size = 3;
   const totalBox = size * size;

   const [clickedBox, setClickedBox] = useState([]);
   const [boxColors, setBoxColors] = useState(Array(totalBox).fill("white"));
   const [showReset, setShowReset] = useState(false);

   const handleClick = (index) => {
      if (!clickedBox.includes(index)) {
         const newClickedBox = [...clickedBox, index];
         setClickedBox(newClickedBox);
         setBoxColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = "green";
            return newColors;
         });

         if (newClickedBox.length === totalBox) {
            changeToOrange(newClickedBox);
         }
      }
   };

   const changeToOrange = (clickedOrder) => {
      clickedOrder.forEach((boxIndex, i) => {
         setTimeout(() => {
            setBoxColors((prevColors) => {
               const newColors = [...prevColors];
               newColors[boxIndex] = "orange";
               return newColors;
            });

            if (i === clickedOrder.length - 1) {
               setTimeout(() => setShowReset(true), 500);
            }
         }, i * 500);
      });
   };

   const resetGame = () => {
      setClickedBox([]);
      setBoxColors(Array(totalBox).fill("white"));
      setShowReset(false);
   };
   return (
      <div style={{ textAlign: "center" }}>
         <div
            style={{
               display: "grid",
               gridTemplateColumns: `repeat(${size},100px)`,
               gap: "5px",
               margin: "20px auto",
            }}
         >
            {boxColors.map((color, index) => (
               <button
                  key={index}
                  onClick={() => handleClick(index)}
                  style={{
                     width: "100px",
                     height: "100px",
                     backgroundColor: color,
                     border: "1px solid black",
                     fontSize: "20px",
                     cursor: "pointer",
                  }}
               ></button>
            ))}
         </div>

         {showReset && (
            <button
               onClick={resetGame}
               style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
               }}
            >
               Reset Game
            </button>
         )}
      </div>
   );
};

export default MatrixGame;
