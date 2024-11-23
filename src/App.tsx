import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import FirstNavbar from "./components/FirstNavbar";
import SecondNavbar from "./components/SecondNavbar";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <div className="dark:bg-[hsl(var(--background))] absolute z-[1] w-full min-h-full h-auto">
      <Layout>
        <FirstNavbar />
        <SecondNavbar />
        <Routes>
          <Route path="/app/*" element={<MainPage />} />
          <Route path="/" element={<Navigate to="/app/home" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
