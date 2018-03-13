var async = require('../lib');
var expect = require('chai').expect;
var _ = require('lodash');

describe("every", function () {

    it('true', function(done){
        async.every([1,2,3], function(x, callback){
            setTimeout(function(){callback(null, true);}, 0);
        }, function(err, result){
            expect(err).to.equal(null);
            expect(result).to.equal(true);
            done();
        });
    });

    it('false', function(done){
        async.every([1,2,3], function(x, callback){
            setTimeout(function(){callback(null, x % 2);}, 0);
        }, function(err, result){
            expect(err).to.equal(null);
            expect(result).to.equal(false);
            done();
        });
    });

    it('early return', function(done){
        var call_order = [];
        async.every([1,2,3], function(x, callback){
            setTimeout(function(){
                call_order.push(x);
                callback(null, x === 1);
            }, x*5);
        }, function(){
            call_order.push('callback');
        });
        setTimeout(function(){
            expect(call_order).to.eql([1,2,'callback',3]);
            done();
        }, 25);
    });

    it('error', function(done){
        async.every([1,2,3], function(x, callback){
            setTimeout(function(){callback('error');}, 0);
        }, function(err, result){
            expect(err).to.equal('error');
            expect(result).to.not.exist;
            done();
        });
    });

});
