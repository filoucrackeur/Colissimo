// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when a message is passed.  We assume that the content script
// wants to show the page action.

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    
  
    if( request && request.type == 'getColissimo' ){
   
        var code = request.code;
        
         var url = 'http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code='+code;
         
         $.get(url, function(json){
            var data = JSON.parse(json);
            //console.log(data);
             sendResponse(data);
            });
        
    }
    return true;
});


chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});