(function(){
    'use strict';
    /**
     * @class Global.data.model.Model
     * @extend Global.core.ObservableClass,
     */
    Global.define('Global.data.model.Model',{

        extend: Global.core.ObservableClass,

        EVENT_NAME: {
            /**
             * @event load
             * Fired when data is loaded
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            LOAD: 'load'
        },

        /**
         * @cfg {Global.data.proxy.Proxy} Proxy
         */
        proxy : Global.data.proxy.Proxy,

        /**
         * @cfg {Object} requestSettings request settings of $.ajax method
         *
         *      requestSettings: {
         *          GET: {
         *              type: 'GET',
         *              dataType: 'json'
         *          }
         *      }
         */
        requestSetting: {
            GET: {
                type: 'GET',
                dataType: 'json'
            }
        },

        /**
         * @cfg {Object} requestParam request parameter of $.ajax({data: {}})
         *
         *      requestParam: {
         *          GET: {},
         *          POST: {},
         *          DELETE: {},
         *          PUT: {}
         *      }
         */
        requestParam: {
            GET: {}
        },

        /**
         * @cfg {Object|String} data data of response
         */
        data: null,

        /**
         * @constructor
         */
        init: function(config){
            this._super(config);
            this.proxy = new this.proxy();
        },

        /**
         * @method get
         * get data by using $.ajax
         * @param {Object} parameter of $.ajax(data: {});
         * @return {Object} jquery.Deferred
         */
        get: function(param){
            var _param = this._getRequestObj('GET', param);
            return this._request(_param);
        },

        /**
         * @method
         * @private
         */
        _request: function(param) {
            var me = this,
                dfd = $.Deferred(),
                ajaxDfd = this.proxy.get(param);

            ajaxDfd.done(function(e){
                me._onSuccess(e);
                dfd.resolve(e);
                me.dispatchEvent(me.EVENT_NAME.LOAD, e);
            });

            ajaxDfd.fail(function(e){
                dfd.reject(e);
            });

            return dfd.promise();
        },

        /**
         * @method
         * @private
         */
        _getRequestObj: function(type, param) {
            var requestSettings = this.getRequestSetting()[type],
                requestParam = this.getRequestParam()[type],
                _param = $.extend(true, {}, requestParam, param);

            requestSettings.data = _param;
            return requestSettings;
        },

        /**
         * @method
         * @private
         */
        _onSuccess: function(data){
            var _data = this._modifyData(data);

            this.setData(_data);
            this.dispatchEvent(this.EVENT_NAME.LOAD, _data);
        },

        /**
         * @method
         * @private
         */
        _modifyData: function(data){
            // override if you need.
            return data;
        }
    });
})();
