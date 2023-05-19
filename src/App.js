
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/mainRoute'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductsProvider } from './Context/Products';
import { CartContext, CartProvider } from './Context/Cart';
import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <ProductsProvider>
          <CartProvider >

            <RouterProvider router={router} />

          </CartProvider>
        </ProductsProvider>
      
    </QueryClientProvider>
  );
}

export default App;
