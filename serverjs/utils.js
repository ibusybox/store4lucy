function stringEndWith(src, suffix){
    return src.indexOf(suffix, src.length - suffix.length) !== -1;
}

exports.stringEndWith = stringEndWith;