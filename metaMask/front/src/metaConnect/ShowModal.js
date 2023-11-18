import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
// import { ABI } from '../abiArray/abi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { osizAbi } from '../abiArray/osizAbi';

function ShowModal({ accounts }) {
    const schema = Yup.object().shape({
        fromAdderss: Yup.string().trim(),
        // toAddress: Yup.string().required('To address is required').trim(),
        // amtValue: Yup.number().required('Value is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'
    });


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [amountValue, setAmountValue] = useState('')
    // const [toAddress, setToAddress] = useState('')
    const web3Instance = new Web3(window.ethereum);
    // Get the current accounts and network ID
    // const abi = ABI
    const contractAddress = '0x1411B5ADcD381c6a40ac10a59De79259102f1565'
    const contract = new web3Instance.eth.Contract(osizAbi, contractAddress)

    // transform Fuction
    const handleTransform = async (data) => {
        console.log(data);
        // const { toAddress, amtValue } = data
        try {
            const getData = await contract.methods.approveToken(accounts).send({ from: accounts, gas: 2000000 }).catch((err) => console.log(err))
            console.log(getData);

            // const getData2 = await contract.methods.startSale().send({ from: accounts }).catch((err) => console.log(err))
            // console.log(getData2);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Send Money
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className=' text-primary text-center'>Transction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleTransform)}>
                        <div>
                            <label className='form-label' htmlFor="">From Address :</label>
                            <input
                                {...register('fromAdderss')}
                                className={`form-control mb-3 ${errors?.fromAdderss ? 'is-invalid' : ''
                                    }`}
                                type="text" name="fromAdderss" id="" defaultValue={accounts} />
                            <div className="invalid-feedback">
                                {errors?.fromAdderss?.message}
                            </div>
                        </div>
                        {/* <div>
                            <label className='form-label mt-3' htmlFor="">To Address :</label>
                            <input
                                {...register('toAddress')}
                                className={`form-control mb-3 ${errors?.toAddress ? 'is-invalid' : ''
                                    }`}
                                type="text" name="toAddress" id=""
                            />
                            <div className="invalid-feedback">
                                {errors?.toAddress?.message}
                            </div>
                        </div>
                        <div>
                            <label className='form-label mt-3' htmlFor="">Enter Value :</label>
                            <input
                                {...register('amtValue')}
                                className={`form-control mb-3 ${errors?.amtValue ? 'is-invalid' : ''
                                    }`}
                            />
                            <div className="invalid-feedback">
                                {errors?.amtValue?.message}
                            </div>
                        </div> */}
                        <div className='d-grid my-3'>
                            <button type='submit' className="btn btn-success">Send Amount</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShowModal;