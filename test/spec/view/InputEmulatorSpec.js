(function() {

    'use strict';

    describe('Test for view/InputEmulator.js', function () {

        var InputEmulator = Global.view.InputEmulator,
            $output = $('<textarea></textarea>'),
            inst;

        $(document.body).append($output);

        beforeEach(function(){
            inst = new InputEmulator({
                $elm: $output,
                data: []
            });
        });

        afterEach(function(){
            $output.val('');
        });

        it('class has those public method', function(){
            expect(InputEmulator.prototype.start).to.be.a('function');
        });

        describe('#_modifyData', function () {
            it('return string array which is split each text you passed', function() {
                var data = ['name'],
                    res = inst._modifyData(data);
                expect(res).to.eql(['n','a','m','e']);

                data = ['name', {'key': 'test'}];
                res = inst._modifyData(data);
                expect(res).to.eql(['n', 'a', 'm', 'e', 'k', 'e', 'y', '$', '$', '$', 'test']);
            });
        });

        describe('#_switchStart', function() {
            it('call _removeAll and _doStart if $output has some data', function() {
                var spy = sinon.stub(inst, '_removeAll');
                $output.val('test');
                inst._switchStart(['n','a','m','e']);
                expect(spy.called).to.be.ok();
                spy.restore();
            });
            it('call _doStart if $output has no data', function() {
                var spy = sinon.stub(inst, '_doStart');
                inst._switchStart(['n','a','m','e']);
                expect(spy.called).to.be.ok();
                spy.restore();
            });
        });

        describe('#_removeAll', function() {
            it('remove all text and call callback after all text are removed', function() {
                var clock = sinon.useFakeTimers(),
                    spy = sinon.spy(),
                    delay = inst.getRemoveAllDelay();

                $output.val('test');

                inst._removeAll(spy);

                clock.tick(delay);
                expect($output.val()).to.equal('tes');
                expect(spy.called).to.not.be.ok();

                clock.tick(delay);
                expect($output.val()).to.equal('te');
                expect(spy.called).to.not.be.ok();

                clock.tick(delay);
                expect($output.val()).to.equal('t');
                expect(spy.called).to.not.be.ok();

                clock.tick(delay);
                expect($output.val()).to.equal('');
                expect(spy.called).to.be.ok();
                
                clock.restore();
            });
        });

        describe('#_next', function() {
            it('dispatch end event if data is empty or undefined', function() {
                var spy = sinon.spy(inst, 'dispatchEvent');
                
                inst._next();
                expect(spy.calledWith('end')).to.be.ok();
                spy.restore();

                inst._next([]);
                expect(spy.calledWith('end')).to.be.ok();
                spy.restore();
            });
            it('call _switchNext', function() {
                var spy = sinon.spy(inst, '_switchNext');
                
                inst._next(['t','e','s','t']);

                expect(spy.calledWith('t', ['e','s','t'])).to.be.ok();
                spy.restore();
            });
        });

        describe('#_getNext', function() {
            it('return next chara and modify original data', function() {
                var data = ['t','e','s','t'],
                    res = inst._getNext(data);
                expect(res).to.equal('t');
                expect(data).to.eql(['e','s','t']);
            });
        });

        describe('#_switchNext', function() {
            it('call #_remove and #_loopNext if next key is same as this.getBsKey()', function() {
                var next = '#',
                    data = ['e','s','t'],
                    spy1 = sinon.stub(inst, '_remove'),
                    spy2 = sinon.stub(inst, '_loopNext');

                inst._switchNext(next, data);

                expect(spy1.calledWith(next, data)).to.be.ok();
                expect(spy2.calledWith(data)).to.be.ok();

                spy1.restore();
                spy2.restore();
            });
            it('call #_remove and #_loopNext if next key is same as this.getImmediateBsKey()', function() {
                var next = '$',
                    data = ['e','s','t'],
                    spy1 = sinon.stub(inst, '_remove'),
                    spy2 = sinon.stub(inst, '_loopNext');

                inst._switchNext(next, data);

                expect(spy1.calledWith(next, data)).to.be.ok();
                expect(spy2.calledWith(data, true)).to.be.ok();

                spy1.restore();
                spy2.restore();
            });
            it('call #_insert and #_loopNext if next key is not same as this.getBsKey() or this.getImmediateBsKey()', function() {
                var next = 't',
                    data = ['e','s','t'],
                    spy1 = sinon.stub(inst, '_insert'),
                    spy2 = sinon.stub(inst, '_loopNext');

                inst._switchNext(next, data);

                expect(spy1.calledWith(next, data)).to.be.ok();
                expect(spy2.calledWith(data)).to.be.ok();

                spy1.restore();
                spy2.restore();
            });
 
        });
    });

})();
