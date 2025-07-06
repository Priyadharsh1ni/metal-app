import { service } from "./service"
const login = (userDetails) => {
    return(dispatch) => {
        service.login(userDetails).then((res) => {
            dispatch({
                type: 'LOGIN',
                payload: res
            })
        })
    }
    
}

const register = (userDetails) => {
    return(dispatch) => {
        service.register(userDetails).then((res) => {
            dispatch({
                type: 'REGISTER',
                payload: res
            })
        })
    }
}

const purityData = () => {
    return(dispatch) => {
        service.purityData().then((res) => {
            dispatch({
                type: 'PURITY_DATA',
                payload: res
            })
        })
    }
}

const updatePurityData = (id, body) => {
  return async (dispatch) => {
    try {
      const res = await service.updatePurityData(id, body);
      dispatch({
        type: 'UPDATE_PURITY',
        payload: res,
      });
      const updatedList = await service.purityData();
      dispatch({
        type: 'PURITY_DATA',
        payload: updatedList,
      });
    } catch (err) {
      console.error("Error updating purity:", err);
    }
  };
};


const deletePurityData = (id) => {
    return async(dispatch) => {
        try{
        const res = await service.deletePurityData(id);
        dispatch({
            type: 'DELETE_PURITY',
            payload: res,
        });
        const updatedList = await service.purityData();
        dispatch({
            type: 'PURITY_DATA',
            payload: updatedList,
        });
        } catch (err) {
        console.error("Error updating purity:", err);
        }
        
    }
}

const createdPurityData = (details) =>{
    return async(dispatch) => {
        try{
        const res = await service.createdPurityData(details);
        dispatch({
            type: 'DELETE_PURITY',
            payload: res,
        });
        const updatedList = await service.purityData();
        dispatch({
            type: 'PURITY_DATA',
            payload: updatedList,
        });
        } catch (err) {
        console.error("Error updating purity:", err);
        }
        
    }
}

const listMetalRate =() =>{
    return(dispatch) =>{
        service.listMetalRate().then((res) =>{
            dispatch({
                type: 'METAL_RATES',
                payload: res
            })
        }) 
    }
}

const updateMetalRate = (details) =>{
    return async(dispatch) =>{
        try{
            const res = service.updateMetalRate(details)
                dispatch({
                    type: 'UPDATE_RATE',
                    payload: res
                })
            const updatedList = await service.listMetalRate();
                dispatch({
                    type: 'METAL_RATES',
                    payload: updatedList,
                });
        }catch (err) {
            console.error("Error updating purity:", err);
            }
        }
}

const getHistory = () =>{
return(dispatch) =>{
        service.runHistory().then((res) =>{
            dispatch({
                type: 'METAL_HISTORY',
                payload: res
            })
        }) 
    }
}

export const action = {
    login,
    register,
    purityData,
    updatePurityData,
    deletePurityData,
    createdPurityData,
    listMetalRate,
    updateMetalRate,
    getHistory
}