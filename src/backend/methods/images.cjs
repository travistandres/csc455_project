const PORT = 3000;
const secretKey = "3n@4#zC^d8F!q9J4^w@U9tP*lZ$eT0zF";

/**
 * uploads an image
 * @param {String} token the jwt
 * @param {String} imageName name of the image
 * @param {BLOB} fileBuffer the image
 * @returns {Promise<JSON>} message
 */
export const uploadImage = (token, imageName, fileBuffer) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        const formData = new FormData();
        formData.append("fileName", imageName);
        formData.append("file", fileBuffer);

        fetch(`http://localhost:${PORT}/images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }).then((response) => {
          if (!response.ok) {
            rej(`HTTP error! Status: ${response.status}`);
          } else {
            const data = response.json();
            console.log("Response received:", data);
            res(data);
          }
        });
      } catch (error) {
        rej("Error making the POST request:", error.message);
      }
    }, 20);
  });
};

/**
 *
 * @param {String} token the jwt
 * @param {Int} imageID id of the image to be deleted
 * @returns
 */
export const deleteImage = (token, imageID) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        fetch(`http://localhost:${PORT}/images/${imageID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok) {
            rej(`HTTP error! Status: ${response.status}`);
          } else {
            const data = response.json();
            console.log("Response received:", data);
            res(data);
          }
        });
      } catch (error) {
        rej("Error making the DELETE request:", error.message);
      }
    }, 20);
  });
};

/**
 *
 * @param {String} token the jwt
 * @returns
 */
export const getImages = (token) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      try {
        fetch(`http://localhost:${PORT}/images`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok) {
            rej(`HTTP error! Status: ${response.status}`);
          }

          response.json().then((data) => {
            console.log("Response received:", data);
            res(data);
          });
        });
      } catch (error) {
        rej("Error making the GET request:", error.message);
      }
    }, 20);
  });
};
