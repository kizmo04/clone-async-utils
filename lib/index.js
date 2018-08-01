/*

  이 파일은 절대 수정하지 마세요!

 */


/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import compose from './compose'
import detect from './detect'
import each from './each'
import every from './every'
import filter from './filter'
import forever from './forever'
import groupBy from './groupBy'
import map from './map'
import memoize from './memoize'
import parallel from './parallel'
import reduce from './reduce'
import series from './series'
import some from './some'
import times from './times'
import waterfall from './waterfall'
import whilst from './whilst'

export default {
    compose: compose,
    detect: detect,
    each: each,
    every: every,
    filter: filter,
    forever: forever,
    groupBy: groupBy,
    map: map,
    memoize: memoize,
    parallel: parallel,
    reduce: reduce,
    series: series,
    some: some,
    times: times,
    waterfall: waterfall,
    whilst: whilst,

    // aliases
    all: every,
    any: some,
    forEach: each,
    inject: reduce,
    foldl: reduce,
    select: filter,
};

export {
    compose as compose,
    detect as detect,
    each as each,
    every as every,
    filter as filter,
    forever as forever,
    groupBy as groupBy,
    map as map,
    memoize as memoize,
    parallel as parallel,
    reduce as reduce,
    series as series,
    some as some,
    times as times,
    waterfall as waterfall,
    whilst as whilst,

    // Aliases
    every as all,
    some as any,
    each as forEach,
    reduce as inject,
    reduce as foldl,
    filter as select,
};

