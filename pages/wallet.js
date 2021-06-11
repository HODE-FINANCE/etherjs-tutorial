import { useState, useEffect } from 'react'
// 
export default function ConnectPage() {

  const [address, setAddress] = useState(null)

  const handleConnect = async () => {
    if (window && window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts) {
        const account = window.ethereum.selectedAddress
        setAddress(account)
      }

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          const account = window.ethereum.selectedAddress
          setAddress(account)
        } else {
          setWallet(null)
        }
      })
    }
  }


  return (
    <div>
    <button onClick={handleConnect}>Connect</button><br />
      Address: {address}
    </div>
  )
}
