import { ethers, Contract } from "ethers"
// 
export default function WriteContractPage() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const handleInitialProvider = async () => {
    const ethereum = window.ethereum
    let accounts = awaitethereum.request({
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
   const contract =  new Contract('contract.address', 'contract.abi', signer)
   const params = {}
   const requestTransaction = await contract.abi_function_name(params)
   const transaction = await requestTransaction.wait();
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
