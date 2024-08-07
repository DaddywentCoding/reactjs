import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState(0);

  //처음에 코인데이터를 가져옴
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        //selectedCoinPrice에 첫코인의 가격을 넣어두기
        //selectedCoinPrice의초기값이 0인 경우 금액입력을 해도 결과가 NaN이 되버림
        setSelectedCoinPrice(json[0].quotes.USD.price);
        setLoading(false);
      });
  }, []);

  const onChangeInput = (event) => {
    setMoney(event.target.value);
  };
  const onChangeSelect = (event) => {
    setSelectedCoinPrice(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <div>
        <label>금액입력</label>
        <input onChange={onChangeInput} value={money} type="number"></input>
      </div>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <div>
          <select onChange={onChangeSelect}>
            {coins.map((coin, index) => (
              <option key={index} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />▶ ${money} 로 {money / selectedCoinPrice} 개 살 수 있어요.
        </div>
      )}
    </div>
  );
}

export default App;
