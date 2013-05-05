/**
* Export product as quatation.
* @api public
*/
function handleExportProductAsQuatation(){
    var idList = getURLParameter('id_list');
    $.get( URL_QUERY_PRODUCT_LIST_JSON + '/?id_list=' + idList, function(productList){
        var data = {product_list: productList};
        var html = new EJS({url: '/script/product/product_export.ejs'}).render(data);
        $('body').append(html);

        //save pdf from html

    }, 'json' );
}

function savePDFFromHTML(){
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function(element, renderer){
            return true;
        }
    };
    doc.fromHTML($('body').get(0), 15, 15, {
        'width': 170, 
        'elementHandlers': specialElementHandlers
    });

    doc.save('Quatation.pdf');    
}

/**
* from http://web2.pdfonline.com/pdfonline/pdfonline.js
* I want to change the button style so i customized it.
*/
function savePageAsPDF()
{
    var authorId = "326D6B65-0AEB-42AA-8C3C-C355DE457C42";
    var pageOrientation = "0";
    var topMargin = "0.5";
    var bottomMargin = "0.5";
    var leftMargin = "0.5";
    var rightMargin = "0.5";

    
    var sUriRequest = "";

    sUriRequest = "author_id=" + authorId;
    sUriRequest += "&page=" + pageOrientation;
    sUriRequest += "&top=" + topMargin;
    sUriRequest += "&bottom=" + bottomMargin;
    sUriRequest += "&left=" + leftMargin;
    sUriRequest += "&right=" + rightMargin;

    // savepageaspdf.pdfonline.com
    var pURL = "http://savepageaspdf.pdfonline.com/pdfonline/pdfonline.asp?cURL=" + escape(document.location.href) + "&" + sUriRequest;
    window.open(pURL, "PDFOnline", "scrollbars=yes,resizable=yes,width=640,height=480,menubar,toolbar,location");
}