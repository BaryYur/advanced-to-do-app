import React from "react";

import { useTheme } from "./components/ThemeProvider";

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import FirstNavbar from "./components/FirstNavbar";
import SecondNavbar from "./components/SecondNavbar";
import MainPage from "./pages/MainPage";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const App = () => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <SignedIn>
        <div className="dark:bg-[hsl(var(--background))] absolute z-[1] w-full min-h-full h-auto`">
          <Layout>
            <FirstNavbar />
            <SecondNavbar />
            <Routes>
              <Route path="/app/*" element={<MainPage />} />
              <Route path="/" element={<Navigate to="/app/home" replace />} />
            </Routes>
          </Layout>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
