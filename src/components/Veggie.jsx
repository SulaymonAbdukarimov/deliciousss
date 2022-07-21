import React, { useEffect, useState } from "react";
import { API_KEY } from "../api";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const [size, setSize] = useState(3);

  let update = () => {
    if (window.innerWidth > 950) {
      setSize(3);
    } else if (window.innerWidth < 950 && window.innerWidth > 500) {
      setSize(2);
    } else if (window.innerWidth < 500) {
      setSize(1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", update);
  }, [size]);

  const getVeggie = async () => {
    let check = localStorage.getItem("veggie");
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  useEffect(() => {
    getVeggie();
  }, []);

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: size,
            arrows: false,
            gap: "5rem",
            drag: "free",
            pagination: false,
          }}
        >
          {veggie.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Card>
                  <Link to={"/recipe/" + item.id}>
                    <p>{item.title}</p>
                    <img src={item.image} alt={item.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 11;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;
export default Veggie;
