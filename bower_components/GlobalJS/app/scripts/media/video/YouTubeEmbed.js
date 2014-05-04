(function(){
    'use strict';

    /**
     * @class Global.media.video.YouTubeEmbed
     * @extend Global.ObservableClass
     *
     *
     *     var embed = Global.media.video.YouTubeEmbed({
     *         id: 'test',
     *         param: {
     *             videoId: 'M7lc1UVf-VE'
     *         }
     *     });
     *     embed.initSdk();
     */
    Global.define('Global.media.video.YouTubeEmbed',{

        extend: Global.ObservableClass,

        eventName: {
            /**
             * @event loadsdk
             * Fired when youtube sdk is loaded
             * @param {Global.media.video.YouTubeEmbed} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            loadSdk   : 'loadsdk',
            /**
             * @event loadplayer
             * Fired when player is loaded
             * @param {Global.media.video.YouTubeEmbed} target this class.
             * @param {String} eventName this event name.
             * @param {Object} data data of this event.
             */
            loadPlayer: 'loadplayer'
        },

        /**
         * @cfg {String} id player id
         */
        id: '',

        /**
         * @cfg {String} sdkId sdk id
         */
        sdkId: 'g-youtube-embed',

        /**
         * @cfg {String} sdkSrc src of sdk
         */
        sdkSrc: 'https://www.youtube.com/iframe_api',

        /**
         * @cfg {Object} inst instance of youtube embed class
         */
        inst: null,

        /**
         * @cfg {Object} param parameter set to embed class
         * @see https://developers.google.com/youtube/iframe_api_reference?hl=ja#Loading_a_Video_Player
         */
        param: null,

        /**
         * @method init
         * @constructor
         */
        init: function(config){
            this._super(config);
        },

        /**
         * @method initsdk
         */
        initSdk: function(){
            if(this._hasSdk()){
                this._onLoadSdk();
                return;
            }
            this._appendSdk();
        },

        /**
         * @method embed
         */
        embed: function(){
            var param = this._getParam(),
                inst = this._createEmbedInstance(param);
            this.inst = inst;
        },

        /**
         * @method _appendSdk
         * @private
         */
        _appendSdk: function(){
            window.onYouTubeIframeAPIReady = Global.Functions.bind(this._onLoadSdk, this);
            var $script = this._getSdkCode();
            $(document.body).append($script);
        },

        /**
         * @method _onLoadSdk
         * @private
         */
        _onLoadSdk: function(){
            this.dispatchEvent(this.getEventName().loadSdk, {currentTarget: this});
            this.embed();
        },

        /**
         * @method _hasSdk
         * @private
         */
        _hasSdk: function(){
            var $sdk = $('#' + this.getSdkId());
            return ($sdk.length > 0) && window.YT;
        },

        /**
         * @method _getSdkCode
         * @private
         */
        _getSdkCode: function(){
            var $script = $('<script>'),
                id = this.getSdkId(),
                src = this.getSdkSrc();
            $script.prop('id', id);
            $script.prop('src', src);
            return $script;
        },

        /**
         * @method _createEmbedInstance
         * @private
         */
        _createEmbedInstance: function(param){
            return new window.YT.Player(this.getId(), param);
        },

        /**
         * @method _getParam
         */
        _getParam: function(){
            var param = this.getParam(),
                add = {
                    events: {
                        'onReady': Global.Functions.bind(this._onReadyVideo, this)
                    }
                };
            return $.extend(true, {}, param, add);
        },

        /**
         * @method _onReadyVideo
         * @private
         */
        _onReadyVideo: function(/*e*/){
            this.dispatchEvent(this.getEventName().loadPlayer, {currentTarget: this});
            // override as you like
            // event.target.playVideo();
        }

    });
})();
