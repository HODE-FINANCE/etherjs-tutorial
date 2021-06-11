import { useState , useEffect } from 'react'
// 
export default function ChainPage() {

  const [chainId, setChainId] = useState(null)

  const handleGetChain = async () => {
    if (window && window.ethereum) {
      let chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setChainId(chainId)
    }
  }

  useEffect(() => {
    handleGetChain()
  }, [])

  return (
    <div>
      Chain ID: {chainId}
    </div>
  )
}
