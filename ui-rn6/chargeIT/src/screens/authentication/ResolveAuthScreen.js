import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

// This screen is a bridge between Onboarding screen and Registration screen.
// If user already have a token, move him directly to main flow.
const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalLogin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalLogin({ navigation });
  }, []);

  return null;
};

export default ResolveAuthScreen;
