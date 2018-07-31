/**
 * Creates a function which is a composition of the passed asynchronous functions.
 * Each function consumes the return value of the function that follows.
 * Composing functions f(), g(), and h() would produce the result of f(g(h())), only this version uses callbacks to obtain the
 *  return values.
 *
 * Each function is executed with the this binding of the composed function.
 *
 * @param {Functions} functions - the asynchronous functions to compose
 *
 * @returns an asynchronous function that is the composed asynchronous functions
 *
 * function add1(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n + 1);
 *     }, 10);
 * }
 *
 * function mul3(n, callback) {
 *     setTimeout(function () {
 *         callback(null, n * 3);
 *     }, 10);
 * }
 *
 * var add1mul3 = async.compose(mul3, add1);
 * add1mul3(4, function (err, result) {
 *     // result now equals 15
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function compose (...functions) {
    return function getComposed (item, callback) {
        let i = 0;

        functions[functions.length - 1 - i](item, secondCallback);

        function secondCallback (err, result) {
            i++;
            if (err) {
                callback(err);
            } else {
                if (i === functions.length) {
                    callback(null, result);
                } else {
                    functions[functions.length - 1 - i](result, secondCallback);
                }
            }
        }
    };
}
