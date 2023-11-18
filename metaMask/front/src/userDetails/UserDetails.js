import React from 'react'
import { useGetRegisterQuery } from '../form_register/registerApi'

const UserDetails = () => {

    const { data: registerData, isSuccess, isLoading, error } = useGetRegisterQuery()
    let content;
    if (isLoading) {
        content = <p>Data Is Loading</p>
    } else if (isSuccess) {
        console.log(registerData);
        content =
            <>
                <p>hj</p>
            </>

    } else {
        content = <p>{error}</p>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default UserDetails