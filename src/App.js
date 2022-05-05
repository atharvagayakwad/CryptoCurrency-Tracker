import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin.js";
import "./App.css";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCoins(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert("Error", err);
      });
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form action="">
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Coin
            id={coin.id}
            image={coin.image}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
};

export default App;
