import { useState } from "react";
import "./index.css";

function Login() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="py-10 flex flex-col w-screen items-center justify-center">
        <div>
          <div className="flex justify-between items-end">
            <h1 className="!text-left m-0">Img-inator</h1>
            <div className="flex items-end">
              <a href="/" className="mr-1">
                Img-inator
              </a>
              <p className="mr-1 my-0">•</p>
              <a href="/">Help</a>
            </div>
          </div>
          <hr className="h-[3px] my-3 bg-black border-0 " />
          <div className=" pb-4 p-1 border-4 border-black w-96 shadow-2xl">
            <div className="bg-[#8a2be2] w-full py-1 px-2 border-4 border-black flex justify-between">
              <h3 className="m-0 text-white">Login.</h3>
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
