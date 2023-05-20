
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/mainRoute'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductsProvider } from './Context/Products';
import { CartProvider } from './Context/Cart';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <CartProvider >
          <RouterProvider router={router} />
        </CartProvider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
