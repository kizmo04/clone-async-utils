var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe("map", function() {

    function mapIteratee(call_order, x, callback) {
        setTimeout(function() {
            call_order.push(x);
            callback(null, x * 2);
        }, x * 25);
    }

    it('basic', function(done) {
        var call_order = [];
        async.map([1, 3, 2], mapIteratee.bind(this, call_order), function(err, results) {
            assert(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql([1, 2, 3]);
            expect(results).to.eql([2, 6, 4]);
            done();
        });
    });

    it('map original untouched', function(done) {
        var a = [1, 2, 3];
        async.map(a, function(x, callback) {
            callback(null, x * 2);
        }, function(err, results) {
            expect(results).to.eql([2, 4, 6]);
            expect(a).to.eql([1, 2, 3]);
            done();
        });
    });

    it('map without main callback', function(done) {
        var a = [1, 2, 3];
        var r = [];
        async.map(a, function(x, callback) {
            r.push(x);
            var done_ = r.length == a.length;
            callback(null);
            if (done_) {
                expect(r).to.eql(a);
                done();
            }
        });
    });

    it('map error', function(done) {
        async.map([1, 2, 3], function(x, callback) {
            callback('error');
        }, function(err) {
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });

    it('map undefined array', function(done) {
        async.map(undefined, function(x, callback) {
            callback();
        }, function(err, result) {
            expect(err).to.equal(null);
            expect(result).to.eql([]);
        });
        setTimeout(done, 50);
    });

    it('map object', function(done) {
        async.map({
            a: 1,
            b: 2,
            c: 3
        }, function(val, callback) {
            callback(null, val * 2);
        }, function(err, result) {
            if (err) throw err;
            expect(Object.prototype.toString.call(result)).to.equal('[object Array]');
            expect(result).to.contain(2);
            expect(result).to.contain(4);
            expect(result).to.contain(6);
            done();
        });
    });
});
