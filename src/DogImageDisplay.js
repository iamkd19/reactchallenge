import React, { useState } from "react";
import axios from "axios";

const DogImageDisplay = () => {
  const [breed, setBreed] = useState("");
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setBreed(event.target.value);
  };

  const fetchDogImages = () => {
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random/10`)
      .then((response) => {
        setImages(response.data.message);
        setError("");
      })
      .catch((error) => {
        setError("Breed not found. Please try another breed.");
        setImages([]);
      });
  };

  const addToFavorites = (image) => {
    setFavorites([...favorites, image]);
  };

  const removeFromFavorites = (image) => {
    const updatedFavorites = favorites.filter((fav) => fav !== image);
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>Fetch and Favorite Dog Images</h1>
      <div>
        <label htmlFor="breedInput">Enter a Dog Breed: </label>
        <input
          type="text"
          id="breedInput"
          placeholder="e.g., retriever"
          value={breed}
          onChange={handleChange}
        />
        <button onClick={fetchDogImages}>Fetch Images</button>
      </div>
      {error && <p>{error}</p>}
      <div>
        {images.length > 0 && (
          <div>
            {images.map((imageUrl, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={imageUrl}
                  alt={`Dog ${index}`}
                  style={{ maxWidth: "200px", margin: "10px" }}
                />
                <button onClick={() => addToFavorites(imageUrl)}>
                  Favorite
                </button>
                {favorites.includes(imageUrl) && (
                  <button onClick={() => removeFromFavorites(imageUrl)}>
                    Unfavorite
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {favorites.length > 0 && (
        <div>
          <h2>Favorites</h2>
          <div>
            {favorites.map((favImage, index) => (
              <div key={index}>
                <img
                  src={favImage}
                  alt={`Favorite Dog ${index}`}
                  style={{ maxWidth: "200px", margin: "10px" }}
                />
                <button onClick={() => removeFromFavorites(favImage)}>
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DogImageDisplay;
