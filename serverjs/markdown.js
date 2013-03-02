/**Markdown Wrapper start**/
var GitHubAPI = require("./github");
var github = new GitHubAPI({
    "version" : "3.0.0",
    "timeout" : 5000
});


function createMarkdownMsg(text){
    this.text = text;
    this.mode = 'markdown';
    //this.context = 'optional';
}

function convertMD2HTML(md, callback){
    var msg = new createMarkdownMsg(md);
    github.markdown.render(msg, callback);
}
/**Markdown Wrapper end**/

exports.convertMD2HTML = convertMD2HTML;
