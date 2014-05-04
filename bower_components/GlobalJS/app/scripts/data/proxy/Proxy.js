(function(){
    'use strict';
    /**
     * @class Global.data.proxy.Proxy
     */
    Global.define('Global.data.proxy.Proxy',{

        extend: Global.core.ObservableClass,

        /**
         * @cfg {Boolean} singleRequest whether when this prop is true this class dose not send request while another request is sending.
         */
        singleRequest: true,

        /**
         * @cfg {Boolean} isRequesting whether a request is sending or not
         */
        isRequesting: false,

        init: function(config) {
            this._super(config);
        },

        /**
         * @method get
         * send ajax request
         * @param {Object} param
         */
        get: function(param){
            var me = this,
                dfd = $.Deferred();

            if(me.getSingleRequest() &&  me.getIsRequesting()){
                return;
            }

            me.setIsRequesting(true);
            $.ajax(param)
                .done(function(e){
                    me.setIsRequesting(false);
                    dfd.resolve(e);
                })
                .fail(function(e){
                    me.setIsRequesting(false);
                    dfd.reject(e);
                });

            return dfd.promise();
        }
    });
})();
