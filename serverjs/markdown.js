/**Markdown Wrapper start**/
var pagedown = require('./pagedown');
var converter = new pagedown.Converter();

function convertMD2HTML(md){
    return converter.makeHtml(md);
}
/**Markdown Wrapper end**/

exports.convertMD2HTML = convertMD2HTML;
