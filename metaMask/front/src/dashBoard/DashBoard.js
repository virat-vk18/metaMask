import React from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useDeleteRegisterMutation, useGetRegisterQuery } from '../form_register/registerApi'
import Swal from 'sweetalert2';


const DashBoard = () => {
    const navigate = useNavigate()
    const { data: registerData, isSuccess, isLoading, error } = useGetRegisterQuery()
    const [deleteRegister] = useDeleteRegisterMutation()
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRegister({ id })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your data has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const columns = [
        {
            id: 0,
            name: "S.no",
            selector: (row, index) => index + 1,
            sortable: true,
            reorder: true
        },
        {
            id: 1,
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            reorder: true
        },
        {
            id: 2,
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            reorder: true
        },
        {
            id: 3,
            name: "More Details",
            cell: (row) => <button className='btn btn-primary' type="button" onClick={(e) => navigate(`/editUser/${row._id}`)}>update</button>,
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 4,
            name: "More Details",
            cell: (row) => <button className='btn btn-danger' type="button" onClick={() => handleDelete(row._id)}>delete</button>,
            sortable: true,
            right: true,
            reorder: true
        }

    ];

    let content;
    if (isLoading) {
        content = <p>Data Is Loading</p>
    } else if (isSuccess) {
        content =
            <>
                <DataTable
                    className='dataTable'
                    title="Product Lists"
                    columns={columns}
                    data={registerData}
                    defaultSortFieldId={1}
                    pagination
                />
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

export default DashBoard