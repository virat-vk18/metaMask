import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Web3 from 'web3'
import { ABI } from '../abiArray/abi';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function RemoveShowModal({ accounts }) {
    const schema = Yup.object().shape({
        fromAdderss: Yup.string().required('address is Must Given').trim(),
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
    const abi = ABI
    const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    const contract = new web3Instance.eth.Contract(abi, contractAddress)

    // transform Fuction
    const handleRemove = async (data) => {
        // const { fromAdderss } = data
        try {
            const getData = await contract.methods.removeBlackList(accounts).send({ from: accounts })
            console.log(getData);
        } catch (err) {
            console.log(err.message);
        }
    }


    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                Remove List
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className=' text-primary text-center'>Remove List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleRemove)}>
                        <div>
                            <label className='form-label' htmlFor="">Remove Address :</label>
                            <input
                                {...register('fromAdderss')}
                                className={`form-control mb-3 ${errors?.fromAdderss ? 'is-invalid' : ''
                                    }`}
                                value={accounts}
                                type="text" name="fromAdderss" id=""
                            />
                            <div className="invalid-feedback">
                                {errors?.fromAdderss?.message}
                            </div>
                        </div>
                        <div className='d-grid my-3'>
                            <button type='submit' className="btn btn-success">Remove List</button>
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

export default RemoveShowModal;