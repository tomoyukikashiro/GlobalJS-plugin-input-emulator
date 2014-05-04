(function(){
    'use strict';
    /**
     * @class Global.util.SpriteSheet
     * iterate css class at specific interval
     * @extends Global.core.ObservableClass,
     */
    Global.define('Global.util.SpriteSheet',{

        extend : Global.core.ObservableClass,

        /**
         * @cfg {Array} class list to replace css class
         */
        classList: [],

        /**
         * @cfg {Number} interval msec to do sprite
         */
        interval : 500,

        /**
         * @cfg {String} name of event
         */
        eventName: {
            /* @event Fired sprite is finished*/
            end: 'end',
            /* @event Fired sprite is executed*/
            change: 'change'
        },

        /**
         * @cfg {String} selector of target element
         */
        targetSelector: null,

        /**
         * @cfg {Object} target jQuery element
         */
        $elm: null,

        /**
         * @cfg {Number} total count of sprite
         */
        totalCount: 0,

        /**
         * @cfg {Number} limit of sprite
         */
        limit: null,

        count: 0,

        /**
         * @cfg {Number} interval id to use cancel interval
         */
        intervalId: null,

        /**
         * @constructor
         */
        init: function(config){
            this.$elm = $(config.targetSelector);
            this._super(config);
        },

        /**
         * @method execute sprite
         */
        execute: function(){
            var me = this;
            me.intervalId = setInterval(function(){
                me._doSprite(me.count);
                me._countUp(me.count);
                me.dispatchEvent(me.getEventName().change, me.getTotalCount());
                if(Global.isNumber(me.getLimit()) && me.getTotalCount() === me.getLimit()){
                    window.clearInterval(me.intervalId);
                    me.setTotalCount(0);
                    me.dispatchEvent(me.getEventName().end);
                }
            }, me.interval);
        },

        /**
         * @private
         */
        _doSprite: function(count){
            var me = this,
                cls = me._getClass(count);
            me.$elm.removeClass(cls.current);
            me.$elm.addClass(cls.next);
        },

        /**
         * @private
         */
        _countUp: function(count){
            this.count = (1+count) % (this.classList.length + 1);
            this.totalCount = ++this.totalCount;
        },

        /**
         * @private
         */
        _getClass: function(count){
            var me = this,
                nextIndex = (1 + count) % this.classList.length,
                current = me.classList[count],
                next    = me.classList[nextIndex];
            return {
                current: current,
                next   : next
            };
        }
    });
})();
