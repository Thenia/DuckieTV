DuckieTV.controller("delugeCtrl", ["$injector", "Deluge", "SettingsService", "FormlyLoader",
    function($injector, Deluge, SettingsService, FormlyLoader) {

        var self = this;

        this.isConnected = function() {
            return Deluge.isConnected();
        };

        FormlyLoader.load('TorrentClientSettings').then(function(fields) {

            self.model = {
                server: SettingsService.get('deluge.server'),
                port: SettingsService.get('deluge.port'),
                use_auth: SettingsService.get('deluge.use_auth'),
                password: SettingsService.get('deluge.password'),
                hideUseAuth: true
            };

            self.fields = fields;
        });

        this.test = function() {
            //console.log("Testing settings");
            Deluge.Disconnect();
            Deluge.setConfig(this.model);
            Deluge.connect().then(function(connected) {
                console.info("Deluge connected! (save settings)", connected);
                Deluge.saveConfig();
                $injector.get('DuckietvReload').windowLocationReload();
            }, function(error) {
                console.error("Deluge connect error!", error);
            });
        };
    }
]);