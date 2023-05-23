export const CartReducer = (state = JSON.parse(localStorage.getItem("cart")) || [], action) => {
    let updatedState = [...state];
    let haveProduct = updatedState.find(item => item.id === action.payload?.id);

    switch (action.type) {
        case "ADD_CART":
            if (haveProduct) {
                haveProduct.count += 1;
                localStorage.setItem('cart', JSON.stringify(updatedState));
            } else {
                const newProduct = { ...action.payload, count: 1 };
                updatedState.push(newProduct);
                localStorage.setItem("cart", JSON.stringify(updatedState));
            }
            state = updatedState;
            break;

        case "REDUCE_COUNT_CART":
            if (haveProduct.count == 1) {
                updatedState = updatedState.filter(item => item.id !== haveProduct.id);
                localStorage.setItem("cart", JSON.stringify(updatedState));
            }
            haveProduct.count -= 1;
            localStorage.setItem('cart', JSON.stringify(updatedState));

            state = updatedState;
            break;

        case "CLEAR_ALL":
            updatedState = [];
            localStorage.setItem("cart", JSON.stringify(updatedState));
            state = updatedState;
            break;

        default:
            break;
    }

    return state;
};
