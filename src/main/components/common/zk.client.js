'use strict'

const ZooKeeper = require('node-zookeeper-client');

var ZKClient = {
    newInstance: function (config) {
        var zkClient = {}

        zkClient.client = ZooKeeper.createClient(config.host);

        zkClient.client.once('connected', function () {
            console.log('Connected to ZooKeeper.');
            var path = '/';
            this.listChildren(path);
        });

        zkClient.listChildren = function listChildren(path) {
            this.client.getChildren(
                path,
                function (event) {
                    console.log('Got watcher event: %s', event);
                    listChildren(path);
                },
                function (error, children, stat) {
                    if (error) {
                        console.log(
                            'Failed to list children of %s due to: %s.',
                            path,
                            error
                        );
                        return;
                    }

                    console.log('Children of %s are: %j.', path, children);
                }
            );
            zkClient.close = function () {
                this.client.connect();
            }
        }
        return zkClient;
    }
}

module.exports = ZKClient
