import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const payload = {
      name: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(jwtDecode(data.token)));
      navigate("/home");
    } catch (error) {
      console.log("Error Making the POST Request: ", error.message);
    }
  };

  return (
    <>
      <div className="py-10 flex flex-col w-screen items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between items-end">
            <h1 className="!text-left m-0 mr-6">Img-inator</h1>
            <div className="flex items-end">
              <a href="" className="mr-1">
                Img-inator
              </a>
              <p className="mr-1 my-0">•</p>
              <a href="">Help</a>
              <p className="mr-1 my-0">•</p>
              <a href="/register">Register</a>
            </div>
          </div>
          <hr className="h-[3px] my-3 bg-black border-0 w-full" />
          <div className=" pb-4 p-1 border-4 border-black w-96 shadow-2xl">
            <div className="bg-[#8a2be2] w-full py-1 px-2 border-4 border-black flex justify-between">
              <h3 className="m-0 text-white">Login.</h3>
              <button className="border-4 border-black">X</button>
            </div>
            <div className=" flex justify-center ">
              <form
                onSubmit={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up
                  login(e);
                }}
              >
                <div className="py-2"></div>
                <div className="flex py-2">
                  <p className="m-0 mr-2">Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex py-2">
                  <p className="m-0 mr-2">Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="border-4 float-start ml-[114px]"
                >
                  <p className="m-0 px-3">Login</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
