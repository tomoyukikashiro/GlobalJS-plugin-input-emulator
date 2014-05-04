
'use strict';

describe('Test for app/Router.js', function () {

    var Router = Global.app.Router,
        instance;

    beforeEach(function(){
        instance = new Router({
            routing: {
                '/': function(){this.id = '/';},
                'test': function(){this.id = 'test';}
            }
        });
    });

    afterEach(function(){
        instance = null;
    });

    it('class has those public method', function(){
        expect(instance.start).to.be.a('function');
    });

    describe('#_getController', function () {
        it('should class if pathname mathes class name', function(){
            var Klass = instance._getController('/', instance.getRouting());
            expect(new Klass().id).to.equal('/');

            Klass = instance._getController('test', instance.getRouting());
            expect(new Klass().id).to.equal('test');

            Klass = instance._getController('test/', instance.getRouting());
            expect(new Klass().id).to.equal('test');
        });
    });

    describe('#_getNoLastSlashPath', function(){
        it('should return path name', function(){
            expect(instance._getNoLastSlashPath('test')).to.equal('test');
        });
        it('should return path name which dose not have last slash', function(){
            expect(instance._getNoLastSlashPath('test/')).to.equal('test');
        });
    });
});
