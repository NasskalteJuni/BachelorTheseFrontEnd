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
    setCurrentRoom(state, room) {
        state.room = room;
    },
    setJoining(state, target) {
        state.joining = target;
    },
    openSignaler(state) {
        state.signaler = new window.MediaUtilities.Signaler({endpoint: 'ws://127.0.0.1:8888/'});
        state.signaler.addEventListener('message', e => console.log(e.data));
    }
};