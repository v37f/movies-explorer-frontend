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
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import SideMenu from "../SideMenu/SideMenu";
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useLocation, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getInitialMovies } from "../../utils/MoviesApi"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
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
          setFetchErrorMessage(errorMessage);
          console.log(errorMessage);
          setIsErrorPopupOpen(true);
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
    if(isErrorPopupOpen) { 
      document.addEventListener('keydown', closePopupsByEscape);
      return () => {
        document.removeEventListener('keydown', closePopupsByEscape);
      }
    }
  }, [isErrorPopupOpen]);

  function handleSearchClick() {
    getInitialMovies()
      .then((movies) => {
        setInitialMovies(movies);
        // console.log(movies)
      })
      .catch((error) => {
        console.log(`Ошибка: ${error.status}`);
        error.json().then((errorData) => {
          console.log(errorData.message);
        })
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
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
        setFetchErrorMessage(errorMessage);
        console.log(errorMessage);
        setIsErrorPopupOpen(true);
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
        error.json()
          .then((errorData) => {
            let errorMessage = errorData.message;
            if (errorData.validation) {
              errorMessage = errorData.validation.body.message;
            }
            setFetchErrorMessage(errorMessage);
            console.log(errorMessage);
            setIsErrorPopupOpen(true);
          })
        })
  }

  function signOut() {
    localStorage.removeItem("jwt");
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
      })
      .catch((error) => {
        error.json()
          .then((errorData) => {
            let errorMessage = errorData.message;
            if (errorData.validation) {
              errorMessage = errorData.validation.body.message;
            }
            setFetchErrorMessage(errorMessage);
            console.log(errorMessage);
            setIsErrorPopupOpen(true);
          })
        })
  }

  function closePopup() {
    setIsErrorPopupOpen(false)
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
              onSearchSubmit={handleSearchClick}
              initialMovies={initialMovies} />
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
        <ErrorPopup 
          isOpen={isErrorPopupOpen} 
          onClose={closePopup} 
          message={fetchErrorMessage} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
