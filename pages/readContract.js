import { useState } from 'react'
import { ethers } from 'ethers'
// 
export default function ReadContractPage() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed.binance.org/',
  )

  const priceRoute = {
    pancake: {
      code: 'pancake',
      routeName: 'PancakeSwap',
      addressOrName: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      contractInterface: [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      ],
    },
  }

  const Contract = {
    router: new ethers.Contract(
      priceRoute.pancake.addressOrName,
      priceRoute.pancake.contractInterface,
      provider,
    ),
  }

  const [exchangeRate, setExchangeRate] = useState(null)

  const getExchangeRate = async () => {
    const amounts = await Contract.router.getAmountsOut(
      ethers.utils.parseUnits('1', 18),
      ['0x0feadcc3824e7f3c12f40e324a60c23ca51627fc', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'],
    )
    setExchangeRate(amounts[1].toString() / 1e18)
  }

  
  return (
    <div>
      <button onClick={getExchangeRate}>Get wad price</button>
      <br />
      Wad price: ${exchangeRate}
    </div>
  )
}
