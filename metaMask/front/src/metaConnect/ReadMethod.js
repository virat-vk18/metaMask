import React, { useEffect, useState } from 'react'
import { ABI } from '../abiArray/abi'
import Web3 from 'web3'
const ReadMethod = () => {
    // const jsonRpcURL = 'https://mainnet.infura.io/v3/917c4f75f17a4e28b78263cddd8f1b46'
    const [accounts, setAccounts] = useState([]);
    const web3Instance = new Web3(window.ethereum);
    useEffect(() => {
        const webInit = async () => {
            const accounts = await web3Instance.eth.getAccounts()
            setAccounts(accounts[0])
            console.log(accounts[0]);
        }
        webInit()
    }, [])
    // Get the current accounts and network ID
    // const web3 = new Web3(jsonRpcURL)
    const abi = ABI
    const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    const contract = new web3Instance.eth.Contract(abi, contractAddress)
    // const address = '0x69166e49d2fd23e4cbea767d7191be423a7733a5'

    async function readFromSmartContract() {
        const address = '0x69166e49d2fd23e4cbea767d7191be423a7733a5'
        const owenerAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

        // const address2 = '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD'
        // const owenerAddress2 = '0x53479116dEc28dCD4D5529D8c8bd5AC69CB6C665'


        let tokenName = await contract.methods.name().call()
        console.log("Name: ", tokenName)
        let tokenSymbol = await contract.methods.symbol().call()
        console.log("Symbol: ", tokenSymbol)

        let tokenTotalSupply = await contract.methods.totalSupply().call()
        console.log("Total supply: ", tokenTotalSupply)
        let tokenDeprecated = await contract.methods.deprecated().call()
        console.log("tokenDeprecated: ", tokenDeprecated)

        let tokenBalance = await contract.methods.balances(address).call()
        console.log("tokenBalance: ", web3Instance.utils.fromWei(tokenBalance, 'ether'))

        let tokenOwner = await contract.methods.getOwner().call()
        console.log("tokenOwner: ", tokenOwner)

        let tokenAllowance = await contract.methods.allowance(owenerAddress, address).call()
        console.log("tokenAllowance: ", tokenAllowance)

        let balanceOfAccount = await contract.methods.balanceOf(address).call()
        console.log("Balance: ", web3Instance.utils.fromWei(balanceOfAccount, 'ether'))
    }

    async function writeFromSmartContract() {
        try {
            const getData = await contract.methods.pause().send({ from: accounts })
            console.log(getData);
        } catch (err) {
            console.log(err);
        }

    }

    // readFromSmartContract() // Function call to fetch the information

    return (
        <div>
            <button type='button' onClick={readFromSmartContract} className="btn btn-primary my-3">GetData</button>

            <button type='button' onClick={writeFromSmartContract} className="btn btn-primary mx-2 my-3">write</button>
        </div>
    )
}

export default ReadMethod