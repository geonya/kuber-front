import { Route, Routes } from 'react-router-dom';
import CreateAccount from '../pages/create-account';
import Login from '../pages/login';

export default function UnLoggedInRouter() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/create-account' element={<CreateAccount />} />
    </Routes>
  );
}
