import React from "react";

// import { UserButton } from "@clerk/clerk-react";

import { ModeToggle } from "./ModeToggle";

const Layout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between p-[10px] bg-[whitesmoke] min-h-screen dark:bg-[#232529]">
      <div className="fixed right-[10px] z-[4] top-[10px] flex items-center gap-2">
        <ModeToggle />
        {/*<div>*/}
        {/*  <UserButton />*/}
        {/*</div>*/}
      </div>
      {children}
    </div>
  );
}

export default Layout;