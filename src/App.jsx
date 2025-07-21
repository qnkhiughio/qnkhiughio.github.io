// import React, {useState, useEffect} from "react"
// // import { FlexItem, FlexLayout, Card, Text } from "@salt-ds/core"
// import Deck from "./components/Deck"
// import PHOTOS from "./data/photos.json"
// import "./App.css"

// function App() {
//   const [isPortrait, setIsPortrait] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(orientation: portrait)");
//     const handleOrientationChange = (e) => {
//       setIsPortrait(e.matches);
//     };

//     setIsPortrait(mediaQuery.matches); // Set initial state
//     mediaQuery.addEventListener('change', handleOrientationChange);

//     return () => {
//       mediaQuery.removeEventListener('change', handleOrientationChange);
//     };
//   }, []);

//   return (
//     <div className="App">
//       {isPortrait ? (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           backgroundColor: 'rgba(0,0,0,0.8)',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           zIndex: 9999,
//           padding: '2%'
//         }}>
//           <h2>Please Rotate Your Device</h2>
//           <p>For the best experience, please rotate your device to landscape mode.</p>
//           {/* You can add an icon or animation here */}
//         </div>
//       ) : (
//         <Deck cards={PHOTOS} />
//       )}
//     </div>
//   );
// }


// export default App

import React, { useState, useEffect } from "react";
import Deck from "./components/Deck";
import PHOTOS from "./data/photos.json";
import "./App.css";

function App() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");

    const handleOrientationChange = (e) => {
      setIsPortrait(e.matches);
    };

    setIsPortrait(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener("change", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    // Delay showing overlay until fade-in completes
    if (isPortrait) {
      setShowOverlay(true);
    } 
    else {
      // Give time for fade-out animation before unmounting
      const timeout = setTimeout(() => setShowOverlay(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isPortrait]);

  return (
    <div className="App">
      {showOverlay && (
        <div className={`rotate-overlay ${isPortrait ? "fade-in" : ""}`}>
          <h2>Please Rotate Your Device</h2>
          <p>For the best experience, please rotate your device to landscape mode.</p>
        </div>
      )}
      {!isPortrait && <Deck cards={PHOTOS} />}
    </div>
  );
}

export default App;
