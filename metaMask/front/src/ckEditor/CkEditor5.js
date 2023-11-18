import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCreateCkDataMutation } from '../form_register/registerApi';

const CkEditor5 = () => {
    const [ckData, setCKData] = useState('')
    const [ckId, setCkId] = useState('')
    const [createCkData] = useCreateCkDataMutation()
    const handleEditorChange = (event, editor) => {
        console.log(editor.id);
        const data = editor.getData();
        setCkId(editor.id)
        setCKData(data) // Output the data to console
    };

    const handleSumbit = async (e) => {
        e.preventDefault()
        const response = await createCkData({ ckData, ckId })
        console.log(response);

    }
    return (
        <div>
            <h2>CKEditor in React</h2>
            <p>Summa &lt;</p>
            <form action="" onSubmit={handleSumbit}>
                <CKEditor
                    editor={ClassicEditor}
                    onChange={handleEditorChange}
                />
                <button className='btn btn-primary my-4'>Submit</button>
            </form>
        </div>

    );
};

export default CkEditor5;