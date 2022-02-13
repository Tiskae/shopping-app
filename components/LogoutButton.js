import React from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import colors from "../constants/colors";

const LogoutButton = (props) => {
  //   console.log(props.logout);

  return (
    <Button
      title="Logout"
      color={colors.primary}
      onPress={() => {
        props.logout();
        props.onLogout();
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
