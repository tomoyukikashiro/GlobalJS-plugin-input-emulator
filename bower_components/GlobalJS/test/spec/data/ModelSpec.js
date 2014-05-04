
'use strict';

describe('Test for data/Model.js', function () {

    var Model = Global.data.model.Model,
        inst;

    beforeEach(function(){
        inst = new Model();
    });

    afterEach(function(){
        inst = null;
    });

    it('class has those public method', function () {
        expect(inst.get).to.be.a('function');
    });

    describe('#_modifyData', function () {
        it('should return same object', function(){
            var res = {data: 'test'};
            expect(inst._modifyData(res)).to.equal(res);
        });
    });

    describe('#_onSuccess', function(){
        it('set data in prop and resolve defferred', function(){
            var spy = sinon.spy(inst, 'dispatchEvent'),
                res = {test: 'test'};

            inst._onSuccess(res);
            expect(spy.calledWith('load', res)).to.be.ok();
            expect(inst.data).to.equal(res);

            spy.restore();
        });
    });

    describe('#_getRequestObj', function(){
        it('extends parameter by using param you passed', function(){
            var data = {
                    name: 'test name',
                    desc: 'test desc'
                },
                ept = {
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        name: 'test name',
                        desc: 'test desc'
                    }
                };
            expect(inst._getRequestObj('GET', data)).to.eql(ept);
        });
    });

    describe('#_request', function(){
        it('return object jQuery defferred interface', function(){
            var res = inst._request({});
            expect(res.done).to.be.a('function');
            expect(res.fail).to.be.a('function');
            expect(res.then).to.be.a('function');
        });
        it('should onSuccess method when request is success', function(){
            var dfd = $.Deferred(),
                stub = sinon.stub(inst.proxy, 'get').returns(dfd),
                spy = sinon.spy(inst, '_onSuccess');

            inst._request({});
            dfd.resolve();

            expect(spy.called).to.be.ok();

            spy.restore();
            stub.restore();
        });
    });
});
