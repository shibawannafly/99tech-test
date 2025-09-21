import { useEffect, useState } from "react";
import { Flex, InputNumber, Typography } from "antd";
import CurrencySelector from "./components/CurrencySelector";
import { useCurrencyStore } from "./store/currency.store";

function App() {
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);

  const { setCurrencyList, currencyList } = useCurrencyStore();

  useEffect(() => {
    const fetchRate = async () => {
      const response = await fetch(
        `https://interview.switcheo.com/prices.json`
      );
      const data = await response.json();
      setCurrencyList(data);
    };
    fetchRate();
  }, []);

  useEffect(() => {
    const fromCurrencyData = currencyList.find(
      (item) => item.currency === fromCurrency
    );
    const toCurrencyData = currencyList.find(
      (item) => item.currency === toCurrency
    );
    if (fromCurrencyData && toCurrencyData) {
      setToAmount(
        (fromAmount! * fromCurrencyData.price) / toCurrencyData.price
      );
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  return (
    <div style={{ width: 600, margin: "80px auto", padding: "20px" }}>
      <Typography.Title
        level={2}
        style={{ textAlign: "center", marginBottom: 40 }}
      >
        Currency Converter
      </Typography.Title>
      <Flex gap={40}>
        <Flex gap={8}>
          <CurrencySelector
            currency={fromCurrency}
            setCurrency={setFromCurrency}
          />
          <InputNumber
            value={fromAmount}
            onChange={(value) => setFromAmount(value || null)}
            controls={false}
            style={{ width: 200 }}
          />
        </Flex>
        <Flex gap={8}>
          <InputNumber
            value={toAmount}
            readOnly
            controls={false}
            style={{ width: 200 }}
          />
          <CurrencySelector currency={toCurrency} setCurrency={setToCurrency} />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
