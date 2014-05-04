(function(){
    'use strict';

    /**
     * @class Global.view.Modal
     * base modal class of view
     * @extend Global.view.Base
     */
    Global.define('Global.view.Modal',{

        extend: Global.view.Base,

        /**
         * @cfg {Boolean} whether modal is centered or not
         */
        centerd: true,

        /**
         * @cfg {String} css class which is added outer element of modal
         */
        cls: null,

        /**
         * @cfg {Boolean} whether modal is hide when user click background
         */
        hideOnMaskClick: false,

        /**
         * @cfg {String} template of modal's outer
         */
        outerTpl: '<div class="g-modal <%= centerdCls %> <%= cls %>"></div>',
        /**
         * @cfg {String} template of modal mask(background)
         */
        maskTpl: '<div class="g-modal__mask <%= centerdCls %> <%= cls %>"></div>',
        /**
         * @cfg {String} modal inner template
         */
        tpl: [],

        /**
         * @cfg {Object} modal jquery element
         */
        $elm: null,

        compiledOuterTpl: null,
        compiledMaskTpl: null,
        compiledTpl: null,

        /**
         * @constructor
         */
        init: function(config) {
            this._super(config);
            this.compiledOuterTpl = this._getCompiledOuterTpl();
            this.compiledMaskTpl  = this._getCompiledMaskTpl();
            this.compiledTpl = this._getCompiledTpl();
        },

        /**
         * @method
         * show modal
         */
        show: function(config){
            var tplData =this._getTplData(config),
                $elm, $mask, $body;

            if(this.$elm){
                return;
            }

            this._create(tplData);
            this._setElmCaches(this.getRefs());
            this._applyEvents(this.getEvents());

            $elm = this.$elm;
            $mask = this.$mask;
            $body = $(document.body);

            $body.append($elm);
            $body.append($mask);

            $elm.show();
            $mask.show();

            this.dispatchEvent(this.getEventName().show);
        },

        /**
         * @method
         * @private
         */
        _create: function(tplData){
            var compiledOuterTpl = this.getCompiledOuterTpl(),
                compiledMaskTpl = this.getCompiledMaskTpl(),
                compiledTpl = this.getCompiledTpl(),
                outerHtml = compiledOuterTpl(tplData),
                maskHtml = compiledMaskTpl(tplData),
                html = compiledTpl(tplData),
                $elm = $(outerHtml),
                $mask = $(maskHtml);

            $elm.append(html);
            $elm.hide();
            $mask.hide();

            this.$elm = $elm;
            this.$mask = $mask;

            if(this.getHideOnMaskClick()){
                this._bindMaskClickHide($mask);
            }else{
                this._bindMaskClickNone($mask);
            }
        },

        /**
         * @method
         * @private
         */
        _bindMaskClickHide: function($mask){
            var me = this;
            $mask.on('click', function(){
                me.hide();
            });
        },

        /**
         * @method
         * @private
         */
        _bindMaskClickNone: function($mask){
            $mask.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
            });
        },

        /**
         * @method
         * @private
         */
        _getTplData: function(config){
            var modalTplData = this._getModalTplData();
            return $.extend(true, {}, modalTplData, config);
        },

        /**
         * @method
         * hide modal
         */
        hide:function(){
            this.$elm.hide();
            this.$elm.remove();
            this.$mask.hide();
            this.$mask.remove();

            this.$elm = null;
            this.$mask = null;

            this.dispatchEvent(this.getEventName().hide);
        },

        /**
         * @method
         * @private
         */
        _getCompiledOuterTpl: function(){
            return _.template(this.getOuterTpl());
        },

        /**
         * @method
         * @private
         */
        _getCompiledMaskTpl: function(){
            return _.template(this.getMaskTpl());
        },

        /**
         * @method
         * @private
         */
        _getCompiledTpl: function(){
            return _.template(this.getTpl());
        },

        /**
         * @method
         * @private
         */
        _getModalTplData: function(){
            var cls = this.getCls() ? this.getCls() : '',
                centerdCls= this.getCenterd() ? 'g-modal--centerd' : '';
            return {
                'cls'       : cls,
                'centerdCls': centerdCls
            };
        }

    });
})();
