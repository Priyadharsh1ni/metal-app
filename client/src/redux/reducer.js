const initialState = {
    token: null,
    user: null,
    message: null,
    purityData: [],
    metalRate:[],
    historyData:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            };
        case 'REGISTER':
            return {
                ...state,
                message: action.payload.message === 'User registered successfully' ? 'User registered successfully' : state.message,
            };
        case 'PURITY_DATA':
            return {
                ...state,
                purityData: action.payload,
            };
        case 'METAL_RATES':
            return{
                ...state,
                metalRate : action.payload
            }
        case 'UPDATE_RATE':
            return{
                ...state,
                 metalRate: state.metalRate.map(metal =>
                    metal._id === action.payload._id ? action.payload : metal
                ),
            }
        case 'METAL_HISTORY':
            return{
                ...state,
                historyData : action.payload
            }
        case 'UPDATE_PURITY':
            return {
                ...state,
                purityData: state.purityData?.map(purity =>
                    purity._id === action.payload._id ? action.payload : purity
                ),
            };
        case 'DELETE_PURITY':
            return {
                ...state,
                purityData: state.purityData.filter(purity => purity._id !== action.payload),
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                user: null,
            };
        default:
            return state;
    }
}

export default reducer;