import { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { axiosInstance } from '../network/axiosBase';

export const ProductsContext = createContext("");

export const ProductsProvider = ({ children }) => {



    const useGetProduct = paramsLimit => useQuery(['productsData',paramsLimit], () =>
        axiosInstance.get('products?limit='+paramsLimit)
            .then(res => res.data)
    );

    const useProductById = productId => useQuery(['productById', productId], () =>
        axiosInstance.get(`products/${productId}`)
            .then(res => res.data)
    );

    return (
        <ProductsContext.Provider value={{ useGetProduct , useProductById }}>
            {children}
        </ProductsContext.Provider>
    );
}

