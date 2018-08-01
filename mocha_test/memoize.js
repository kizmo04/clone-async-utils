var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');

describe("memoize", function() {

    it('basic', function(done) {
        var slow_fn = function (name, callback) {
            setTimeout(function() {
                callback(null, name + ' dracarys!');
            }, 100);
        };
        var fn = async.memoize(slow_fn);
        fn('kizmo', function(err, result) {
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.eql("kizmo dracarys!");
            done();
        });
    });

});
