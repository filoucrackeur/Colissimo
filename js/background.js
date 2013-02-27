var nbNotificationUnread = '';
var myColissimo = [];

chrome.extension.onMessage.addListener(function(request, sender, sendResponse ) {
console.log(request.type);
    if( request ){
        
        switch( request.type ){
   
            case 'getJsonColissimoOnline':
                var code = request.code;
                var url = 'http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code='+code;
console.log(url);
                 $.get(url, function(json){
                    var data = JSON.parse(json);
                    console.log(data);
                     sendResponse(data);
                 });
                 break;
            case 'getColissimo':
                break;
            case 'getTabColissimo':
                break;
            case 'isExistColissimo':
                break;
            case 'addColissimo':
                break;
            case 'removeColissimo':
                break;
            case 'removeAllColissimo':
                break;
        }
    }
    return true;
});