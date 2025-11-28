import React from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <div className="main-container min-w-screen min-h-screen bg-gradient-to-t from-green-900 to-black">
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  );
}

export default App;
