const state = {
    hosts: [
    ]
}

const mutations = {
    ADD_HOST(state, payload) {
        state.hosts.push(payload)
    },
    CLEAR_HOSTS(state) {
        state.hosts = []
    }
}

export default {
    state,
    mutations,
    getters: {
        getHosts: state => state.hosts
    }
}
