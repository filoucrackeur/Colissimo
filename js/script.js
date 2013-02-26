// google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-38640044-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; 
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);

    $('#new-colissimo-code').focus();
    // Chargement de la liste des colis suivis

    reloadColissimoList();

    // Au clic sur le bouton d'ajout d'un nouveau colissimo
    $('#add-colissimo').on('click', function () {
        addColissimo();
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

    // Ajout à la liste des colis suivi
    function addColissimo() {

        console.log('Demande d\'ajout de suivi de coli');
        var code = document.getElementById('new-colissimo-code').value;

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

    // Vérification qu'il s'agit bien d'un identifiant colissimo
    function isValidColissimo(colissimo) {
        console.log(colissimo);
        if( colissimo.status == false && colissimo.error != null ){
            displayError(colissimo.message);
            return false;
        } 
        if( window.localStorage.getItem(colissimo.code) ){
            displayError("Vous suivez déja ce colissimo");
            return false;
        }
        console.log('Demande vérification coli existe chez colissimo');
        return true;
    }

    // Suppression de la liste des suivis colissimo
    function removeAllColissimo() {
        console.log('Demande de suppression des colissimo');
        window.localStorage.clear();
        window.location.reload();
        return true;
    }

    // Suppression de la liste d'un colissmo
    function removeColissimoById(id) {
        console.log('Demande de suppression des colissimo');
        window.localStorage.removeItem(id);
        //location.reload();
        return true;
    }


    function reloadColissimoList() {
        // On vide les resultats 
        $('#colissimo-list > tbody').empty();

        // affichage des resultats
        if (window.localStorage.length > 0) {
            Object.keys(localStorage).forEach(function (key) {
                var colissimo = window.localStorage.getItem(key);
                var coli = JSON.parse(colissimo);
                $('#colissimo-list > tbody').prepend('<tr id="' + coli.code + '">\n\
                                                                <td class="hidden-phone"><img src="../img/boite.png" width="50" /></td>\n\
                                                                <td><a href="' + coli.link + '">' + coli.code + '</a></td>\n\
                                                                <td class="hidden-phone">' + coli.client + '</td>\n\
                                                                <td class="hidden-phone">' + coli.date + '</td>\n\
                                                                <td class="muted">' + coli.message + '</td>\n\
                                                                <td><a href="javascript:;" title="Supprimer le colissimo"  class="remove"><i class="icon-trash"></i></a></td>\n\
                                                                </tr>');
                //console.log(coli);
            });
        } else {
            $('#colissimo-list > tbody').prepend('<tr>\n\
                    <td colspan="6">\n\
                        <p class="text-center">Aucun colissimo suivi pour le moment.</p>\n\
                    </td>\n\
                 </tr>');
        }

    }

    $('a.remove').click(function () {
        var id = $(this).parent().parent().attr('id');
        console.log('Demande de suppression coli : ' + id);
        window.localStorage.removeItem(id);
        $('#'+id).remove();
        displaySuccess("Votre colissimo N° "+id+" a été supprimé");
        displayNotification("Votre colissimo N° "+id+" a été supprimé",'');
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

    chrome.browserAction.setBadgeText({
        text: 'R'
    });
    //chrome.i18n.getMessage("colissimo_status");
    // button state demo
    $('#add-colissimo').click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
            btn.button('reset')
        }, 1000)
    });


})();
