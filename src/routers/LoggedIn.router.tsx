import { Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import { UserRole } from '../graphql/__generated__'
import useMe from '../hooks/userMe'
import NotFound from '../pages/404'
import Restaurants from '../pages/client/Restaurants'
import Search from '../pages/client/Search'
import ConfirmEmail from '../pages/user/ConfirmEmail'
import EditProfile from '../pages/user/EditProfile'

const RoleRoute = (role: UserRole) => {
  if (role) {
    if (role === UserRole.Client) {
      return <Restaurants />
    }
    if (role === UserRole.Delivery) {
      return <>Delivery</>
    }
    if (role === UserRole.Owner) {
      return <>Owner</>
    }
  } else {
    return null
  }
}

export default function LoggedInRouter() {
  const { data: meData, loading: meLoading, error: meError } = useMe()
  if (!meData || meLoading || meError) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    )
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={RoleRoute(meData.me.role) || <NotFound />} />
        <Route path='/confirm' element={<ConfirmEmail />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
