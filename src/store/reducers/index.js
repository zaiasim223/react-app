import { combineReducers } from "redux";
import user from "./user";
import users from "./users";
import songs from "./songs";
import movies from "./movies";
import rewards from "./rewards";
import news from "./news";
import quotes from "./quotes";
import books from "./books";
import app from "./app";
import settings from "./settings";
import tagsView from "./tagsView";
import monitor from "./monitor";

export default combineReducers({
  user,
  app,
  settings,
  tagsView,
  monitor,
  users,
  songs,
  movies,
  news,
  quotes,
  books,
  rewards
});
