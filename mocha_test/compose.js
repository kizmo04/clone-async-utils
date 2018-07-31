var async = require('../lib');
var expect = require('chai').expect;
var assert = require('assert');
var getFunctionsObject = require('./support/get_function_object');
var add1 = function (n, callback) {
    setTimeout(function () {
        callback(null, n + 1);
    }, 10);
};
var mul3 = function (n, callback) {
    setTimeout(function () {
        callback(null, n * 3);
    }, 10);
};

describe('compose', function() {

    it('compose', function(done) {
        var add1mul3 = async.compose(mul3, add1);
        add1mul3(4, function (err, result) {
            assert(err === null, err + " passed instead of 'null'");
            expect(result).to.eql(15);
            done();
        });
    });

});
