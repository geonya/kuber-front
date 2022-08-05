import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import LoggedInRouter from './routers/LoggedIn.router';
import UnLoggedInRouter from './routers/UnloggedIn.router';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <UnLoggedInRouter />;
}

export default App;
