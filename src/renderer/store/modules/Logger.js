const state = {
    metadata: [],
    log: ''
}

const mutations = {
    APPEND_LOG_INFO(state, payload) {
        if (state.metadata.length > 1000) {
            state.metadata.slice(0, 1)
        }
        var message = payload.message
        state.metadata.push(payload.message);
        var log = "";
        var size = state.metadata.length;
        for (var i = 0; i < size; i++) {
            log += state.metadata[i];
        }
        state.log = log
    },
    CLEAR_LOG_INFO(state) {
        state.metadata.slice(0, state.metadata.length);
        state.log = ''
    }
}

export default {
    state,
    mutations
}
