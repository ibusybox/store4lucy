function stringEndWith(src, suffix){
    return src.indexOf(suffix, src.length - suffix.length) !== -1;
}

function trim(s){
    return s.replace(/(^\n*)|(\n*$)/g, "");
}

exports.stringEndWith = stringEndWith;
exports.trim = trim;