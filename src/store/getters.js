export default {
    isLoggedIn(state){
        return !!(state.user && state.user.id);
    }
};