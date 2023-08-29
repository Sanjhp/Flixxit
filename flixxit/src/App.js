import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import "./App.css";

const App = () => {
  return (
    // <Router>
    //   <Header />
    //   <Routes>
    //     {/* <Route path="/about" component={AboutComponent} /> */}
    //     <Route path="/pricing" component={Pricing} />
    //     <Route path="/" component={Home} />
    //   </Routes>
    // </Router>

    <Pricing />
  );
};

export default App;
