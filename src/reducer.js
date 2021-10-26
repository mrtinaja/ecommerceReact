export const initialState = {
    basket: [],
    user: null,
    shippingGata: {},
    peymentMessage: "",

}

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
    SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
    SET_PAYMENT_MESSAGE: "SET_PAYMENT_MESSAGE",
}

export const getBasketTotal = (basket) => {
    return basket.reduce((amount, item) => item.price + amount, 0)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],

            };
        case "REMOVE_ITEM":
            const index = state.basket.findIndex((basketItem => basketItem.id === action.id))
            let newbasket = [...state.basket];
            if (index >= 0) {
                newbasket.splice(index, 1)
            } else { console.log("No puede eliminar este producto") }

            return {
                ...state,
                basket: newbasket,
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
            case "SET_SHIPPINGDATA":
            return {
                ...state,
                shippingData: action.shippingData,
            };
        case "EMPTY_BASKET":
            return {
                ...state,
                basket: action.basket,
            };
            case "PAYMENT_MESSAGE":
                return {
            ...state,
            paymentMessage: action.paymentMessage,
        };
        default:
             return state;
    }
};



export default reducer;