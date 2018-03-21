/*

  이 파일은 절대 수정하지 마세요!

 */


/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import each from './each'
import every from './every'
import filter from './filter'
import map from './map'
import parallel from './parallel'
import reduce from './reduce'
import series from './series'
import some from './some'
import waterfall from './waterfall'

export default {
    each: each,
    every: every,
    filter: filter,
    map: map,
    parallel: parallel,
    reduce: reduce,
    series: series,
    some: some,
    waterfall: waterfall,

    // aliases
    all: every,
    any: some,
    forEach: each,
    inject: reduce,
    foldl: reduce,
    select: filter,
};

export {
    each as each,
    every as every,
    filter as filter,
    map as map,
    parallel as parallel,
    reduce as reduce,
    series as series,
    some as some,
    waterfall as waterfall,

    // Aliases
    every as all,
    some as any,
    each as forEach,
    reduce as inject,
    reduce as foldl,
    filter as select,
};

