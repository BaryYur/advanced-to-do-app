import React from "react";

import {Routes, Route, Navigate} from "react-router-dom";

import HomePage from "./HomePage";
import TodayPage from "./TodayPage";
import ToDoPage from "./ToDoPage";
import CompletedPage from "./CompletedPage";

const MainPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/today" element={<TodayPage />} />
      <Route path="/completed" element={<CompletedPage />} />
      <Route path="/:todo" element={<ToDoPage />} />
    </Routes>
  );
}

export default MainPage;