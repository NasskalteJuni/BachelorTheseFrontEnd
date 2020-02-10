import http from "../plugins/axios";
import router from "../router";

export default {
    async login({commit}, credentials) {
        const session = await http.post('./session', credentials);
        commit('setCurrentUser', session.user);
        commit('openSignaler');
    },
    async logout({commit}){
        await http.delete('./session');
        commit('setCurrentUser', {});
        await router.push('/');
    },
    async register(_, user){
        await http.post('./user/', user);
    },
    async unregister({state, dispatch}, {password}){
        // axios doesn't really handle delete requests well...
        await fetch(http.baseURL + '/user/'+state.user.id, {
            method: 'delete',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({password})
        });
        try{
            await dispatch('logout');
        }catch(err){
            // ignore errors
        }finally{
            await router.push('/');
        }
    },
    async enter({state, commit}, {id, password}){
        const room = await http.post('./room/'+id+'/user', {password});
        room.$peers = new window.MediaUtilities.ConnectionManager({name: state.user.name, signaler: state.signaler, verbose: true, logger: console});
        room.$mediaServer = new window.MediaUtilities.Connection({name: state.user.name, signaler: state.signaler, isYielding: false, verbose: true, logger: console});
        room.$peers.addEventListener('userconnected', user => {
            console.log('[1] user connected', user);
            const i = room.members.indexOf(user);
            if(i === -1) room.members.push(user);
        });
        room.$peers.addEventListener('userdisconnected', user => {
            console.log('[1] user disconnected', user);
            const i = room.members.indexOf(user);
            if(i >= 0) room.members.slice(i, 1);
        });
        commit('setCurrentRoom', room);
    },
    async leave({state, commit}){
        await http.post('/room/'+state.room.id+'/leave');
        commit('setCurrentRoom', null);
        await router.push('/rooms');
    },
    async createRoom({commit}, room){
        const created = await http.post('./room/', room);
        commit('setCurrentRoom', created);
        await router.push('/room/'+created.id);
    },
    async changePassword({state},{oldPassword, newPassword}){
        await http.put('./user/'+state.user.id+'/password', {oldPassword, newPassword});
    },
    async changeUsername({state, commit},{name}){
        return http.put('./user/'+state.user.id+'/name',{name}).then(() => commit('setCurrentUserName', name));
    },
    async updateRooms({commit}){
        const rooms = await http.get('./rooms');
        commit('setRooms', rooms);
    },
    async forceUpdate({state}){
        state.signaler.send({type: 'user:list', data: [], sender: state.user.name, receiver: '@server'});
    }
};