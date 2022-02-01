export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
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

    if (!result.ok) {
      throw new Error("Something went wrong");
    }

    const resData = result.json();

    dispatch({ type: SIGNUP });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const result = await fetch("");
    const resData = await result.json();

    dispatch({ type: SIGNIN });
  };
};
