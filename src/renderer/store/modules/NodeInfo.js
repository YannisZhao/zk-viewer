const state = {
    node: {}
}

const mutations = {
    UPDATE_NODE_INFO(state, payload) {
        state.node = payload
    },
    CLEAR_NODE_INFO(state) {
        state.node = {}
    }
}

export default {
    state,
    mutations
}
