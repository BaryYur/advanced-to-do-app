import React, { useState } from "react";

import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";

const SecondNavbar = () => {
  const [activeNavbar, setActiveNavbar] = useState(false);

  return (
    <div className="second-navbar">
      <div>
        {!activeNavbar && <Button
          variant="secondary"
          className="z-[4] fixed"
          onClick={() => setActiveNavbar(active => !active)}
        >
          <AlignLeft size={19} />
        </Button>}
      </div>
      {activeNavbar && <div
        className="w-full h-full z-[5] absolute left-0 top-0"
        onClick={() => setActiveNavbar(false)}
      />}
      <Navbar isActive={activeNavbar} closeNavbar={() => setActiveNavbar(false)} />
    </div>
  );
}

export default SecondNavbar;