import React, { useEffect, useState } from "react";

function App() {
  const [isOutside, setIsOutside] = useState(false);
  let navRef = React.createRef<any>();

  const handleClickOutside = (e: any) => {
    if (!navRef.current.contains(e.target)) {
      setIsOutside(true);
    }
  };
  const handleClickInside = () => {
    setIsOutside(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    // <div style={{ width: "100%", height: "100%", background: "#f0f" }}>
    //   <nav
    //     style={{
    //       width: "50%",
    //       height: "min-content",
    //       background: "#000",
    //       color: "#fff",
    //       border: "3px solid #fff",
    //     }}
    //   >
    //     <li ref={navRef} onClick={handleClickInside} style={{ color: "#8ff" }}>
    //       <span>{isOutside ? "open" : "close"}</span>
    //     </li>
    //     <li>
    //       <span>this is a link</span>
    //     </li>
    //     <li>
    //       <span>this is a link</span>
    //     </li>
    //     <li>
    //       <span>this is a link</span>
    //     </li>
    //     <li>
    //       <span>this is a link</span>
    //     </li>
    //   </nav>
    // </div>
    <button ref={navRef} onClick={handleClickInside} style={{ color: "#8ff" }}>
      {isOutside ? "open" : "close"}{" "}
    </button>
  );
}

export default App;
