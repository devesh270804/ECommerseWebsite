import axios from 'axios';
export const getAllPizzas = () => async(dispatch) => {
    dispatch({type: 'GET_PIZZAS_REQUEST'});
    console.log("Dispatched GET_PIZZAS_REQUEST");
    try {
        const response = await axios.get('/api/pizzas/getpizzas');
        console.log("Dispatched GET_PIZZAS_SUCCESS with data:", response.data);
        dispatch({type: 'GET_PIZZAS_SUCCESS', payload: response.data});
    } catch(error) {
        console.error("Dispatched GET_PIZZAS_FAILED with error:", error.message);
        dispatch({type: 'GET_PIZZAS_FAILED', payload: error.message});
    }
};
