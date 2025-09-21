import { Button, Popover } from "antd";
import CurrencyGrid from "./CurrencyGrid";
import { useState } from "react";

export default function CurrencySelector({
  currency,
  setCurrency,
}: {
  currency: string;
  setCurrency: (currency: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <CurrencyGrid
          activeCurrency={currency}
          setCurrency={setCurrency}
          hide={hide}
        />
      }
      trigger="click"
      placement="bottom"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="default" style={{ paddingRight: 0, paddingLeft: 8 }}>
        {currency}{" "}
        <img
          src={`assets/${currency}.svg`}
          alt={currency}
          width={24}
          height={24}
        />{" "}
      </Button>
    </Popover>
  );
}
