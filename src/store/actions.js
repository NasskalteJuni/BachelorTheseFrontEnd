import http from "../plugins/axios";
import router from "../router";
import handleMessagesInStore from "./socket.js";

export default {
    async login({state, commit}, credentials) {
        const session = await http.post('./session', credentials);
        const ice = await http.get('./ice');
        commit('setCurrentUser', session.user);
        commit('setIceServers', ice);
        commit('openSignaler');
        handleMessagesInStore(state.signaler, state, commit);
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
    async enter({commit}, {id, password}){
        const room = await http.post('./room/'+id+'/user', {password});
        commit('setCurrentRoom', room);
    },
    async leave({state, commit}){
        try{
            await http.delete('/room/'+state.room.id+'/user');
        }catch(err){
            commit('setRooms', state.rooms.filter(room => room.id !== state.room.id));
        }finally{
            commit('setCurrentRoom', null);
        }
    },
    async createRoom({commit}, room){
        const created = await http.post('./room/', room);
        commit('setCurrentRoom', created);
        await router.push('/room/'+created.id+(room.password ? '?key='+room.password : ''));
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