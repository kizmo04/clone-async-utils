var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe("each", function() {

    function eachIteratee(args, x, callback) {
        setTimeout(function(){
            args.push(x);
            callback();
        }, x*25);
    }

    function eachNoCallbackIteratee(done, x, callback) {
        expect(x).to.equal(1);
        callback();
        done();
    }

    it('each', function(done) {
        var args = [];
        async.each([1,3,2], eachIteratee.bind(this, args), function(err){
            assert(err === null, err + " passed instead of 'null'");
            expect(args).to.eql([1,2,3]);
            done();
        });
    });

    it('each empty array', function(done) {
        async.each([], function(x, callback){
            assert(false, 'iteratee should not be called');
            callback();
        }, function(err){
            if (err) throw err;
            assert(true, 'should call callback');
        });
        setTimeout(done, 25);
    });


    it('each empty array, with other property on the array', function(done) {
        var myArray = [];
        myArray.myProp = "anything";
        async.each(myArray, function(x, callback){
            assert(false, 'iteratee should not be called');
            callback();
        }, function(err){
            if (err) throw err;
            assert(true, 'should call callback');
        });
        setTimeout(done, 25);
    });


    it('each error', function(done) {
        async.each([1,2,3], function(x, callback){
            callback('error');
        }, function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });
});
