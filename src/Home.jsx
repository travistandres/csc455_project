import { useState } from "react";
import "./index.css";

function Home() {
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
          {/* Put imges here */}
        </div>
      </div>
    </>
  );
}

export default Home;
