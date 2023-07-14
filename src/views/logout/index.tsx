import useLogout from "hooks/use-logout";
import { useEffect } from "react";

const Logout = () => {
  const logout = useLogout();

  console.log('logout by url');

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div></div>
  );
};

export default Logout;
