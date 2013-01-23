$(document).ready(function() {
	
// $('.suivre').click(function(){
	// 	localStorage.setItem('text','je test');
	
 //});
	$.get('http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code=8G44773369377',
			
			{ data: 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv: 1.8.1.3) Gecko/20070309 Firefox/2.0.0.3' },
			function(json) {
			    alert(json);
			});

 //addFollowingPackage();
});
	 	// Récupération des information sur le coli
	 	function getInfoPackage(code){
	 		
	 		 // appel Ajax
            $.ajax({
                url: "http://www.laposte.fr/outilsuivi/web/suiviInterMetiers.php?key=d112dc5c716d443af02b13bf708f73985e7ee943&method=json&code=8G44773369377", // le nom du fichier indiqué dans le formulaire
                type: $(this).attr('method'), // la méthode indiquée dans le formulaire (get ou post)
                data: $(this).serialize(), // je sérialise les données (voir plus loin), ici les $_POST
                success: function(html) { // je récupère la réponse du fichier PHP
                    alert(html); // j'affiche cette réponse
                }
            });
	 		
	 		
	 		/*coli = new Object();
	 		coli.code = "8G44773369377";
	 		coli.client = "Particulier";
	 		coli.date = "17\/01\/2013";
	 		coli.message = "Votre colis est livr\u00e9";
	 		coli.gamme = 4;
	 		coli.base_label = "Coliposte";
	 		coli.link = "http:\/\/www.coliposte.net\/particulier\/suivi_particulier.jsp?colispart=8G44773369377";
	 		coli.error = null;
	 		*/
	 		
	 		
	 		console.log(coli);

	 		return coli;
	 	}
	 	
	    // Ajout à la liste des colis suivi
	    function addFollowingPackage(){
	    	 console.log('Demande d\'ajout de suivi de coli');
	    	 var code = document.getElementById('code').value;

	    	 console.log('Code :' + code);
	    	 var coli = getInfoPackage(code);
	    	 
	    	 localStorage.setItem(coli.code,coli);
		    return true;
	    }
	    
	    // Vérification qu'il s'agit bien d'un identifiant colissimo
	    function isColissimoPackage(){
	    	console.log('Demande vérification coli existe chez colissimo');
	    	return true;
	    }
	    
	    // Suppression de la liste des suivis colissimo
	    function removeFollowingPackage(id){
	    	console.log('Demande de suppression d\'un suivi');
	    	localStorage.removeItem(coli.code); 
	    	location.reload();
	    	return true;
	    }
	    
	    // Chargement de la liste des colis suivis
	    function load(){
	    	
	    }