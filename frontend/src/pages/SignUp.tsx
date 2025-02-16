"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiRoutes } from "@/utils/routeApi";
import { useAuth0 } from "@auth0/auth0-react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const { loginWithRedirect , user } = useAuth0();

  console.log(user)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const newErrors: { [key: string]: string } = {};

   

    if (!email.trim()) newErrors.email = "Email is required";
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ username, password, email });
      const res = await axios.post(ApiRoutes.signup, body, config);

      if (res.status === 200) {
        console.log("done");
        navigate("/login");
      } else {
        throw new Error(res.data.message || "Invalid email or password.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrors({
          form: error.response?.data?.message || "Something went wrong.",
        });
      } else {
        setErrors({ form: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  }

  // Trigger Auth0's loginWithRedirect using Google connection
  const handleGoogleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2", // This tells Auth0 to use Google for authentication
        // Optionally, you can add additional parameters like 'screen_hint'
      },
    });
  };

  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#f3f4f6]">
      <div className="max-w-md w-96 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-[#ffffff] h-fit">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        {/* Google Sign-Up Button */}
        <div className="mt-6">
          <Button
            onClick={handleGoogleSignUp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign Up with Google
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link to="/login">
            <Button className="text-gray-400 hover:text-black" variant={"link"}>
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}