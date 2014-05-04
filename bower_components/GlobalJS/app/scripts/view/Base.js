(function(){
    'use strict';

    /**
     * @class Global.view.Base
     * base class of view.
     * @extend Global.core.ManipulateDomClass,
     */
    Global.define('Global.view.Base',{

        extend: Global.core.ManipulateDomClass,

        EVENT: {
            /**
             * @event show
             * Fired when modal is showed
             */
            show: 'show',
            /**
             * @event hide
             * Fired when modal is hidden
             */
            hide: 'hide'

        },

        /**
         * @method
         * show modal
         */
        show: function(){
            var $elm = this.get$elm();

            $elm.show();
            this.dispatchEvent(this.EVENT.SHOW);
        },

        /**
         * @method
         * hide modal
         */
        hide: function(){
            var $elm = this.get$elm();

            $elm.hide();
            $elm.remove();
            this.dispatchEvent(this.EVENT.HIDE);
        }

    });
})();
