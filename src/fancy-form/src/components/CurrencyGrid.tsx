import { Col, Row, Input, Tooltip } from "antd";
import { useState } from "react";
import { useCurrencyStore } from "../store/currency.store";

export default function CurrencyGrid({
  activeCurrency,
  setCurrency,
  hide,
}: {
  activeCurrency: string;
  setCurrency: (currency: string) => void;
  hide: () => void;
}) {
  const [value, setValue] = useState("");

  const { currencyList } = useCurrencyStore();

  const currencyData = currencyList.filter((item) =>
    item.currency.includes(value.toUpperCase())
  );

  return (
    <div style={{ width: 260 }}>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Row gutter={[10, 10]} style={{ marginTop: 16 }}>
        {currencyData.map((item, index) => (
          <Col key={index} span={4}>
            <Tooltip placement="top" title={item.currency}>
              <img
                src={`assets/${item.currency}.svg`}
                alt={item.currency}
                style={{
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  border:
                    item.currency === activeCurrency
                      ? "2px solid #1890ff"
                      : "none",
                }}
                onClick={() => {
                  setCurrency(item.currency);
                  hide();
                }}
              />
            </Tooltip>
          </Col>
        ))}
      </Row>
    </div>
  );
}
