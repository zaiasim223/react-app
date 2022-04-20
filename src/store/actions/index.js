import { login, logout } from "./auth";
import { getUserInfo, setUserToken, setUserInfo, resetUser } from "./user";
import { addUser, getUsersList, editUser, deleteUser } from "./users";
import { addSong, getSongsList, editSong, deleteSong } from "./songs";
import { addReward, getRewardsList, editReward, deleteReward } from "./rewards";
import { addMovie, getMoviesList, editMovie, deleteMovie } from "./movies";
import { addBook, getBooksList, editBook, deleteBook } from "./books";
import { addQuote, getQuotesList, editQuote, deleteQuote } from "./quotes";
import { addNews, getNewsList, editNews, deleteNews } from "./news";
import { toggleSiderBar, toggleSettingPanel } from "./app";
import { changeSetting } from "./settings";
import { addTag, emptyTaglist, deleteTag, closeOtherTags } from "./tagsView";
import { addBug } from "./monitor";

export {
  login,
  logout,
  getUserInfo,
  setUserToken,
  setUserInfo,
  resetUser,
  toggleSiderBar,
  toggleSettingPanel,
  changeSetting,
  addTag,
  emptyTaglist,
  deleteTag,
  closeOtherTags,
  addBug,

  addUser,
  getUsersList,
  editUser,
  deleteUser,

  addSong,
  getSongsList,
  editSong,
  deleteSong,

  addQuote,
  getQuotesList,
  editQuote,
  deleteQuote,

  addBook,
  getBooksList,
  editBook,
  deleteBook,

  addNews,
  getNewsList,
  editNews,
  deleteNews,

  addReward, getRewardsList, editReward, deleteReward,

  addMovie, getMoviesList, editMovie, deleteMovie
};
