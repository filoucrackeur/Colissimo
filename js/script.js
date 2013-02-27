// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38640044-1']);
_gaq.push(['_trackPageview']);


var myStoredColissimo = { "colis": [] };
        
(function($) {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; 
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);

  // Mise en place du focus sur le champs de saisie du code Colissimo
  $('#new-colissimo-code').focus();
  
var lineColissimo = $('tbody').html();


  // Chargement des traductions du template
  
    var tpl = $('.container').html();
  tpl = Mustache.render(tpl,{ 
      "colissimo_my_space" : chrome.i18n.getMessage("colissimo_my_space"),
      "column_ref" : chrome.i18n.getMessage("column_ref"),
      "column_date" : chrome.i18n.getMessage("column_date"),
      "column_type" : chrome.i18n.getMessage("column_type"),
      "column_message" : chrome.i18n.getMessage("column_message"),
      "loading" : chrome.i18n.getMessage("colissimo_loading"),
  });
  $('.container').html(tpl);
  
  // Chargement des colissimo stocké en bdd
  loadStoredColissimo();
  
  // Chargement de la liste des colis suivis
  reloadColissimoList();









    // Au clic sur le bouton d'ajout d'un nouveau colissimo
    $('#add-colissimo').on('click', function () {
        //console.log('Demande dajout de suivi de coli');
        var code = document.getElementById('new-colissimo-code').value;
        
        // recuperation des information en ligne
       chrome.extension.sendMessage('lpjaopmchjjhpadhdocejmopfedmdalb', {
            type: 'getJsonColissimoOnline',
            code: code
        },function(json){
            //console.log('stockage et enregistrement du tableau des colissimo');
       
            myStoredColissimo.colis.push(json);
            stringifiedStoredColissimo = JSON.stringify(myStoredColissimo);
            //console.log(stringifiedStoredColissimo);
            window.localStorage.setItem('myStoredColissimo', stringifiedStoredColissimo);
            displaySuccess("Votre colissimo à été ajouté à la liste des suivis !");
            displayNotification("Votre colissimo à été ajouté à la liste des suivis !",'');
            
        });
            // On fait les vérifications sur la saisie
            //if (isValidColissimo(json) == true) {
              
           
                //reloadColissimoList();
            //}
   
        return true;
    });

    // Affichage d'une alerte erreur
    function displayError(message) {
        $('#message').html(' <div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                                 ' + message + '</div>');
    }

    // Affichage d'une alerte success
    function displaySuccess(message) {
        $('#message').html(' <div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                                 ' + message + '</div>');
    }



    // Vérification qu'il s'agit bien d'un identifiant colissimo
    function isValidColissimo(colissimo) {
        //console.log(colissimo);
        /*if( colissimo.status === false && colissimo.error !== null ){
            displayError(colissimo.message);
            return false;
        } 
        if( window.localStorage.getItem(colissimo.code) ){
            displayError("Vous suivez déja ce colissimo");
            return false;
        }*/
        //console.log('Demande vérification coli existe chez colissimo');
        return true;
    }

    // Suppression de la liste des suivis colissimo
    function removeAllColissimo() {
        //console.log('Demande de suppression des colissimo');
        window.localStorage.clear();
        window.location.reload();
        return true;
    }

    // Suppression de la liste d'un colissmo
    function removeColissimoById(id) {
        //console.log('Demande de suppression des colissimo');
        window.localStorage.removeItem(id);
        //location.reload();
        return true;
    }


    function reloadColissimoList() {
        // On vide les resultats 
        $('tbody tr[class!=hidden]').remove();
        // affichage des resultats
        if ( window.localStorage.length > 0) {

            for ( i in myStoredColissimo.colis){
                $('tbody').append(Mustache.render(lineColissimo,
                { code :  myStoredColissimo.colis[i].code ,
                  message :  myStoredColissimo.colis[i].message ,
                  date :  myStoredColissimo.colis[i].date ,
                  client :  myStoredColissimo.colis[i].client
                }));
                $('tbody tr:last').removeClass('hidden');
            }
        } 
        $('#loader').remove();
    }

    // On click sur une corbeille suppression du storage et du tableau
    $('a.remove').on('click',function () {
        var id = $(this).parent().parent().attr('id');
        
        for( i in myStoredColissimo.colis){
            if( myStoredColissimo.colis[i] == id ){
                delete myStoredColissimo.colis[i];
            }
        }
        
        console.log(myStoredColissimo);
        /*
        stringifiedStoredColissimo = JSON.stringify(myStoredColissimo);
        window.localStorage.removeItem('myStoredColissimo');
        window.localStorage.setItem('myStoredColissimo', stringifiedStoredColissimo);
        
        $('#'+id).remove();
        displaySuccess("Votre colissimo N° "+id+" a été supprimé");
        displayNotification("Votre colissimo N° "+id+" a été supprimé",'');
        */
        return false;
        
        //window.location.reload();
    });

    /**
     * Create a simple text notification:
     * @param string titre
     * @param string message
     */
    function displayNotification(titre, message) {
        
        var notification = webkitNotifications.createNotification('../icon-small.png',titre, message);

        notification.show();
        
        setTimeout(function() { 
            notification.cancel(); 
        }, 5000);
    }
    
    function loadStoredColissimo(){
        var stringifiedColissimo = window.localStorage.getItem('myStoredColissimo');
        if ( stringifiedColissimo !== null ){
            myStoredColissimo = JSON.parse(stringifiedColissimo);
        }
    }

    //chrome.browserAction.setBadgeText({
    //    text: nbNotificationUnread
    //});
    //chrome.i18n.getMessage("colissimo_status");
    // button state demo
    $('#add-colissimo').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
            btn.button('reset')
        }, 1000)
    });


})(jQuery);
