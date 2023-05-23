
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/mainRoute'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductsProvider } from './Context/Products';

import { createStore } from 'redux';
import { CartReducer } from './store/Cart';
import { Provider } from 'react-redux';

function App() {
  const store = createStore(CartReducer)

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
