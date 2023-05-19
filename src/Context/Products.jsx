import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../network/axiosBase';

export const ProductsContext = createContext("");

export const ProductsProvider = ({ children }) => {

    const { isLoading, error, data, isSuccess } = useQuery('productsData', () =>
        axiosInstance.get('products')
            .then(res => res.data)
    );
    const useProductById = productId => useQuery(['productById', productId], () =>
    axiosInstance.get(`products/${productId}`)
      .then(res => res.data)
  );

    return (
        <ProductsContext.Provider value={{ isLoading, error, data, isSuccess, useProductById }}>
            {children}
        </ProductsContext.Provider>
    );
}

