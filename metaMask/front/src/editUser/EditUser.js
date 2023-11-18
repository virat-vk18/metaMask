import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useEditRegisterMutation, useGetSingleUserMutation, } from '../form_register/registerApi';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const EditUser = () => {
    // form validation rules
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id);
    const [getSpecificUser] = useGetSingleUserMutation()
    // const [updateRegister] = useUpdateRegisterMutation()
    const [editRegister] = useEditRegisterMutation()
    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(5, 'firstName must be at least 5 characters').max(16, 'firstName lessthan 16 characters').trim(),
        email: Yup.string().required('Email is required').email('Email is invalid').trim(),

    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });


    // console.log(getUserId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getEditData = await getSpecificUser({ id })
                // console.log(getEditData);
                const userDetails = getEditData.data
                reset({
                    email: userDetails.email,
                    name: userDetails.name
                })
            } catch (err) {
                console.log(err.message);
            }

        }
        fetchData()
    }, [])

    const onSubmit = async (data) => {
        try {
            const editData = await editRegister({ id, name: data.name, email: data.email })
            // console.log(editData);
            // await api.post(`register/${getUserId}`, data)
            if (editData.error) {
                const errorMessage = editData.error.data.message
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_CENTER
                });

            } else {
                const successMsg = editData.data.message
                toast.success(successMsg, {
                    position: toast.POSITION.TOP_CENTER
                });
                navigate('/dashBoard')
            }

        } catch (err) {
            console.log(err.message);
            // const errorMessage = err.response.data.message
            // toast.error(errorMessage, {
            //     position: toast.POSITION.TOP_CENTER
            // });
        }
    }

    return (
        <div className='container d-grid justify-content-around'>
            <div className="card m-3">
                <h5 className="card-header">
                    Edit Your Register Details
                </h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div>
                            <div>
                                <label htmlFor='' className='form-label'>Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    {...register('name')}
                                    className={`form-control mb-3 ${errors?.name ? 'is-invalid' : ''
                                        }`}
                                // defaultValue={userData.name}
                                />
                                <div className="invalid-feedback">
                                    {errors?.name?.message}
                                </div>
                            </div>
                            <div className="">
                                <label className='form-label' htmlFor=''>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    {...register('email')}
                                    className={`form-control mb-3 ${errors?.email ? 'is-invalid' : ''}`}
                                // defaultValue={userData.email}
                                />
                                <div className="invalid-feedback">{errors?.email?.message}</div>
                            </div>

                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary me-1">
                                UpdateUser
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default EditUser
