import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY } from "../api";
import styled from "styled-components";

function Searched() {
  const [searchedReciped, setSearchedRecipe] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipe(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedReciped.length ? (
        searchedReciped.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })
      ) : (
        <NoItem>Not Found</NoItem>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const NoItem = styled.h3`
  text-align: center;
  color: crimson;
`;
export default Searched;
