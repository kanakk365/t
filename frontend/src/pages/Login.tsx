"use client";
import { Button } from "../components/ui/button";
import {  useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slice/authSlice";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { 
    loginWithPopup, 
    user, 
    getAccessTokenSilently,
  } = useAuth0();

  // Add state to track initialization
  // const [isInitialized, setIsInitialized] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "google-oauth2" 
        }
      });
      
      
        const token = await getAccessTokenSilently()
        console.log(user)
        console.log("Token:", token);
        dispatch(login({ user:{ email : user?.email ?? "", name: user?.name ?? ""}, token: token ?? "" }))
        navigate('/app')
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     // Only proceed if we're authenticated and haven't initialized yet
  //     if (isAuthenticated && user && !isInitialized) {
  //       try {
  //         console.log("Starting authentication process...");
  //         console.log("User authenticated:", user);
          
  //         const token = await getAccessTokenSilently();
  //         console.log("Access Token received");

  //         const userData = {
  //           email: user.email,
  //           name: user.name,
  //           picture: user.picture,
  //           auth0Id: user.sub
  //         };
          
  //         console.log("Sending user data to backend:", userData);

  //         const response = await axios.post(
  //           ApiRoutes.registerUser,
  //           userData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`
  //             }
  //           }
  //         );

  //         console.log("Backend response received:", response.data);
  //         setIsInitialized(true);
  //         navigate('/dashboard');
  //       } catch (error) {
  //         console.error('Error during initialization:', error);
  //         setIsInitialized(false);
  //       }
  //     } else if (!isAuthenticated && !isLoading) {
  //       console.log("Not authenticated, ready for login");
  //     }
  //   };

  //   initializeAuth();
  // }, [isAuthenticated, user, getAccessTokenSilently, navigate, isLoading, isInitialized]);


  // if (isLoading || (isAuthenticated && !isInitialized)) {
  //   return (
  //     <div className="h-[100vh] flex justify-center items-center">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  // Only show login if not authenticated
  
    return (
      <div className="h-[100vh] flex justify-center items-center bg-[#f3f4f6]">
        <div className="max-w-md w-96 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-[#ffffff] h-fit">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <div className="mt-6">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    );
  }



