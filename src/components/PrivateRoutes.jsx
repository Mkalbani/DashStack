import Layout from "../appLayout/Layout";
import UseAuthStatus from "../hooks/UseAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();

  if (checkingStatus) {
    return <div>Loading...</div>;
  }

  return loggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoutes;
