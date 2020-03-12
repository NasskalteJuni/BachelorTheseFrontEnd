module.exports = (signaler, state, commit) => {
    signaler.addEventListener('message', message => {
        const type = message.type;
        const content = message.data;
        if(type === "room:added"){
            commit('addRoom', content);
        }else if(type === "room:removed"){
            commit('removeRoom', content);
        }else if(type === "user:connected"){
            if(state.room) commit('addMember', content);
        }else if(type === "user:disconnected"){
            if(state.room) commit('removeMember', content);
        }else if(type === "user:list"){
            if(state.room) content.forEach(user => commit('addMember', user));
        }else if(type === "architecture:switch"){
            if(state.room) commit('changeArchitecture', content);
        }
    });
};