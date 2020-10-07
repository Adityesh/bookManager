
const actionTypes = {
    DARK : 'DARK',
    LIGHT : 'LIGHT'
}

export const DARK = () => {
    return {
        type: actionTypes.DARK,
    }
}

export const LIGHT = () =>{
    return {
       type: actionTypes.LIGHT,
    }
};

