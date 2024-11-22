import { useState } from "react";
import "./index.css";

function Login() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="pt-4 pb-20 px-6">
        <h1>Img-inator</h1>
      </div>
      <div className="flex w-screen items-center justify-center">
        <div className=" pb-4 p-1 border-4 border-black w-96">
          <div className="bg-blue-700 text-[#ffffff] w-full py-1 px-2 border-4 border-black flex justify-between">
            <h3 className="m-0">Login.</h3>
            <button className="border-4 border-black">X</button>
          </div>
          <div className=" flex justify-center ">
            <form action="">
              <div className="py-2"></div>
              <div className="flex py-2">
                <p className="m-0 mr-2">Username</p>
                <input type="text" />
              </div>
              <div className="flex py-2">
                <p className="m-0 mr-2">Password</p>
                <input type="password" />
              </div>
              <button type="submit" className="border-4 float-start ml-[114px]">
                <p className="m-0 px-3">Login</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
