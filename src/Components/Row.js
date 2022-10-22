import axios from "../axios/index";
import requests from "../axios/requests";
import React, { useState, useEffect } from "react";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(fetchUrl);
      setMovies(data.results);
    };
    fetchMovies();
  }, []);
  console.log("--------", movies);
  return (
    <div className="pl-5 pb-4 scrollbar-hide">
      <h3 className="text-white text-lg font-semibold mb-[6px]">{title}</h3>
      <div className="pl-5 flex flex-row items-center overflow-y-hidden overflow-x-scroll scrollbar-hide">
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={` mr-3 ${
                  isLargeRow ? "max-h-[250px]" : "max-h-[100px]"
                } transition-all duration-500 ease-in-out hover:scale-105`}
                src={`${BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
              />
            )
        )}
      </div>
    </div>
  );
}
