import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { API_KEY } from "../api";

function Recipe() {
  let params = useParams();
  let [details, setDetails] = useState([]);
  let [activeTab, setActiveTab] = useState("instructions");
  console.log(details);

  const fetchDetails = async () => {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`
    );
    let detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <>
            <div>
              {/* <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3> */}
              <h3>{details.instructions}</h3>
            </div>
            <h4>Analize instructions</h4>
            {details.extendedIngredients.length ? (
              details.extendedIngredients.map((item) => (
                <>
                  {item.steps.length ? (
                    item.steps.map((d) => (
                      <>
                        <h3 style={{ color: "red" }}>{d.number}</h3>
                        <p>{d.step}</p>
                        <ul>
                          {d.ingredients.length ? (
                            d.ingredients.map((ingredient) => (
                              <li>
                                {ingredient.name}
                                <img
                                  src={ingredient.image}
                                  alt={ingredient.name}
                                />
                              </li>
                            ))
                          ) : (
                            <h1>no childs child</h1>
                          )}
                        </ul>
                      </>
                    ))
                  ) : (
                    <h3>No child</h3>
                  )}
                </>
              ))
            ) : (
              <h1>No parent</h1>
            )}
            {/* {details.extendedIngredients.steps.map((item) => (
              <>
                <h3>{item.number}</h3>
                <p>{item.step}</p>
                <ul>
                  {item.ingredients.map((ingredient) => (
                    <li>
                      {ingredient.name}
                      <img src={ingredient.image} alt={ingredient.name} />
                    </li>
                  ))}
                </ul>
              </>
            ))} */}
          </>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((item) => {
              return <li key={item.id}>{item.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    img {
      width: 100%;
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 600px) {
    h3 ol li {
      font-size: 1rem;
      line-height: 2rem;
    }
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    text-align: center;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  @media screen and (max-width: 500px) {
    margin-top: 0.7rem;
  }
`;

const Info = styled.div`
  margin-left: 5rem;
  @media screen and (max-width: 1200px) {
    margin-left: 2rem;
    margin-top: 2rem;
    text-align: center;
  }
`;

export default Recipe;
