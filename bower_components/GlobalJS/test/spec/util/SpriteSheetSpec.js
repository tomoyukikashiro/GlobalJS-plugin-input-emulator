
'use strict';

describe('Test for util/SpriteSheet.js', function () {

    var SpriteSheet = Global.util.SpriteSheet,
        $elm, inst;

    beforeEach(function(){
        $elm = $('<div></div>');
        inst = new SpriteSheet({
            classList: ['test1', 'test2', 'test3', 'test4'],
            $elm: $elm
        });
    });

    afterEach(function(){
        $elm = null;
        inst = null;
    });

    it('class has those public method', function () {
        expect(SpriteSheet.prototype.execute).to.be.a('function');
    });

    describe('#execute', function () {
        it('should call dispatchEvent when instace do sprite', function(done){
            inst.limit = 1;
            inst.addEventListener('change', function(e){
                expect(e.data).to.equal(1);
                done();
            });
            inst.execute();
        });

        it('should call clearInterval if you set limit property', function(done){
            var spy = sinon.spy(window, 'clearInterval');
            inst.limit = 1;
            inst.addEventListener('end', function(){
                expect(spy.calledWith(inst.intervalId)).to.be.ok();
                expect(inst.getTotalCount()).to.equal(0);
                done();
            });

            inst.execute();
        });
    });

    describe('#_doSprite', function () {
        // need not to test
    });
    describe('#_countUp', function () {
        it('should set next count in count property of it\'s instance', function () {
            inst._countUp(0);
            expect(inst.count).to.equal(1);
            inst._countUp(1);
            expect(inst.count).to.equal(2);
            inst._countUp(2);
            expect(inst.count).to.equal(3);
            inst._countUp(3);
            expect(inst.count).to.equal(4);

            // reset count
            inst._countUp(4);
            expect(inst.count).to.equal(0);

            expect(inst.totalCount).to.equal(5);
        });
    });
    describe('#_getClass', function () {
        it('shoul return next css classes', function () {
            var res;

            // count is 0
            res = inst._getClass(0);
            expect(res.current).to.equal('test1');
            expect(res.next).to.equal('test2');
            // count is 1
            res = inst._getClass(1);
            expect(res.current).to.equal('test2');
            expect(res.next).to.equal('test3');
            // count is 2
            res = inst._getClass(2);
            expect(res.current).to.equal('test3');
            expect(res.next).to.equal('test4');
            // count is 3
            res = inst._getClass(3);
            expect(res.current).to.equal('test4');
            expect(res.next).to.equal('test1'); // reset class
        });
    });
});
