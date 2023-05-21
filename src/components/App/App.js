import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import InfoPopup from "../InfoPopup/InfoPopup";
import SideMenu from "../SideMenu/SideMenu";
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInitialMovies } from "../../utils/MoviesApi"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import { filterMovies } from '../../utils/Utils';

import successImagePath from '../../images/success.svg';
import failImagePath from '../../images/fail.svg';
import { UPDATE_SUCCESS_MESSAGE, KEYWORD_REQUIRED_MESSAGE, NOTHING_FOUND_MESSAGE, SOMETHING_WRONG_MESSAGE } from '../../utils/Constants';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem("foundMovies")) || []);
  const [noMoviesMessage, setNoMoviesMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [infoPopupData, setInfoPopupData] = useState({
    image: '',
    message: ''
  });
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProfileFormDisabled, setIsProfileFormDisabled] = useState(true);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 800px)');
  const isHeaderVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies" ||
                          pathname === "/profile";

  const isFooterVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies";


  //level-3
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        error.json().then((errorData) => {
          let errorMessage = errorData.message;
          if (errorData.validation) {
            errorMessage = errorData.validation.body.message;
          }
          setInfoPopupData({
            image: failImagePath,
            message: errorMessage
          });
          setIsInfoPopupOpen(true);
        })
      })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [isSmallScreen]);

  useEffect(() => {
    function closePopupsByEscape(evt) {
      if(evt.key === 'Escape') {
        closePopup();
      }
    }
    if(isInfoPopupOpen) { 
      document.addEventListener('keydown', closePopupsByEscape);
      return () => {
        document.removeEventListener('keydown', closePopupsByEscape);
      }
    }
  }, [isInfoPopupOpen]);

  function handleMoviesSearch(keyword, shortfilms) {
    if (!keyword) {
      setNoMoviesMessage(KEYWORD_REQUIRED_MESSAGE);
      return;
    } else {
      if (initialMovies.length === 0) {
        setIsLoading(true);
        getInitialMovies()
          .then((movies) => {
            setInitialMovies(movies);
            getSearchResult(movies, keyword, shortfilms);
            setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
          })
          .catch(() => {
            setNoMoviesMessage(SOMETHING_WRONG_MESSAGE);
          })
          .finally(() => {
            setIsLoading(false);
          })
      } else {
        getSearchResult(initialMovies, keyword, shortfilms);
        setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
      }
    }
  }

  function getSearchResult(movies, keyword, shortfilms) {
    const filteredMovies = filterMovies(movies, keyword, shortfilms);
    localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("keyword", keyword);
    localStorage.setItem("shortfilms", JSON.stringify(shortfilms));
    if(filteredMovies.length === 0) {
      setNoMoviesMessage(NOTHING_FOUND_MESSAGE);
    } else {
      setNoMoviesMessage('');
    }
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((error) => {
        error.json().then((errorData) => {
          let errorMessage = errorData.message;
          if (errorData.validation) {
            errorMessage = errorData.validation.body.message;
          }
          setInfoPopupData({
            image: failImagePath,
            message: errorMessage
          });
          setIsInfoPopupOpen(true);
        })
      })
    }
  }

  function handleRegister(email, password, name) {
    return mainApi.register(email, password, name)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((error) => {
      error.json().then((errorData) => {
        let errorMessage = errorData.message;
        if (errorData.validation) {
          errorMessage = errorData.validation.body.message;
        }
        setInfoPopupData({
          image: failImagePath,
          message: errorMessage
        });
        setIsInfoPopupOpen(true);
      })
    })
  }

  function handleLogin(email, password) {
    return mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          mainApi.setToken();
          setIsLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((error) => {
        error.json().then((errorData) => {
          let errorMessage = errorData.message;
          if (errorData.validation) {
            errorMessage = errorData.validation.body.message;
          }
          setInfoPopupData({
            image: failImagePath,
            message: errorMessage
          });
          setIsInfoPopupOpen(true);
        })
      })
  }

  function signOut() {
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser(null);
  }  

  function handleUpdateUserInfo(email, name) {
    return mainApi.updateUserInfo(email, name)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .then(() => {
        setIsProfileFormDisabled(true);
        setInfoPopupData({
          image: successImagePath,
          message: UPDATE_SUCCESS_MESSAGE
        });
      })
      .catch((error) => {
        error.json().then((errorData) => {
          let errorMessage = errorData.message;
          if (errorData.validation) {
            errorMessage = errorData.validation.body.message;
          }
          setInfoPopupData({
            image: failImagePath,
            message: errorMessage
          });
        })
      })
      .finally(()=> {
        setIsInfoPopupOpen(true);
      });
  }

  function closePopup() {
    setIsInfoPopupOpen(false)
  }

  function toggleSideMenu() {
    setIsSideMenuOpen(!isSideMenuOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} isSmallScreen={isSmallScreen} handleMenuClick={toggleSideMenu} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/movies" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              component={Movies}
              onSearchSubmit={handleMoviesSearch}
              movies={foundMovies}
              isLoading={isLoading}
              noMoviesMessage={noMoviesMessage} />
            } 
          />
          <Route 
            path="/saved-movies" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              component={SavedMovies} />
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              component={Profile}
              onSignOut={signOut}
              onUpdateUser={handleUpdateUserInfo}
              isFormDisabled={isProfileFormDisabled}
              setIsFormDisabled={setIsProfileFormDisabled} />
            } 
          />
          <Route path="/signup" element={<Register handleRegister={handleRegister} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isFooterVisible && <Footer />}
        <SideMenu isOpen={isSideMenuOpen} onCloseClick={toggleSideMenu}/>
        <InfoPopup 
          isOpen={isInfoPopupOpen} 
          onClose={closePopup} 
          data={infoPopupData} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
