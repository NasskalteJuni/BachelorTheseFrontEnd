export default {
    setCurrentUserName(state, name) {
        state.user.name = name;
    },
    setCurrentUser(state, user) {
        state.user = user;
    },
    setRooms(state, rooms) {
        state.rooms = rooms;
    },
    addRoom(state, room) {
        const i = state.rooms.findIndex(r => r.id === room.id);
        if(i === -1) state.rooms.push(room);
    },
    removeRoom(state, room){
        const i = state.rooms.findIndex(r => r.id === room.id);
        if(i >= 0) state.rooms.splice(i, 1);
    },
    setCurrentRoom(state, room) {
        const i = !room ? -1 : state.rooms.findIndex(r => r.id === room.id);
        state.room = i >= 0 ? Object.assign(state.rooms[i], room) : room;
    },
    addMember(state, member){
        const i = state.room.members.indexOf(member);
        if(i === -1) state.room.members.push(member);
    },
    removeMember(state, member){
        const i = state.room.members.indexOf(member);
        if(i >= 0) state.room.members.splice(i, 1);
    },
    setJoining(state, target) {
        state.joining = target;
    },
    setIceServers(state, ice){
        state.iceServers = ice;
    },
    changeArchitecture(state, architecture){
        state.room.architecture = architecture;
    },
    openSignaler(state) {
        state.signaler = new window.MediaUtilities.Signaler({endpoint: 'ws://127.0.0.1:8888/'});
    }
};