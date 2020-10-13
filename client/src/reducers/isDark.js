
export default (state = true, action) => {
    switch(action.type) {
        case "DARK":
            return true
        case "LIGHT":
            return false
        default :
            return state;
    }
}