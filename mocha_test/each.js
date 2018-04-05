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

    it('each empty array - iteratee는 실행되지 않고, 바로 최종 콜백이 실행되어야 한다.', function(done) {
        async.each([], function(x, callback){
            assert(false, 'iteratee should not be called');
            callback();
        }, function(err){
            if (err) throw err;
            assert(true, 'should call callback');
        });
        setTimeout(done, 25);
    });

    it('each error - 에러가 발생할 경우 최종 콜백에 에러 정보를 넘겨주고 실행시킨 후 모든 프로세스를 종료해야 한다.', function(done) {
        async.each([1,2,3], function(x, callback){
            callback('error');
        }, function(err){
            expect(err).to.equal('error');
        });
        setTimeout(done, 50);
    });
});
