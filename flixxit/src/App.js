import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/about" component={AboutComponent} /> */}
        {/* <Route path="/pricing" component={PricingComponent} /> */}
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  );
};

export default App;
