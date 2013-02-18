$(document).ready(function () {
    /*
            $.get('http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code=8G44773369377',
	
                { data: 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv: 1.8.1.3) Gecko/20070309 Firefox/2.0.0.3' },
                function(json) {
                    alert(json);
                });
*/
    //addFollowingPackage();


    var tabColissimo = Array();
    var objColissimo = {};

    // Au clic sur le bouton d'ajout d'un nouveau colissimo
    $('#add-colissimo').on('click', function () {
        addColissimo();
    });




    // Récupération des information sur le coli
    /*
        colissimo = new Object();
        colissimo.code = "8G44773369377";
        colissimo.client = "Particulier";
        colissimo.date = "17\/01\/2013";
        colissimo.message = "Votre colis est livr\u00e9";
        colissimo.gamme = 4;
        colissimo.base_label = "Coliposte";
        colissimo.link = "http:\/\/www.coliposte.net\/particulier\/suivi_particulier.jsp?colispart=8G44773369377";
        colissimo.error = null;
    */
    function getInfoPackage(code) {

        // appel Ajax
        result = $.ajax({
            url: "http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code=" + code,
            type: $(this).attr('method'), // la méthode indiquée dans le formulaire (get ou post)
            data: $(this).serialize(), // je sérialise les donnzes (voir plus loin), ici les $_POST
            dataType: 'json',
            success: function (json) { // je récupère la réponse du fichier PHP
                displaySuccess('<strong>Bravo !</strong> vous suivez maintenant votre coli immatriculé : '+ json.code);
                $('#colissimo-list > tbody:first').prepend('<tr>\n\
                                                            <td>'+ json.code +'</td>\n\
                                                            <td>'+json.code+'</td>\n\
                                                            <td>bb</td>\n\
                                                            <td>'+json.date+'</td>\n\
                                                            <td>'+json.message+'</td>\n\
                                                            <td><a href=""><i class="icon-trash"></i></a></td>\n\
                                                            </tr>');
       
                return json.responseText;
            }
        });

        return result;
    }

    // Affichage d'une alerte erreur
    function displayAlert(message) {
        $('#message').html(' <button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                                 <div class="alert alert-error">' + message + '</div>');
    }

    // Affichage d'une alerte success
    function displaySuccess(message) {
        $('#message').html(' <button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                                 <div class="alert alert-success">' + message + '</div>');
    }

    // Ajout à la liste des colis suivi
    function addColissimo() {
        console.log('Demande d\'ajout de suivi de coli');
        var code = document.getElementById('new-colissimo-code').value;
        console.log('Code colissimo :' + code);

        // recuperation des information en ligne
        colissimo = getInfoPackage(code).responseText;
        
console.log(colissimo);
        //tabColissimo.push(JSON.stringify(colissimo));

        //console.log('stockage et enregistrement du tableau des colissimo');
        //localStorage.setItem('colissimo', tabColissimo);

        return true;
    }


    // Récupération des coli stockés dans le localstorage
    function getStorage() {
        var tabColissimo = localStorage.getItem('colissimo');

        return JSON.parse(tabColissimo);
    }

    // Vérification qu'il s'agit bien d'un identifiant colissimo
    function isColissimoPackage() {
        console.log('Demande vérification coli existe chez colissimo');
        return true;
    }

    // Suppression de la liste des suivis colissimo
    function removeAllColissimo() {
        console.log('Demande de suppression des colissimo');
        localStorage.removeItem('colissimo');
        location.reload();
        return true;
    }

    // Chargement de la liste des colis suivis
    reloadColissimoList();

    function reloadColissimoList() {
        // On vide les resultats 
        $('#colissimo-list > tbody').empty();

        console.log(tabColissimo);
    }

});