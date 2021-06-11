import { useState  } from 'react'
// 
export default function ConnectPage() {

  const [address, setAddress] = useState(null)

  const handleConnect = async () => {
    if (window && window.ethereum) {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts) {
        let account = window.ethereum.selectedAddress
        setAddress(account)
      }
    }
  }


  return (
    <div>
      <button onClick={handleConnect}>Connect</button><br />
      Address: {address}
    </div>
  )
}
