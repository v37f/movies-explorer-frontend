import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import SideMenu from "../SideMenu/SideMenu";
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useLocation, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  const isHeaderVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies" ||
                          pathname === "/profile";

  const isFooterVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies";
                          
  useEffect(() => {
    if (pathname==="/") {
      setIsLoggedIn(false);
      return;
    }
    return setIsLoggedIn(true);
  }, [pathname]);

  function closePopup() {
    setIsErrorPopupOpen(false)
  }

  function toggleSideMenu() {
    setIsSideMenuOpen(!isSideMenuOpen);
  }

  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [isSmallScreen]);

  useEffect(() => {
    function closePopupsByEscape(evt) {
      if(evt.key === 'Escape') {
        closePopup();
      }
    }
    if(isErrorPopupOpen) { 
      document.addEventListener('keydown', closePopupsByEscape);
      return () => {
        document.removeEventListener('keydown', closePopupsByEscape);
      }
    }
  }, [isErrorPopupOpen]);

  return (
    <div className="App">
      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} isSmallScreen={isSmallScreen} handleMenuClick={toggleSideMenu} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isFooterVisible && <Footer />}
      <SideMenu isOpen={isSideMenuOpen} onCloseClick={toggleSideMenu}/>
      <ErrorPopup 
        isOpen={isErrorPopupOpen} 
        onClose={closePopup} 
        message="При авторизации произошла ошибка. Токен не передан или передан не в том формате." 
      />
    </div>
  );
}

export default App;
