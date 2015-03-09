var ready; 
ready = function(){
	/*######################################################################################
	Rune section
	########################################################################################*/
	/*	
		quints = black
		marks = red	
		seals = yellow
		gyphs = blue
	*/	
	//Funktion welche die runen auf Knopfdruck ändert
	$('.runeBtn').click(function(){
		//Speichert den typ der geklickten Button in eine variable
		runetype = $(this).attr('type');
		//Für jeder well (Rune) auf der linken seite wird gelooped
		$('.well#rune').each(function(){
			//Wenn die rune auch wirklic link ist
			if($(this).attr("side")=="left"){
				//Wenn sie den typ des geklickten button
				if($(this).attr('type')== runetype){
					//Dann zeige diesen Typ
					$(this).show();
				}else{
					//Die anderen werden versteckt
					$(this).hide();			
				}				
			}
		});
	});

	//Funktion welche eine rune der runeAdd klasse hinzufügt und auch die Nummern managed
	var stats;
	var exist;
	var existwell;
	var existnewnr;
	var existnr;
	var nr;
	var copy;
	$('.well').click(function(){

			stats = "";
			//klont die geklickte rune
			var well = $(this).clone();
			//das well(rune) richtig modifizieren
			//Anzahl runen auf der Auswahl seite
			nr = well.children(".rune-number").html();
			//Die nummer wird auf der Auswahl seite um eines kleiner sofern die nr nicht 0 ist
			if(nr>0){
				var newnr = nr -1;
			}
			//Dies muss angepasst werden
			$(this).children(".rune-number").text(newnr);
			//Das geklonnt muss ebenfalls angepasst werden
			//Wenn schon so eine rune geaddet wurde erhöhre um eins sont füge hinzu mit wert eins
			stats = $(this).children(".rune-info").children(".rune-stats").html();
			//vergleichs schleife
			$(".runeAdd").children(".well").each(function(){
				if(stats == $(this).children(".rune-info").children(".rune-stats").html()){
					//Speichert die nummer die rechts im well schon existiert in eine variable
					existnr = $(this).children(".rune-number").html();
					//Speichert das existierende well in eine variable ab
					existwell = $(this);
					//Exist wird demnach auf true gesetzt
					exist = true;
					//breaked die schleife wenn es das richtige gefunden hat
					return false;
				}else{
					exist = false;
				}
			});
			//Added oder erhöht auf der select seite
			//wenn es schon exitiert wird nur erhöht
			if(exist){
				//Die nummer wird eins erhöht sofern sie nicht schon 9 hat oder es sich um eine Quint handelt dann = 3
				if(existwell.attr("type") =="black"){
					if(existnr<3){
						existnewnr = parseInt(existnr) + 1;	
					}
				}else{
					if(existnr<9){
						existnewnr = parseInt(existnr) + 1;				
					}			
				}
				//Wenn das well existiert aber auf null ist wieder anzeigen
				if(existwell.children("rune-number").text()==0){
					existwell.show();
				}
				//Am ende ird die nummer richtig erhöht
				existwell.children(".rune-number").text(existnewnr);
			//Wenn das well noch nicht existiert wird sie angefügt
			}else if(!exist){
				//Die anzahl runen wird auf eins gesetzt
				well.children(".rune-number").text(1);
				//Die side muss auf right abgeändert werden
				well.attr('side',"right");

				//Wenn schon 9 runen bzw 3 von einem Typ vorhanden sind so darf keine weitere hinzugefgt werden
				//Speichert den typ in eine variable
				runetype = well.attr("type");
				//Sucht die anzahl runen im Total von diesem typ
				$('span#rune').each(function(){
					//Schleift durch alle runen total durch
					if($(this).attr("type")==runetype){
						//Speichert die vom gleichen Typ in eine variable
						anzahlTotal = $(this).text();
					}
				});
				//Added nur falls noch nicht 9 bzw 3 von diesem Typ existieren
				//Wenn es eine quint ist dann mit 3 schauen sonst 9
				if(runetype=="black"){
					if(parseInt(anzahlTotal)<3){
						$('.runeAdd').append(well);						
					}
				}else{
					if(parseInt(anzahlTotal)<9){
						$('.runeAdd').append(well);						
					}			
				}
			}
			//Runen Total muss an der richtigen stelle angeepasst werden
			//Uebrprufen um welche art von Rune es sich handelt
			runetype = $(this).attr("type");
			$('span#rune').each(function(){
				if($(this).attr("type")== runetype){
					//Wenn der runen typ eine quints ist so darf es max nur 3 haben
					if(runetype=="black"){
						if($(this).text()<3){
							//speichert die momentane anzahl in eine variable
							anzahlNr = $(this).text();
							//erhöht diese variable und erstetzt die vorherige
							newAnzahlNr = parseInt(anzahlNr) + 1;
							$(this).text(newAnzahlNr);							
						}	
					}else{
						//wenn die zahl im total bei der richtigen rune kleiner ist als 9
						if($(this).text()<9){
							//speichert die momentane anzahl in eine variable
							anzahlNr = $(this).text();
							//erhöht diese variable und erstetzt die vorherige
							newAnzahlNr = parseInt(anzahlNr) + 1;
							$(this).text(newAnzahlNr);							
						}						
					}
				}
			});
		});
		//Wenn man auf eines rechts klickt
		$('.runeAdd').on('click', '.well', function() {
			copy = $(this);
			//Speichert die Anzahl runen in eine variable
			nr = copy.children(".rune-number").html();
			//Speihert die stats der rune in eine variable
			stats = $(this).children(".rune-info").children(".rune-stats").html();
			//Wenn die nummer nicht eins ist, so wird sie nur um eins vermindert
			if(nr>1){
				newnr = nr -1;	
				$(this).children(".rune-number").text(newnr);
			}else{
				//das well wird gehided da remove nicht geht wegen event problemen
				newnr = nr -1;	
				copy.children(".rune-number").text(newnr);
				copy.hide();
			}
			$('.runes').children(".well").each(function(){
				//Ueberprüfen ob es die gleiche rune ist mit hilfe von den status
				if(stats == $(this).children(".rune-info").children(".rune-stats").html()){
					//Speichert die nummer die links im well schon existiert in eine variable
					existnr = $(this).children(".rune-number").html();
					//Die nummer wird um eins erhöht
					existnewnr = parseInt(existnr) + 1;
					$(this).children(".rune-number").text(existnewnr);
				}
		});
		//Wenn man die runen wegnimmt müssen sie auch im Total weggehen
		runetype = $(this).attr("type");
		$('span#rune').each(function(){
			if($(this).attr("type")== runetype){
				//wenn die zahl bei der richtigen rune im total grösser ist als 0
				if($(this).text()>0){
					//speichert die momentane anzahl in eine variable
					anzahlNr = $(this).text();
					//erhöht diese variable und erstetzt die vorherige
					newAnzahlNr = parseInt(anzahlNr) - 1;
					$(this).text(newAnzahlNr);							
				}
			}
		});			
	});


	/*######################################################################################
	Champ pick up function section
	########################################################################################*/
	//Kann links oder rechts sein
	var champid;
	var champimg;
	var strChamp;

	//Funktion um herauszufinden welches Champ bild gedrückt wurde
	$('.champAdd').click(function(){
		champid = $(this).attr("id");
	});

	//Funktion
	$('img.imgChamp').click(function(){
		strChamp ="";

		champimg = $(this).attr('src');

		urlSplit = champimg.split('/');
		champUrlLast = urlSplit[urlSplit.length-1];
		champSplit = champUrlLast.split('.');

		$(".champAdd#"+champid).html("<img id ='" + champid + "' src='" +champimg +"' style='max-width: 100%;max-height: 100%;'>");
		if(champid == "left"){

			strChamp = champSplit[0];
		
			$("#champLinks").val(strChamp);

		}else if(champid == "right"){
			strChamp = champSplit[0];
		
			$("#champRechts").val(strChamp);
		}
	});

	/*######################################################################################
	Item pick up function section
	########################################################################################*/
	var itemid;
	var itemimg;
	var srcDrinId;
	//Array mit einem item/url pro slot
	var finalBuild = new Array(6);

	var strFinalBuild = "";
	//Ueberprüft wo geklickt wurde und speichert die id in itemid
	$('.imgAdd').click(function(){
		itemid = $(this).attr("id");
			//Wenn die id nicht die erste ist
	});
                                                                                                                                                                                                                                                                                       
	$('img.imgItem').click(function(){
		strFinalBuild = "";
		//Speicher das Bild bei klick auf ein item in eine variable
		itemimg = $(this).attr("src");
		//fügt dem geklickten dieses Bild hinzu
		$(".imgAdd#"+itemid).html("<img id ='" + itemid + "' src='" +itemimg +"'>");
				//Erstelle eintrag im Array und wandle in ein String um und setze in an den richtigen ort
		finalBuild[itemid-1] = itemimg;
		//Erhöhe itemd id um 1
		if(itemid <6){
			itemid++;			
		}
		//Macht aus dem Array einen String 
		for(var i = 0; i < finalBuild.length;i++){
			strFinalBuild = strFinalBuild + finalBuild[i] + "|";
		}

		//Adde den string dem hidden textfield zu
		$("#final_build").val(strFinalBuild);		

	});	

	/*######################################################################################
	Select Matchup section
	########################################################################################*/

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


