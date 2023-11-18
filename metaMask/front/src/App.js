import './App.css';
import { ToastContainer } from 'react-toastify';
import FormRegister from './form_register/FormRegister';
import { Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Header from './header/Header';
import DashBoard from './dashBoard/DashBoard';
import EditUser from './editUser/EditUser';
import UserDetails from './userDetails/UserDetails';
import Upload from './form_register/Upload';
import MetaConnect from './metaConnect/MetaConnect';
import ReadMethod from './metaConnect/ReadMethod';
import CkEditor5 from './ckEditor/CkEditor5';
// import LockPattern from './lock/LockPattern';




function App() {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/register' element={<FormRegister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashBoard' element={<DashBoard />} />
        <Route path='/editUser/:id' element={<EditUser />} />
        <Route path='/userDetails' element={<UserDetails />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/metaConnect' element={<MetaConnect />} />
        <Route path='/ckEditor5' element={<CkEditor5 />} />
        {/* <Route path='/lockPattern' element={<LockPattern />} /> */}
        <Route path='/readMethod' element={<ReadMethod />} />
      </Routes>

      {/* <Upload /> */}
    </div>
  );
}

export default App;
