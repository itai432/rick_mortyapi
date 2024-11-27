import React from "react";
import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchContext";

const App: React.FC = () => {
  return (
    <SearchProvider>
      <div className="app">
        <Home />
      </div>
    </SearchProvider>
  );
};

export default App;
