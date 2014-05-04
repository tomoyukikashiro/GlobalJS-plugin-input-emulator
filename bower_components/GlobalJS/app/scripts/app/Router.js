(function(){
    'use strict';

    /**
     * @class Global.app.Router
     * Routing logic according to url pathname
     * @extend Global.core.BaseClass
     */
    Global.define('Global.app.Router',{

        /**
         * @cfg {Object} routingpath and controller class
         *
         *     routing: {
         *         '/'    : App.controller.Main,
         *         '/list': App.controller.List
         *     }
         */
        routing: {
        },

        /**
         * @cfg {Object} controllers cache controller instance
         */
        controllers: {
        },


        /**
         * @method start
         * make controller instance according to current pathname
         * start routing.
         */
        start: function() {
            var pathName = location.pathname,
                routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass() : undefined,
                key = this._getNoLastSlashPath(pathName);
            this.controllers[key] = instance;
        },

        /**
         * @method
         * @private
         */
        _getController: function(path, routing){
            var pattern = /\/$/,
                hasLastSlash = pattern.test(path) ? path : path + '/',
                noLastSlash  = this._getNoLastSlashPath(path),
                hasLastSlashClass = routing[hasLastSlash],
                noLastSlashClass = routing[noLastSlash];

            return hasLastSlashClass ? hasLastSlashClass : noLastSlashClass;
        },

        /**
         * @method
         * @private
         */
        _getNoLastSlashPath: function(path){
            var reg = /\/$/;
            return reg.test(path) ? path.slice(0, -1) : path;
        }

    });
})();
