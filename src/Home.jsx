import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import "./index.css";
import {
  uploadImage,
  deleteImage,
  getImages,
} from "./backend/methods/images.cjs";

function Home() {
  const [count, setCount] = useState(0);
  const [addVisible, setAddVisible] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPhotoName, setNewPhotoName] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getImages(token).then((data) => {
      const images = data.map((file) => ({
        id: file.id,
        name: file.name,
        data: file.data,
        iv: file.iv,
      }));
      setImages(images);
    });
  }, []);

  const handleUploadFile = (e) => {
    e.preventDefault();

    uploadImage(token, newPhotoName, newPhoto)
      .then((result) => {
        setAddVisible(false);
        console.log(result);
        setNewPhotoName("");
      })
      .catch((err) => {
        console.error("Error uploading image: ", err);
      });
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <>
      <div className="py-10 flex flex-col w-screen items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between items-end">
            <h1 className="!text-left m-0 mr-6">Img-inator</h1>
            <div className="flex items-end">
              <a href="/" className="mr-1">
                Img-inator
              </a>
              <p className="mr-1 my-0">•</p>
              <a href="/">Help</a>
              <p className="mr-1 my-0">•</p>
              <a
                href="/"
                onClick={(e) => {
                  e.stopPropagation();
                  logout();
                }}
              >
                Logout
              </a>
            </div>
          </div>
          <hr className="h-[3px] my-3 bg-black border-0 w-full" />
          <div className="flex justify-center">
            <button
              className="border-2 border-black y2k-btn"
              onClick={(e) => {
                e.stopPropagation();
                setAddVisible(!addVisible);
              }}
            >
              Add Photos!
            </button>
          </div>
          <div className="container-grid mt-10">
            {images.map((image) => (
              <div key={image.id} className="flex flex-col items-center">
                <img src={`data:image/png;base64,${image.data}`} />
                <p>{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {addVisible && (
        <>
          <div className={`modal ${addVisible ? "" : "hidden"} w-96`}>
            <div className="bg-[#8a2be2] w-full py-1 px-2 border-b-4 border-black flex justify-between">
              <h3 className="m-0 text-white">Add Photo</h3>
              <button
                className="border-4 border-black"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddVisible(!addVisible);
                }}
              >
                X
              </button>
            </div>
            <div className="p-2">
              <form
                onSubmit={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up
                  handleUploadFile(e);
                }}
              >
                <div className="flex py-2">
                  <p className="m-0 mr-1">Photo Name</p>
                  <input
                    type="text"
                    onChange={(e) => setNewPhotoName(e.target.value)}
                    value={newPhotoName}
                  />
                </div>

                <div className="flex py-1">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    required
                  />
                </div>

                <button type="submit ">Add!</button>
              </form>
            </div>
          </div>
          <div
            className="overlay-modal"
            onClick={(e) => {
              e.stopPropagation();
              setAddVisible(!addVisible);
            }}
          ></div>
        </>
      )}
    </>
  );
}

export default Home;
