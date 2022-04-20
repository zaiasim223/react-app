import React, { Component } from 'react';
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
// import zhCN from "antd/es/locale/zh_CN";
import store from "./store";
import Router from "./router";
import { db } from "./config/firebase"

class App extends Component {
  render() {
    console.log(db, 'db');
    return (
      <ConfigProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
