
'use strict';

describe('Test fro media/video/YouTubeEmbed', function () {

    var YouTubeEmbed = Global.media.video.YouTubeEmbed,
        instance;

    it('instance has those public method', function () {
        expect(YouTubeEmbed.prototype.embed).to.be.a('function');
        expect(YouTubeEmbed.prototype.initSdk).to.be.a('function');
    });

    beforeEach(function() {
        instance = new YouTubeEmbed({
            id: 'test',
            param: {
                videoId: 'M7lc1UVf-VE'
            }
        });
    });

    afterEach(function() {
        instance = null;
        window.YT = null;
    });

    describe('#_hasSdk', function () {
        it('return true if sdk script element exist and YT object is exist too.', function () {
            $(document.body).append('<div id="g-youtube-embed"></div>');
            window.YT = {};
            expect(instance._hasSdk()).to.be.ok();
            $('#g-youtube-embed').remove();
        });
        it('return false if sdk script element dose not exist', function() {
            window.YT = {};
            expect(instance._hasSdk()).to.not.be.ok();
        });
        it('return false if YT object dose not exist', function() {
            $(document.body).append('<div id="g-youtube-embed"></div>');
            expect(instance._hasSdk()).to.not.be.ok();
            $('#g-youtube-embed').remove();
        });
    });

    describe('#initSdk', function() {
        it('call #_onLoadSdk if #_hasSdk return true', function() {
            var stub = sinon.stub(instance, '_hasSdk').returns(true),
                spy1 = sinon.stub(instance, '_onLoadSdk'),
                spy2 = sinon.stub(instance, '_appendSdk');

            instance.initSdk();

            expect(spy1.called).to.be.ok();
            expect(spy2.called).to.not.be.ok();

            stub.restore();
            spy1.restore();
            spy2.restore();
        });

        it('call #_appendSdk if #_hasSdk return false', function() {
            var stub = sinon.stub(instance, '_hasSdk').returns(false),
                spy1 = sinon.stub(instance, '_appendSdk'),
                spy2 = sinon.stub(instance, '_onLoadSdk');

            instance.initSdk();

            expect(spy1.called).to.be.ok();
            expect(spy2.called).to.not.be.ok();

            stub.restore();
            spy1.restore();
            spy2.restore();
        });
    });

    describe('#embed', function() {
        it('call #_createEmbedInstance with parameter you passed', function() {
            var spy = sinon.stub(instance, '_createEmbedInstance'),
                args;
            instance.embed();
            args = spy.args[0][0];
            expect(spy.called).to.ok();
            expect(args.videoId).to.equal('M7lc1UVf-VE');
            spy.restore();
        });
    });

});
