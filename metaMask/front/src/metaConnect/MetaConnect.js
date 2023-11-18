import React, { useState } from 'react'
import ShowModal from './ShowModal'
// import { toast } from 'react-toastify';
import Web3 from 'web3';
import RemoveShowModal from './RemoveShowModal';
const MetaConnect = () => {
    const [walletAddress, setWalletAddress] = useState('')
    // const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance] = useState('');
    const [block, setBlock] = useState('');
    const [networkId, setNetworkId] = useState(null);

    // useEffect(() => {
    //     const getBlock = async () => {
    //         const web3Instance = new Web3(window.ethereum);
    //         const getBlock = await web3Instance.eth.getBlockNumber()
    //         console.log(getBlock);
    //         setBlock(parseFloat(getBlock))
    //     }
    //     getBlock()
    // }, []);

    const connectToMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Request MetaMask account access
                /* automatically open metamask in our window */
                await window.ethereum.request({ method: "eth_requestAccounts" })
                const web3Instance = new Web3(window.ethereum);
                console.log(web3Instance);
                // setWeb3(web3Instance);
                // Get the current accounts and network ID
                const accounts = await web3Instance.eth.getAccounts();
                const networkId = await web3Instance.eth.net.getId(accounts[0]);
                const getBalance = await web3Instance.eth.getBalance(accounts[0]);
                setBalance(parseFloat(getBalance))
                setWalletAddress(accounts[0])
                setAccounts(accounts[0]);
                setNetworkId(networkId);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('MetaMask not detected. Please install MetaMask.');
        }
    };

    console.log(window.ethereum.isConnected())

    // const connectWallet = async () => {
    //     if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
    //         try {
    //             const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    //             setWalletAddress(accounts[0])
    //             console.log(accounts[0])
    //             toast.success('SuccessFully Connected', {
    //                 position: toast.POSITION.TOP_CENTER
    //             });
    //         } catch (err) {
    //             console.error(err.message)
    //         }
    //     } else {
    //         toast.error('Please Installed MetaMask', {
    //             position: toast.POSITION.TOP_CENTER
    //         });
    //     }
    // }

    const switchAccount = async () => {
        try {
            await window.ethereum.request({
                "method": "wallet_switchEthereumChain",
                "params": [
                    {
                        "chainId": "0x38"
                    }
                ]
            });
        } catch (err) {
            console.log(err.message);
        }
    }


    const getBlockNumber = async () => {
        const web3Instance = new Web3(window.ethereum);
        const getBlock = await web3Instance.eth.getBlockNumber()
        console.log(getBlock);
        setBlock(parseFloat(getBlock))
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary my-5">
                <div className="container-fluid">
                    <button className="navbar-brand btn" type='button'>MetaMask</button>
                    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <li className='nav-item'>
                                <button type='button' className="btn btn-dark" onClick={connectToMetaMask
                                } >{walletAddress.length > 0 ? `Connected ${walletAddress.substring(0, 5)}...${walletAddress.substring(38)}` : 'Connect Wallet'}</button>
                            </li>

                            <>
                                {
                                    window.ethereum.isConnected() &&

                                    <>
                                        <li className='nav-item'>
                                            <button onClick={switchAccount} type='button' className="btn btn-warning mx-3">Switch Account</button>
                                        </li>
                                        <li className='nav-item'>
                                            <button
                                                onClick={getBlockNumber}
                                                type='button' className="btn btn-dark me-3">Get Block</button>
                                        </li>
                                        <li className='nav-item'>
                                            <ShowModal
                                                accounts={accounts}
                                            />
                                        </li>
                                        <li className='nav-item'>
                                            <RemoveShowModal
                                                accounts={accounts}
                                            />
                                        </li>
                                    </>

                                }
                            </>
                        </div>
                    </div>
                </div>
            </nav>

            <div>
                <h1>MetaMask Connection</h1>

                <div className='d-grid justify-content-center my-5'>
                    <div className='card'>
                        {window.ethereum.isConnected() ?
                            (<div className='card-body'>
                                <p className='h1 text-center mb-3'>Connected to MetaMask</p>
                                <p>Current Account: {accounts}</p>
                                <p>Network ID: {networkId}</p>
                                <p>Balance: {balance} ETH</p>
                                <p>Block: {block}</p>
                            </div>) :
                            <p className='m-4'>Please Connected MetaMask</p>
                        }

                    </div>
                </div>

            </div>


            {/* send Money */}


        </>
    )
}

export default MetaConnect

