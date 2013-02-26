/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /[A-Z0-9]{13}/g;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
  // The regular expression produced a match, so notify the background page.
  var foundColissimoCodes = document.body.innerText.match(regex);

  Object.keys(foundColissimoCodes).forEach(function (key) {
       document.body.innerHTML = document.body.innerHTML.replace(foundColissimoCodes[key], '<span class="extension-colissimo input-append"><input type="text" class="input-xlarge" id="new-colissimo-code" name="new-colissimo-code"  maxlength="13" value="'+foundColissimoCodes[key]+'"><button type="button" class="btn btn-primary" id="add-colissimo" data-loading-text="Récupération colissimo"><i class="colissimo-icon-plus-sign colissimo-icon-white"></i> <strong></strong></button></span>');
      
        // recuperation des information en ligne
        chrome.extension.sendMessage('mfdnmofcchnnnkbkgccfioiejlhjmnij', {
            type: 'getColissimo',
            code: foundColissimoCodes[key]
        }, function (json) {
            // On fait les vérifications sur la saisie
            if (isValidColissimo(json) == true) {
                console.log('stockage et enregistrement du tableau des colissimo');
                var colissimo = JSON.stringify(json);
                window.localStorage.setItem(json.code, colissimo);
            }
        });
      
      
      
      
  });
    
 
  //chrome.extension.sendRequest({}, function(response) {});
} else {
  // No match was found.
}



    // Vérification qu'il s'agit bien d'un identifiant colissimo
    function isValidColissimo(colissimo) {
        console.log(colissimo);
        if( colissimo.status == false && colissimo.error != null ){
          
            return false;
        } 
        if( window.localStorage.getItem(colissimo.code) ){
            return false;
        }
        return true;
    }



    // Ajout à la liste des colis suivi
    function addColissimo(code) {

        console.log('Demande d\'ajout de suivi de coli');
        var code = code;

        // recuperation des information en ligne
        chrome.extension.sendMessage('mfdnmofcchnnnkbkgccfioiejlhjmnij', {
            type: 'getColissimo',
            code: code
        }, function (json) {
            // On fait les vérifications sur la saisie
            if (isValidColissimo(json) == true) {
                console.log('stockage et enregistrement du tableau des colissimo');
                var colissimo = JSON.stringify(json);
                window.localStorage.setItem(json.code, colissimo);
                displaySuccess("Votre colissimo à été ajouté à la liste des suivis !");
                displayNotification("Votre colissimo à été ajouté à la liste des suivis !",'');
                reloadColissimoList();
            }
        });

        return true;
    }


chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

        sendResponse({});
  });
