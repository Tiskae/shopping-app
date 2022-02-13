// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (token, userId) => {
  return {
    type: AUTHENTICATE,
    payload: {
      token,
      userId,
    },
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBL3cznugPr8vlT7j3oWzG2vqbAaYoPElI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      //   console.log("result", result);

      if (!result.ok) {
        const resultData = await result.json();
        const errorMessage = resultData.error.message;
        let customMessage;

        if (errorMessage === "EMAIL_EXISTS") {
          customMessage = "Email already exist";
        } else if (errorMessage === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          customMessage = "Too many attempts, please try again later";
        }

        throw new Error(customMessage);
      }

      const resData = await result.json();
      // console.log("resData", resData);

      // Save data to device storage for auto login
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      console.log(expirationDate.toISOString());
      // console.log(resData.expiresIn);

      saveDataToSTorage(resData.idToken, resData.localId, expirationDate);

      dispatch(authenticate(resData.idToken, resData.localId));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBL3cznugPr8vlT7j3oWzG2vqbAaYoPElI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      // console.log("result", result);

      if (!result.ok) {
        const resultData = await result.json();
        const errorMessage = resultData.error.message;
        let customMessage;

        if (errorMessage === "EMAIL_NOT_FOUND") {
          customMessage = "Email does not exist";
        } else if (errorMessage === "INVALID_PASSWORD") {
          customMessage = "Incorrect password";
        } else if (errorMessage === "USER_DISABLED")
          customMessage = "Your account has been disabled";

        throw new Error(customMessage);
      }

      const resData = await result.json();
      // console.log("resData", resData);

      // Save data to device storage for auto login
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToSTorage(resData.idToken, resData.localId, expirationDate);

      dispatch(authenticate(resData.idToken, resData.localId));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const logout = () => {
  AsyncStorage.clear();
  return {
    type: LOGOUT,
  };
};

const saveDataToSTorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
    })
  );
};
