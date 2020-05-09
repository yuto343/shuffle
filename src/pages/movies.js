import React from "react";
import PageLayout from "../components/pageLayout";
import PageTitle from "../components/pageTitle";
import MovieCard from "../components/movieCard";
import { useStaticQuery, graphql } from "gatsby";
const getData = graphql`
  {
    allMicrocmsSeasonMovies {
      edges {
        node {
          youtubeId
          title
          sentence
        }
      }
    }
  }
`;
function movies() {
  const data = useStaticQuery(getData);
  const movieList = data.allMicrocmsSeasonMovies.edges;
  console.log(movieList);
  return (
    <PageLayout>
      <PageTitle title="Season Movie!"></PageTitle>
      <p className="text-sm mt-8 w-4/5 mx-auto">
        SHUFFLEは毎年シーズンのみんなの滑りをまとめたシーズンムービーを作ります。
        SHUFFLEメンバーはそこにかっこいい滑りを収めるため、互いに高めあいながら頑張っています。
        是非、SHUFFLEの滑りをご覧ください。
      </p>
      <div className="w-4/6 mx-auto">
        {movieList.map((movie, idx) => {
          return (
            <MovieCard
              key={idx}
              title={movie.node.title}
              youtubeId={movie.node.youtubeId}
              sentence={movie.node.sentence}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}

export default movies;
