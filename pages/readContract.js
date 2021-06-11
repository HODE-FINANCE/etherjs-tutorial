import { useState } from 'react'
import { ethers } from 'ethers'
// 
export default function ReadContractPage() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed.binance.org/',
  )

  const priceRoute = {
    pancake: {
      address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      abi: [
        `
          function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)
        `,
      ],
    },
  }

  // const Contract = {
  //   router: new ethers.Contract(
  //     priceRoute.pancake.address,
  //     priceRoute.pancake.abi,
  //     provider,
  //   ),
  // }

  const [exchangeRate, setExchangeRate] = useState(null)

  const getExchangeRate = async () => {
    const wadTokenAddress = '0x0feadcc3824e7f3c12f40e324a60c23ca51627fc'
    const busdTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

    const contract = new ethers.Contract(
      priceRoute.pancake.address,
      priceRoute.pancake.abi,
      provider,
    )
    
    const amounts = await contract.getAmountsOut(
      ethers.utils.parseUnits('1', 18),
      [wadTokenAddress, busdTokenAddress],
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
