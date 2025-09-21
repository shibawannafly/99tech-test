interface WalletBalance {
  currency: string;
  amount: number;
}

// extends from WalletBalance look better
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// unknown BoxProps props
// this is unnecessary because we dont extends any property, so no need to extends here
interface Props extends BoxProps {

}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // should define enum for blockchain, but if there are too many value, skip it
	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {\
      // balance does not have blockchain property
		  const balancePriority = getPriority(balance.blockchain);
      // lhsPriority was not defined, maybe their mean is balancePriority
      // base on getPriority, there is no value that -99 < balancePriority <= 0, so this code always return false
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
    // im not sure what business is, prices is a dependency of useMemo but it never use inside useMemo
  }, [balances, prices]);

  // this function is defined but never used, maybe it use for rows below
  // we can combine this logic with sortedBalances above
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // for short, just move this logic to return 
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row} // classes is not defined
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}