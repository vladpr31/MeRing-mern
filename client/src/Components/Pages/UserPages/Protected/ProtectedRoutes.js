import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../../Redux/Actions/userActions";
import {
  connectSocket,
  disconnectSocket,
} from "../../../../Redux/Actions/socketActions";
import { getSocket } from "../../../../api/socket";
import UserPage from "../UserPage/UserPage";
const ProtectedRoutes = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only run the effect if auth is not empty
    if (Object.keys(auth).length > 0) {
      const fetchUserAndConnectSocket = async () => {
        // Fetch user data
        const currentUser = JSON.parse(localStorage.getItem("user:persist"));
        if (!currentUser) {
          await dispatch(await getUserData(auth.id, auth.role));
        }
        // Establish socket connection
        await dispatch(connectSocket(auth));
        // socketInstance.connect();
        let socket = await dispatch(await getSocket());
        socket.connect();
        setSocket(socket);
      };

      // Fetch user data and establish socket connection
      fetchUserAndConnectSocket();
    }
    return () => {
      //dispatch(disconnectSocket());
    };
  }, [auth, dispatch]);

  // Redirect to "/" if auth is empty
  if (Object.keys(auth).length === 0) {
    location("/", { replace: true });
    return null; // Return null to prevent rendering children
  }
  if (socket) {
    return (
      <CookiesProvider>
        <div className="bg-[url('./Assets/bg4.jpg')]">
          <UserPage>{children}</UserPage>
        </div>
      </CookiesProvider>
    );
  }
};

export default ProtectedRoutes;
