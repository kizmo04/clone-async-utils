var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe('concat', function() {
    this.timeout(250);

    function concatIteratee(callOrder, val, next) {
        setTimeout(function() {
            callOrder.push(val);
            next(null, [val, val+1]);
        }, val * 25);
    }

    it('basics', function(done) {
        var callOrder = [];
        async.concat([1, 3, 2], concatIteratee.bind(this, callOrder), function(err, result) {
            expect(err).to.eql(null);
            expect(callOrder).to.eql([1, 2, 3]);
            expect(result).to.eql([1, 2, 3, 4, 2, 3]);
            done();
        });
    });

    it('error', function(done) {
        async.concat([1, 3, 2], function(val, next) {
            if (val === 3) {
                return next(new Error('fail'));
            }
            next(null, [val, val+1]);
        }, function(err, result) {
            expect(err).to.not.eql(null);
            expect(result).to.eql([1, 2]);
            done();
        });
    });

    it('original untouched', function(done) {
        var arr = ['foo', 'bar', 'baz'];
        async.concat(arr, function(val, next) {
            next(null, [val, val]);
        }, function(err, result) {
            expect(arr).to.eql(['foo', 'bar', 'baz']);
            expect(result).to.eql(['foo', 'foo', 'bar', 'bar', 'baz', 'baz']);
            done();
        });
    });

    it('empty results', function(done) {
        var arr = ['foo', 'bar', 'baz'];
        async.concat(arr, function(val, next) {
            next(null);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.be.an('array').that.is.empty;
            done();
        });
    });

    it('empty arrays', function(done) {
        var arr = ['foo', 'bar', 'baz'];
        async.concat(arr, function(val, next) {
            next(null, []);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.be.an('array').that.is.empty;
            done();
        });
    });

    it('handles empty object', function(done) {
        async.concat({}, function(val, next) {
            assert(false, 'iteratee should not be called');
            next();
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.be.an('array').that.is.empty;
            done();
        });
    });

    it('variadic', function(done) {
        var arr = ['foo', 'bar', 'baz'];
        async.concat(arr, function(val, next) {
            next(null, val, val);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.eql(['foo', 'foo', 'bar', 'bar', 'baz', 'baz']);
            done();
        });
    });

    it('flattens arrays', function(done) {
        var arr = ['foo', 'bar'];
        async.concat(arr, function(val, next) {
            next(null, [val, [val]]);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.eql(['foo', ['foo'], 'bar', ['bar']]);
            done();
        });
    });

    it('handles falsy values', function(done) {
        var falsy = [null, undefined, 0, ''];
        async.concat(falsy, function(val, next) {
            next(null, val);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.eql(falsy);
            done();
        });
    });

    it('handles objects', function(done) {
        var obj = {a: 'foo', b: 'bar', c: 'baz'};
        async.concat(obj, function(val, next) {
            next(null, val);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.eql(['foo', 'bar', 'baz']);
            done();
        });
    });

    it('main callback optional', function(done) {
        var arr = [1, 2, 3];
        var runs = [];
        async.concat(arr, function(val, next) {
            runs.push(val);
            var _done = (runs.length === arr.length);
            async.setImmediate(function() {
                next(null);
                if (_done) {
                    expect(runs).to.eql(arr);
                    done();
                }
            });
        });
    });

    it('iteratee callback is only called once', function(done) {
        async.concat([1, 2], function(val, next) {
            try {
                next(val);
            } catch (exception) {
                expect(function() {
                    next(exception);
                }).to.throw(/already called/);
                done();
            }
        }, function() {
            throw new Error();
        });
    });

    it('preserves order', function(done) {
        var arr = [30, 15];
        async.concat(arr, function(x, cb) {
            setTimeout(function() {
                cb(null, x);
            }, x);
        }, function(err, result) {
            expect(err).to.eql(null);
            expect(result).to.eql(arr);
            done();
        });
    });
});
