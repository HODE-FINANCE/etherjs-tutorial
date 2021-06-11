import { useState , useEffect } from 'react'
import { ethers } from 'ethers'
// 

const sleep = function(milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}


export default function ProviderPage() {

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const handleInitialProvider = async () => {
    const ethereum = window.ethereum

    const _provider = new ethers.providers.Web3Provider(ethereum)
    setProvider(_provider)

    const _signer = _provider.getSigner()
    setSigner(_signer)
  }

  useEffect(() => {
    handleInitialProvider()
  }, [])

  console.log('provider', provider)
  console.log('signer', signer)

  return (
    <div> </div>
  )
}
