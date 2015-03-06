var ready; 
ready = function(){
	var itemid;
	var itemimg;
	$('.imgAdd').click(function(){
		itemid = $(this).attr("id");
	});
	$('img').click(function(){
		itemimg = $(this).attr("src");
		$(".imgAdd#"+itemid).html("<img src='" +itemimg +"'>");
	});	


	var id;
	var tmpidL;
	var tmpidR;
	var side;
	var clickedLeft = false;
	var clickedRight = false;

	//Funktion Hover welche zwei Funktionen enthält (mouseenter, mouseleave)
	$('#row > img').hover(
		//Mousenter function
		function(){
		//Speichert die klasse vom mouse enter event in die variabe Seite (left or right)
		side = $(this).attr("class").split(' ')[0];
		//Speichert die id vom mouse entered in diese variable
		id = $(this).attr("id");
			//Wenn links noch nicht geklickt wurde und man auf der linken seite ist
			if(!clickedLeft && side == "left"){
				//YOU wird nicht mehr angezeigt sondern der Name des Champions bei dem man drüber ist
				$('#you > div#' + id).css("display","block");
				$('#you > div#default').css("display","none");
				//Zeige Das Bild auf der linken seite mit der richtigen ID an
				$('div#'+"left"+'.'+id).css("display","block");		
			//Wenn rechts noch nicht geklickt wurde und man auf der rechten seite ist		
			}else if(!clickedRight && side =="right"){
				//OPPONENT wird nicht mehr angezeigt sondern der Name des Champions bei dem man drüber ist
				$('#opponent > div#' +id).css("display","block");
				$('#opponent > div#default').css("display","none");
				//Zeige Das Bild auf der rechten seite mit der richtigen ID an
				$('div#'+"right"+'.'+id).css("display","block");
			}
		},
		//Mouseleave Funktion
		function(){
		//Speichert die klasse vom mouse leave event in die variabe Seite (left or right)	
		side = $(this).attr("class").split(' ')[0];
			//Wenn links noch nicht geklickt wurde und man auf der linken seite ist
			if(!clickedLeft && side =="left"){
					//Entferne Das Bild auf der linken seite mit der richtigen ID an
					$('div#'+"left"+'.'+id).css("display","none");
					//YOU wird angezeigt und der Name des Champions nicht mehr
					$('#you > div#' + id).css("display","none");
					$('#you > div#default').css("display","block");		
			//Wenn rechts noch nicht geklickt wurde und man auf der rechten seite ist
			}else if(!clickedRight  && side =="right"){
					//Entferne Das Bild auf der rechten seite mit der richtigen ID an
					$('div#'+"right"+'.'+id).css("display","none");
					//OPPONENT wird angezeigt und der Name des Champions nicht mehr
					$('#opponent > div#' +id).css("display","none");
					$('#opponent > div#default').css("display","block");				
			}	

	//Funktion welche beim klicken ausgelöst wird
	}).click(function(){
			//Wenn das gehoverte left ist
			if(side == "left"){
				//Und man schon mal auf der linken seite geklickt hat
				if(clickedLeft){
					//Klickt man nochmal wird diese Variable wieder auf false gesetzt (noch nicht geklickt)
					clickedLeft = false;
					//Der Name und das Bild welches vorhin angezeigt wurden werden wieder nicht mehr angezeigt (daru tmpid)
					$('#you > div#' + tmpidL).css("display","none");
					$('div#'+"left"+'.'+tmpidL).css("display","none");
					//Wenn die tmpid und die id nicht gleich sind so hat man auf ein neues bild geklickt
					if(tmpidL != id){
						//Die tmpid wird wieder gleich wie die id gesetzt
						tmpidL = id;
						//Wird wieder true gesetzt da man sozusagen wieder einen ersten klick gemacht hat
						clickedLeft = true;
						//Der name der id vom gehoverten champ wird angezeigt sowie auch das bild
						$('#you > div#' + id).css("display","block");
						$('div#'+"left"+'.'+id).css("display","block");
					}
				//Und man noch nicht auf der linken seite geklickt hat
				}else{
					//Ist ein Bild auf der linken seite drin wird es ausgeblendet
					$('div#'+"left"+'.'+tmpidL).css("display","none");
					//Die temporäre ID wird auf das gehoverte gesetzt					
					tmpidL = id;
					//Man hat nun zum ersten mal links geklickt darum wird diese var true gesetzt
					clickedLeft = true;
					//Der name der id vom gehoverten champ wird angezeigt sowie auch das bild
					$('#you > div#' + id).css("display","block");
					$('div#'+"left"+'.'+id).css("display","block");					
				}
			//Wenn das gehoverte rechts ist
			}else if (side == "right"){
				//Und man schon mal auf der rechten seite geklickt hat
				if(clickedRight){
					//Klickt man nochmal wird diese Variable wieder auf false gesetzt (noch nicht geklickt)
					clickedRight = false;
					//Der Name und das Bild welches vorhin angezeigt wurden werden wieder nicht mehr angezeigt (daru tmpid)
					$('#opponent > div#' + tmpidR).css("display","none");
					$('div#'+"right"+'.'+tmpidR).css("display","none");
					//Wenn die tmpid und die id nicht gleich sind so hat man auf ein neues bild geklickt
					if(tmpidR != id){
						//Die tmpid wird wieder gleich wie die id gesetzt
						tmpidR = id;
						//Wird wieder true gesetzt da man sozusagen wieder einen ersten klick gemacht hat
						clickedRight = true;
						//Der name der id vom gehoverten champ wird angezeigt sowie auch das bild
						$('#opponent > div#'+id).css("display","block");
						$('div#'+"right"+'.'+id).css("display","block");
					}
				//Und man noch nicht auf der rechten seite geklickt hat
				}else{
					//Ist ein Bild auf der rechten seite drin wird es ausgeblendet
					$('div#'+"right"+'.'+tmpidR).css("display","none");
					//Die temporäre ID wird auf das gehoverte gesetzt
					tmpidR = id;
					//Man hat nun zum ersten mal rechts geklickt darum wird diese var true gesetzt
					clickedRight = true;
					//Der name der id vom gehoverten champ wird angezeigt sowie auch das bild
					$('#opponent > div#' +id).css("display","block");
					$('div#'+"right"+'.'+id).css("display","block");					
				}
			}
		});
		//Funktion welche die Bilder je nach ausgewähltem button sortiert.
		//Button click funktion zeigt alle mid laner an
		$('#mid').click(function(){
			//Alle portrait anzeigen
			$('.left').show();
			$('.right').show();
			//Alle verstecken ausser die midlaner
			$('.left').not(".mid").hide();
			$('.right').not(".mid").hide();
		});
		//Button click funktion zeigt alle top laner an
		$('#top').click(function(){
			//Alle portrait anzeigen
			$('.left').show();
			$('.right').show();
			//Alle verstecken ausser die toplaner
			$('.left').not(".top").hide();
			$('.right').not(".top").hide();
		});
		//Button click funktion zeigt alle adc laner an
		$('#adc').click(function(){
			//Alle portrait anzeigen
			$('.left').show();
			$('.right').show();
			//Alle verstecken ausser die adc
			$('.left').not(".adc").hide();
			$('.right').not(".adc").hide();
		});
		//Button click funktion zeigt alle support laner an
		$('#sup').click(function(){
			//Alle portrait anzeigen
			$('.left').show();
			$('.right').show();
			//Alle verstecken ausser die supports
			$('.left').not(".support").hide();
			$('.right').not(".support").hide();
		});
		//Button click funktion zeigt alle jungler an
		$('#jungle').click(function(){
			//Alle portrait anzeigen
			$('.left').show();
			$('.right').show();
			//Alle verstecken ausser die jungler
			$('.left').not(".jungle").hide();
			$('.right').not(".jungle").hide();
		});

};
$(document).ready(ready);
$(document).on('page:load', ready);


