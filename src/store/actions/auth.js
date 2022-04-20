import { setUserToken, resetUser } from "./user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken } from "@/utils/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();
export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        const userData = {
          id: user.uid,
          token: user.accessToken,
          role: "admin",
          name: "Admin",
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description: "Admin",
        }
        console.log(user, 'user');
        dispatch(setUserToken(user.accessToken));
        setToken(user.accessToken);
        resolve(userData);
      })
      .catch((error) => {
        reject('Invalid User')
        console.log(error, 'error');
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
      dispatch(resetUser());
      removeToken();
      resolve({});
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    // reqLogout(token)
    //   .then((response) => {
    //     const { data } = response;
    //     if (data.status === 0) {
    //       dispatch(resetUser());
    //       removeToken();
    //       resolve(data);
    //     } else {
    //       const msg = data.message;
    //       reject(msg);
    //     }
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
};
