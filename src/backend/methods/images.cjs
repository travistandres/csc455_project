const PORT = 3000

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
                const json = {
                    fileName: imageName,
                    fileBuffer: fileBuffer
                }
                fetch(`http://localhost:${PORT}/images`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                }).then(response => {
                    if (!response.ok) {
                        rej(`HTTP error! Status: ${response.status}`)
                    } else {
                        const data = response.json();
                        console.log('Response received:', data);
                        res(data)
                    }
                })
            } catch (error) {
                rej('Error making the POST request:', error.message);
            }
        }, 20)
    })
}

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
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    if (!response.ok) {
                        rej(`HTTP error! Status: ${response.status}`)
                    } else {
                        const data = response.json();
                        console.log('Response received:', data);
                        res(data)
                    }
                })
            } catch (error) {
                rej('Error making the DELETE request:', error.message);
            }
        }, 20)
    })
}

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
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(response => {
                    if (!response.ok) {
                        rej(`HTTP error! Status: ${response.status}`)
                    } else {
                        const data = response.json();
                        console.log('Response received:', data);
                        res(data)
                    }
                })
            } catch (error) {
                rej('Error making the GET request:', error.message);
            }
        }, 20)
    })
}