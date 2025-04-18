import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from "./utils/routes"
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { persistor, store } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';


const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
        <ToastContainer position='top-center' />
      </Provider>
  );
}

export default App;
