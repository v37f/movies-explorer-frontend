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
import { useCallback, useEffect, useState } from "react";
import { getInitialMovies } from "../../utils/MoviesApi"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from '../../utils/MainApi';
import { filterMovies, setSavedParams, formatMovieForSave, toggleScroll } from '../../utils/Utils';

import successImagePath from '../../images/success.svg';
import failImagePath from '../../images/fail.svg';
import { 
  MOVIES_BASE_URL, 
  UPDATE_SUCCESS_MESSAGE, 
  NOTHING_FOUND_MESSAGE,
  NOTHING_SAVED_MESSAGE, 
  SOMETHING_WRONG_MESSAGE,
  SMALL_SCREEN_DEFAULT_MOVIES_AMOUNT,
  MEDIUM_SCREEN_DEFAULT_MOVIES_AMOUNT,
  BIG_SCREEN_DEFAULT_MOVIES_AMOUNT,
  MEDIUM_SCREEN_MORE_BUTTON_VALUE,
  BIG_SCREEN_MORE_BUTTON_VALUE,
  UNAUTHORIZED_ERROR_STATUS
} from '../../utils/Constants';

function App() {
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem("foundMovies")) || []);
  const [foundSavedMovies, setFoundSavedMovies] = useState(savedMovies);
  //
  const isSmallScreen = useMediaQuery('(max-width: 480px)');
  const isMediumScreen = useMediaQuery('(min-width: 481px)  and (max-width: 1217px)');
  const isBigScreen = useMediaQuery('(min-width: 1218px)');
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [displayedMoviesAmount, setDisplayedMoviesAmount] = useState(0);
  const [currentDisplayedMovies, setCurrentDisplayedMovies] = useState([]);
  const [moreValue, setMoreValue] = useState(0);
  //
  const [noMoviesMessage, setNoMoviesMessage] = useState('');
  const [noSavedMoviesMessage, setNoSavedMoviesMessage] = useState('');
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
  const switchToBurger = useMediaQuery('(max-width: 800px)');
  const isHeaderVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies" ||
                          pathname === "/profile";

  const isFooterVisible = pathname === "/" ||
                          pathname === "/movies" ||
                          pathname === "/saved-movies";

  useEffect(() => {
    checkToken();
  }, []);

  function getAllUserData() {
    return Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(result => {
        setCurrentUser(result[0]);
        setSavedMovies(result[1]);
        setFoundSavedMovies(result[1]);
      })
  }

  useEffect(() => {
    const filteredMoviesWithSavedParams = setSavedParams(filteredMovies, savedMovies);
    setFoundMovies(filteredMoviesWithSavedParams);
  }, [filteredMovies, savedMovies]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setNoSavedMoviesMessage(NOTHING_SAVED_MESSAGE);
    } else if (foundSavedMovies.length === 0) {
      setNoSavedMoviesMessage(NOTHING_FOUND_MESSAGE);
    }
  }, [foundSavedMovies, savedMovies])

  useEffect(() => {
    setNoMoviesMessage('');
    if (foundMovies.length === 0 && localStorage.getItem("keyword")) {
      setNoMoviesMessage(NOTHING_FOUND_MESSAGE);
    }
  }, [foundMovies])

  const setDefaultDisplayedMoviesAmount = useCallback(() => {
    if (isSmallScreen) {
      setDisplayedMoviesAmount(SMALL_SCREEN_DEFAULT_MOVIES_AMOUNT);
    } else if (isMediumScreen) {
      setDisplayedMoviesAmount(MEDIUM_SCREEN_DEFAULT_MOVIES_AMOUNT);
    } else if (isBigScreen) {
      setDisplayedMoviesAmount(BIG_SCREEN_DEFAULT_MOVIES_AMOUNT);
    }
  }, [isSmallScreen, isMediumScreen, isBigScreen])
  
  // проверяем разрешение экрана и устаналиваем дефолтное количество отображаемых фильмов и количество добавляемое при нажатии кнопки "еще"
  useEffect(() => {
    if (isSmallScreen) {
      // данная проверка нужна чтобы не сбрасывать количество отображаемых фильмов на дефолтное значение для случая
      // когда пользователь уже нажал кнопку "еще" а потом произошло изменение разрешения, например при смене ориентации устройства
      // с горизонтального на вертикальное 
      if (currentDisplayedMovies.length < SMALL_SCREEN_DEFAULT_MOVIES_AMOUNT) {
        setDefaultDisplayedMoviesAmount();
      }
      setMoreValue(MEDIUM_SCREEN_MORE_BUTTON_VALUE);
    } else if (isMediumScreen) {
      if (currentDisplayedMovies.length < MEDIUM_SCREEN_DEFAULT_MOVIES_AMOUNT) {
        setDefaultDisplayedMoviesAmount();
      }
      setMoreValue(MEDIUM_SCREEN_MORE_BUTTON_VALUE);
    } else if (isBigScreen) {
      if (currentDisplayedMovies.length < BIG_SCREEN_DEFAULT_MOVIES_AMOUNT) {
        setDefaultDisplayedMoviesAmount();
      }
      setMoreValue(BIG_SCREEN_MORE_BUTTON_VALUE);
    }
  }, [isSmallScreen, isMediumScreen, isBigScreen, currentDisplayedMovies, setDefaultDisplayedMoviesAmount]);

  useEffect(() => {
    setCurrentDisplayedMovies(foundMovies.slice(0, displayedMoviesAmount));
    if (foundMovies.length > displayedMoviesAmount) {
      setIsMoreButtonVisible(true);
    } else {
      setIsMoreButtonVisible(false);
    }
  }, [displayedMoviesAmount, foundMovies]);

  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [switchToBurger]);

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


  function handleMoreClick() {
    setDisplayedMoviesAmount(displayedMoviesAmount + moreValue);
  }

  function handleSaveMovie(movie) {
    return mainApi.saveMovie(formatMovieForSave(movie, MOVIES_BASE_URL))
      .then(newMovie => {
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch((error) => {
        handleRequestError(error);
      })
  }

  function handleDeleteMovie(movie) {
    return mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter(m => m._id !==movie._id));
        setFoundSavedMovies((movies) => movies.filter(m => m._id !==movie._id));
      })
      .catch((error) => {
        handleRequestError(error);
      })
  }

  function handleMoviesSearchSubmit(keyword, shortfilms) {
    if (initialMovies.length === 0) {
      setIsLoading(true);
      getInitialMovies()
        .then((movies) => {
          setInitialMovies(movies);
          getSearchResult(movies, keyword, shortfilms);
        })
        .catch(() => {
          setNoMoviesMessage(SOMETHING_WRONG_MESSAGE);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      getSearchResult(initialMovies, keyword, shortfilms);
    }
  }

  function handleSavedMoviesSearchSubmit(keyword, shortfilms) {
    const filteredSavedMovies = filterMovies(savedMovies, keyword, shortfilms);
    setFoundSavedMovies(filteredSavedMovies);
    if(filteredSavedMovies.length === 0 && savedMovies.length !== 0) {
      setNoSavedMoviesMessage(NOTHING_FOUND_MESSAGE);
    }
  }

  function getSearchResult(movies, keyword, shortfilms) {
    // фильтруем фильмы по ключевому слову и чекбоксу и записываем их в стейт filteredMovies
    // при изменения стейта filteredMovies срабатывает useEffect и в стейт foundMovies 
    // записваются фильмы из filteredMovies но уже с добавленным флагом isSaved и _id.
    // сохраняем стейт foundMovies в localStorage
    setFilteredMovies(filterMovies(movies, keyword, shortfilms));
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
    localStorage.setItem("keyword", keyword);
    localStorage.setItem("shortfilms", JSON.stringify(shortfilms));
    setDefaultDisplayedMoviesAmount();
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getAllUserData()
        .then(() => {
          navigate(pathname === "/signin" || pathname === "/signup" ? "/movies" : pathname, { replace: true });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          if (error.status === UNAUTHORIZED_ERROR_STATUS) {
            signOut();
          };
          handleRequestError(error);
        })
    }
  }

  function handleRequestError(error) {
    if ("json" in error) {
      error.json().then((errorData) => {
        let errorMessage = errorData.message;
        if (errorData.validation) {
          errorMessage = errorData.validation.body.message;
        }
        if (error.status === UNAUTHORIZED_ERROR_STATUS) {
          console.log(errorMessage);
        }
        setInfoPopupData({
          image: failImagePath,
          message: errorMessage
        });
      })
    } else {
      setInfoPopupData({
        image: failImagePath,
        message: SOMETHING_WRONG_MESSAGE
      });
      console.log(error)
    }
    if (error.status !== UNAUTHORIZED_ERROR_STATUS) {
      setIsInfoPopupOpen(true);
    }
  }

  function handleRegister(email, password, name) {
    setIsLoading(true);
    return mainApi.register(email, password, name)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((error) => {
      handleRequestError(error);
    })
    .finally(()=> {
      setIsLoading(false);
    });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    return mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          mainApi.setToken();
          setIsLoggedIn(true);
          getAllUserData()
            .then(() => {
              navigate("/movies");
            })
            .catch((error) => {
              handleRequestError(error);
            })
        }
      })
      .catch((error) => {
        handleRequestError(error);
      })
      .finally(()=> {
        setIsLoading(false);
      });
  }

  function signOut() {
    localStorage.clear();
    navigate("/");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFoundMovies([]);
    setFilteredMovies([]);
    setSavedMovies([]);
    setFoundSavedMovies([]);
    setInitialMovies([]);
    setNoMoviesMessage('');
  }  

  function handleUpdateUserInfo(email, name) {
    setIsLoading(true);
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
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  }

  function handleBackClick() {
    navigate(-1);
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
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} switchToBurger={switchToBurger} handleMenuClick={toggleSideMenu} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/movies" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              component={Movies}
              onSearchSubmit={handleMoviesSearchSubmit}
              movies={currentDisplayedMovies}
              isLoading={isLoading}
              noMoviesMessage={noMoviesMessage} 
              onSaveClick={handleSaveMovie}
              onDeleteClick={handleDeleteMovie}
              isMoreButtonVisible={isMoreButtonVisible}
              onMoreButtonClick={handleMoreClick}
              />
            } 
          />
          <Route 
            path="/saved-movies" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              movies={foundSavedMovies}
              component={SavedMovies}
              noSavedMoviesMessage={noSavedMoviesMessage} 
              onSearchSubmit={handleSavedMoviesSearchSubmit}
              onDeleteClick={handleDeleteMovie}/>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute 
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              component={Profile}
              onSignOut={signOut}
              onUpdateUser={handleUpdateUserInfo}
              isFormDisabled={isProfileFormDisabled}
              setIsFormDisabled={setIsProfileFormDisabled} />
            } 
          />
          <Route path="/signup" element={<Register handleRegister={handleRegister} isLoading={isLoading} />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} isLoading={isLoading} />} />
          <Route path="*" element={<NotFoundPage onBackClick={handleBackClick} />} />
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
