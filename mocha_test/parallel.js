var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');
var getFunctionsObject = require('./support/get_function_object');

describe('parallel', function() {

    it('parallel', function(done) {
        var call_order = [];
        async.parallel([
            function(callback){
                setTimeout(function(){
                    call_order.push(1);
                    callback(null, 1);
                }, 50);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(2);
                    callback(null, 2);
                }, 100);
            },
            function(callback){
                setTimeout(function(){
                    call_order.push(3);
                    callback(null, 3,3);
                }, 25);
            }
        ],
        function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(call_order).to.eql([3,1,2]);
            expect(results).to.eql([1,2,[3,3]]);
            done();
        });
    });

    it('parallel empty array', function(done) {
        async.parallel([], function(err, results){
            assert(err === null, err + " passed instead of 'null'");
            expect(results).to.eql([]);
            done();
        });
    });

    it('parallel error', function(done) {
        async.parallel([
            function(callback){
                callback('error', 1);
            },
            function(callback){
                callback('error2', 2);
            }
        ],
        function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 100);
    });

    it('parallel no callback', function(done) {
        async.parallel([
            function(callback){callback();},
            function(callback){callback(); done();},
        ]);
    });

    it('parallel object', function(done) {
        var call_order = [];
        async.parallel(getFunctionsObject(call_order), function(err, results){
            expect(err).to.equal(null);
            expect(call_order).to.eql([3,1,2]);
            expect(results).to.eql({
                one: 1,
                two: 2,
                three: [3,3]
            });
            done();
        });
    });

    // Issue 10 on github: https://github.com/caolan/async/issues#issue/10
    it('paralel falsy return values', function(done) {
        function taskFalse(callback) {
            async.nextTick(function() {
                callback(null, false);
            });
        }
        function taskUndefined(callback) {
            async.nextTick(function() {
                callback(null, undefined);
            });
        }
        function taskEmpty(callback) {
            async.nextTick(function() {
                callback(null);
            });
        }
        function taskNull(callback) {
            async.nextTick(function() {
                callback(null, null);
            });
        }
        async.parallel(
            [taskFalse, taskUndefined, taskEmpty, taskNull],
            function(err, results) {
                expect(results.length).to.equal(4);
                assert.strictEqual(results[0], false);
                assert.strictEqual(results[1], undefined);
                assert.strictEqual(results[2], undefined);
                assert.strictEqual(results[3], null);
                done();
            }
        );
    });
});
