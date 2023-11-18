import React, { useState } from 'react'
import axios from 'axios'
const Upload = () => {
    const [img, setImg] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', img)
        try {
            const response = await axios.post('http://localhost:3600/fileUpload', formdata)
            console.log(response);

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div>
            <div className=' container d-grid justify-content-around'>
                <div className="card m-3">
                    <h5 className="card-header">
                        React - Form Validation Example with React Hook Form
                    </h5>
                    <div className="card-body">
                        <form encType='multipart/form-data' onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <div>
                                    <label htmlFor='' className='form-label'>First Name</label>
                                    <input type="file" name="file" id=""
                                        onChange={(e) => setImg(e.target.files[0])}
                                    />

                                </div>
                                <div >
                                    <label className='form-label' htmlFor=''>Last Name</label>

                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary me-1">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <button type="button" className=' btn btn-primary'>Click To display Data</button>
                {/* {
        formData.map((item) => (
          <li>{item.firstName}</li>
        ))
      } */}
            </div>
        </div >
    )
}

export default Upload