import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access_token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", handleStorageChange);

    const handleAuthChange = () => {
      handleStorageChange();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  return isAuth;
};

export const dispatchAuthChange = () => {
  window.dispatchEvent(new Event("auth-change"));
};
