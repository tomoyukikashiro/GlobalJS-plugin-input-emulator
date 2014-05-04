(function(){

    'use strict';

    /**
     * @class Global.view.InputEmulator
     * @extend Global.core.ObservableClass
     */
    Global.define('Global.view.InputEmulator', {

        extend: Global.core.ObservableClass,

        EVENT_NAME: {
            /**
             * @event end
             * Fired when all text are inserted
             * @param {Global.data.model.Model} target this class.
             * @param {String} eventName this event name.
             */
            END: 'end'
        },

        /**
         * @cfg {Object} $elm jquery object to insert text
         */
        $elm: null,

        /**
         * @cfg {String[]|Object[]} data data of insert text
         */
        data: null,

        modifiedData: null,

        /**
         * @cfg {String} bskey backspace keyword
         */
        bsKey: '#',

        /**
         * @cfg {String} immediatebskey backspace keyword to delete text immediately
         */
        immediateBsKey: '$',

        /**
         * @cfg {Number} removeAllDelay interval msec to delete all text
         */
        removeAllDelay: 10,

        /**
         * @cfg {Number} delay interval msec to insert each text
         */
        delay: 100,

        /**
         * @method init
         * @constructor
         */
        init: function(config){
            this.listeners = {};
            this._super(config);
        },

        /**
         * @method start
         * to start input
         */
        start: function(){
            var data = this.getData(),
                modified = this._modifyData(data);
            this._switchStart(modified);
        },

        /**
         * @method _switchStart
         * @private
         */
        _switchStart: function(data){
            var me = this,
                $elm = this.get$elm(),
                val = $elm.val();

            if(val && val.length){
                this._removeAll(function(){
                    me._doStart(data);
                });
            }else{
                this._doStart(data);
            }
        },

        /**
         * @method _modifyData
         * @private
         */
        _modifyData: function(data){

            function concatArray(target, str){
                Array.prototype.push.apply(target, str.split(''));
            }

            function getkeyLoop(length, key){
                var str = '';
                while(length--){
                    str += key;
                }
                return str;
            }

            var res = [],
                immediateBsKey = this.getImmediateBsKey(),
                key,val;

            $.each(data, function(index, item){
                if(Global.isString(item)){
                    concatArray(res, item);
                }else{
                    key = Global.keys(item)[0];
                    val = item[key];
                    concatArray(res, key);
                    concatArray(res, getkeyLoop(key.length, immediateBsKey));
                    res.push(val);
                }
            });
            return res;
        },

        /**
         * @method _doStart
         * @private
         */
        _doStart: function(data){
            this._next(data);
        },

        /**
         * @method _next
         * @private
         */
        _next: function(data){
            if(!data || data.length === 0){
                this.dispatchEvent(this.EVENT_NAME.END);
                return;
            }
            var next = this._getNext(data);
            this._switchNext(next, data);
        },

        /**
         * @method _getNext
         * @private
         */
        _getNext: function(data){
            var index = 0,
                next = data[index];
            Global.Array.remove(data, index);
            return next;
        },

        /**
         * @method _switchNext
         * @private
         */
        _switchNext: function(next, data){
            var bs = this.getBsKey(),
                ibs = this.getImmediateBsKey();

            if(next === bs){
                this._remove(next, data);
                this._loopNext(data);
            }else if(next === ibs){
                this._remove(next, data);
                this._loopNext(data, true);
            }else{
                this._insert(next, data);
                this._loopNext(data);
            }
        },

        /**
         * @method _insert
         * @private
         */
        _insert: function(data){
            var $elm = this.get$elm(),
                current = $elm.val();

            $elm.val(current + data);
        },

        /**
         * @method _remove
         * @private
         */
        _remove: function(){
            var $elm = this.get$elm(),
                current = $elm.val(),
                removed = current.slice(0, -1);

            $elm.val(removed);
        },

        /**
         * @method _removeAll
         * @private
         */
        _removeAll: function(callback){
            var me = this,
                $elm = me.get$elm(),
                delay = me.getRemoveAllDelay(),
                current, removed, id;

            id = setInterval(function(){
                current = $elm.val();
                removed = current.slice(0, -1);
                $elm.val(removed);
                if(!$elm.val()){
                    clearInterval(id);
                    callback();
                }
            }, delay);
        },

        /**
         * @method _loopNext
         * @private
         */
        _loopNext: function(data, isImmediate){
            var me = this,
                delay = isImmediate ? 0 : this.getDelay();
            setTimeout(function(){
                me._next(data);
            }, delay);
        }

    });

})();
