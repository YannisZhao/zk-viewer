'use strict'

var logger = {
    info: function (vm, message) {
        vm.$store.commit('APPEND_LOG_INFO', {
            message: "<p>" + message + "</p>"
        });
    },
    warn: function(vm, message) {
        vm.$store.commit('APPEND_LOG_INFO', {
            message: "<p style='color:blue'>" + message + "</p>"
        });
    },
    error: function(vm, message) {
        vm.$store.commit('APPEND_LOG_INFO', {
            message: "<p style='color:red'>" + message + "</p>"
        });
    },
    clear: function(vm) {
        vm.$store.commit('CLEAR_LOG_INFO');
    }
};

module.exports = logger
