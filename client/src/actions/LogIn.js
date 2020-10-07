
const actionTypes = {
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT'
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
    }
}

export const login = () =>{
    return {
       type: actionTypes.LOGIN,
    }
};

