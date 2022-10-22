import React, { useState, useEffect } from "react";
import axios from "../axios/index";
import requests from "../axios/requests";

export default function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchMovieData = async () => {
      const { data } = await axios.get(requests.fetchNetflixOrignals);
      console.log("Data----", data, axios, requests);
      setMovie(
        data.results[Math.floor(Math.random() * data.results?.length - 1)]
      );
    };
    fetchMovieData();
  }, []);

  console.log("Movie", movie);

  const truncate = string => {
    return string?.length > 150 ? string.substring(0, 150) + "..." : string;
  };

  return (
    <header
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
          : "",
      }}
      className={`relative  bg-center bg-cover h-[448px] text-white  object-contain `}
    >
      <div className="ml-8 flex flex-col items-start">
        <h2 className="text-5xl font-semibold h-[190px] pt-[140px] mb-4 text-start">
          {movie?.title || movie?.name || movie?.original_name}
        </h2>
        <div>
          <button className="cursor-pointer color-white outline-none border-none text-semibold rounded-sm px-8 mr-3 bg-[rgba(51,51,51,0.5)] py-2 hover:text-black hover:bg-[#e6e6e6] transition-all duration-200">
            Play
          </button>
          <button className="cursor-pointer color-white outline-none border-none text-semibold rounded-sm px-8 mr-3 bg-[rgba(51,51,51,0.5)] py-2 hover:text-black hover:bg-[#e6e6e6] transition-all duration-200">
            My List
          </button>
        </div>
        <p className=" leading-5 pt-4 text-sm max-w-[360px] h-20 text-start">
          {truncate(movie?.overview)}
        </p>
      </div>
      <div
        // style={{ height: "7.4rem", backgroundImage: "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61, #111))" }}
        className="bg-gradient-to-b from-transparent via-[rgba(36,36,36,0.61)] to-[#111] h-24 absolute bottom-0 w-full"
      />
    </header>
  );
}
