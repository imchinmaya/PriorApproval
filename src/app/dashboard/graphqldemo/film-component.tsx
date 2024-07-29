'use client'
// src/components/FilmsComponent.tsx
import { GET_FILMS } from '@/graphql/queries/films';
import { fetchData } from '@/services/graphql-service';
import React, { useEffect, useState } from 'react';

interface Film {
  title: string;
  releaseDate: string;
  director: string;
}

interface FilmsData {
  allFilms: {
    films: Film[];
  };
}

const FilmsComponent: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFilms = async () => {
      try {
        const data = await fetchData<FilmsData>(GET_FILMS);
        setFilms(data.allFilms.films);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getFilms();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Star Wars Films</h2>
      {films.map((film, index) => (
        <div key={index}>
          <h3>{film.title}</h3>
          <p>Director: {film.director}</p>
          <p>Release Date: {film.releaseDate}</p>
        </div>
      ))}
    </div>
  );
};

export default FilmsComponent;
