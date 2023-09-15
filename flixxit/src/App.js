// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Pricing from "./components/Pricing/Pricing";
// import Footer from "./components/Footer/Footer";
// import Contact from "./components/Contact/Contact";
// import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
// import TermsOfUse from "./components/TermsofUse/TermsofUse";
// import LoginHeader from "./components/LoginNavbar/LoginHeader";
// import LoginHome from "./components/LoginHome/LoginHome";
// import Login from "./components/SignUp/Login";
// import SignupPage from "./components/SignUp/SignUp";
// import ViewAll from "./components/SeeAll/viewAll";
// import Genere from "./components/LoginHome/Genere/Genere";
// import SearchResult from "./components/LoginNavbar/SearchResult";
// import MovieDetailsPage from "./components/LoginHome/Genere/MovieDetailsPage";
// import GenreSearch from "./components/GenreSearch/GenreSearch";
// import Settings from "./components/Settings/Settings";

// const App = () => {
//   // Check if the user is authenticated (e.g., valid JWT token)
//   const isAuthenticated = !!localStorage.getItem("jwtToken");
//   console.log("isAuthenticated:", isAuthenticated);

//   return (
//     <Router>
//       <div className="app-container">
//         {isAuthenticated ? <LoginHeader /> : <Header />}
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/terms-of-use" element={<TermsOfUse />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/signin" element={<Login />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/viewall" element={<ViewAll />} />
//             <Route path="/home" element={<LoginHome />} />
//             <Route path="/genere" element={<Genere />} />

//             <Route path="/search-results" element={<SearchResult />} />

//             <Route path="/genre-search" element={<GenreSearch />} />
//             <Route
//               path="/movie-details/:movieId"
//               element={<MovieDetailsPage />}
//             />
//             {/* Add more routes as needed */}
//             {!isAuthenticated && (
//               <Route path="/unauthorized" element={<Navigate to="/signin" />} />
//             )}
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./components/TermsofUse/TermsofUse";
import LoginHeader from "./components/LoginNavbar/LoginHeader";
import LoginHome from "./components/LoginHome/LoginHome";
import Login from "./components/SignUp/Login";
import SignupPage from "./components/SignUp/SignUp";
import ViewAll from "./components/SeeAll/viewAll";
import Genere from "./components/LoginHome/Genere/Genere";
import SearchResult from "./components/LoginNavbar/SearchResult";
import MovieDetailsPage from "./components/LoginHome/Genere/MovieDetailsPage";
import GenreSearch from "./components/GenreSearch/GenreSearch";
import Settings from "./components/Settings/Settings";

const App = () => {
  // Check if the user is authenticated (e.g., valid JWT token)
  const isAuthenticated = !!localStorage.getItem("jwtToken");
  console.log("isAuthenticated:", isAuthenticated);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? <LoginHeader /> : <LoginHeader />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/search-results" element={<SearchResult />} />
            <Route path="/genre-search" element={<GenreSearch />} />
            <Route path="/home" element={<LoginHome />} />
            <Route path="/settings" element={<Settings />} />

            <Route
              path="/movie-details/:movieId"
              element={<MovieDetailsPage />}
            />
            <Route path="/viewall" element={<ViewAll />} />

            {!isAuthenticated && (
              <Route path="/unauthorized" element={<Navigate to="/signin" />} />
            )}
            {/* Private Routes */}
            {isAuthenticated && (
              <Route path="/settings" element={<Settings />} />
            )}
            {isAuthenticated && <Route path="/viewall" element={<ViewAll />} />}
            {isAuthenticated && <Route path="/home" element={<LoginHome />} />}
            {isAuthenticated && <Route path="/genere" element={<Genere />} />}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
