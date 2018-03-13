/**
 * A collection of `async` utility functions.
 * @module Utils
 */

import concat from './concat'
import each from './each'
import every from './every'
import filter from './filter'
import map from './map'
import parallel from './parallel'
import race from './race'
import reduce from './reduce'
import seq from './seq'
import series from './series'
import some from './some'
import waterfall from './waterfall'

export default {
    concat: concat,
    each: each,
    every: every,
    filter: filter,
    map: map,
    parallel: parallel,
    race: race,
    reduce: reduce,
    seq: seq,
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
    concat as concat,
    each as each,
    every as every,
    filter as filter,
    map as map,
    parallel as parallel,
    race as race,
    reduce as reduce,
    seq as seq,
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

