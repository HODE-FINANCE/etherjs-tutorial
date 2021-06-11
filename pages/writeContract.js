import { useState, useEffect } from 'react'
import { ethers, Contract } from "ethers"
// 
import abiData from './abi.json'
// 
export default function WriteContractPage() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInitialProvider = async () => {
    const ethereum = window.ethereum
    let accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    
    if(accounts) {
      const _provider = new ethers.providers.Web3Provider(ethereum)
      setProvider(_provider)

      const _signer = _provider.getSigner()
      setSigner(_signer)
    }
  }

  const handleCallContract = async () => {
    const contract = await new Contract('0x0feadcc3824e7f3c12f40e324a60c23ca51627fc', [`function approve(address spender, uint256 amount) public virtual override returns (bool)`], signer)
  
    const requestTransaction = await contract.approve('0x74E6c7EeD6Eb8870bE505feB8fe9463D53C427E3', ethers.utils.parseUnits('1', 18))
    // set loading
    setIsLoading(true)
    const transaction = await requestTransaction.wait();
    // unset loading
    setIsLoading(false)
    // result value is hex
    console.log('transaction', transaction)
  }

  useEffect(() => {
    handleInitialProvider()
  }, [])

  return (
    <div>
      <button onClick={handleCallContract}>Call contract</button>
    </div>
  )
}
