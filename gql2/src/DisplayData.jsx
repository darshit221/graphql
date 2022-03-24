import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useState } from "react";

export const QUERY_ALL_USER = gql`
  query getUser {
    users {
      id
      name
      username
      age
      nationality
      friends {
        name
      }
      faviouratemovies {
        name
        yearOfPublish
      }
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query getmovies {
    movies {
      name
      yearOfPublish
      isInTheater
    }
  }
`;
const QUERY_MOVIE_BYNAME = gql`
  query Movie($moviename: String!) {
    movie(name: $moviename) {
      name
      yearOfPublish
      isInTheater
    }
  }
`;
function DisplayData() {
  const [searchMovie, setSearchMovie] = useState("");
  const { error, data, loading } = useQuery(QUERY_ALL_USER);
  const { data: MovieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: serchMovieData, error: searchError }] =
    useLazyQuery(QUERY_MOVIE_BYNAME);
  console.log(serchMovieData);
  if (error) <h1>Somwthing Wrong</h1>;
  if (loading) <h1>Somwthing Wrong</h1>;

  return (
    <div>
      <h4>users</h4>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>username</th>
            <th>age</th>
            <th>nationality</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.age}</td>
                  <td>{user.nationality}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr />
      <h4>Movies</h4>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>year</th>
          </tr>
        </thead>
        <tbody>
          {MovieData &&
            MovieData.movies.map((movie) => {
              return (
                <tr key={movie.id}>
                  <td>{movie.name}</td>
                  <td>{movie.yearOfPublish}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          placeholder="Intesteller..."
          value={searchMovie}
          onChange={(e) => {
            setSearchMovie(e.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                moviename: searchMovie,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          <h1>
            {serchMovieData?.movie?.name}
            {serchMovieData?.movie?.yearOfPublish}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
