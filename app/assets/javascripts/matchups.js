var ready;
ready = function(){
	/*######################################################################################
	Skill Order Section
	########################################################################################*/

	//Array welche das geklickte beinhaltet
	var arrAb =[];
	var countSP = 0;
	var strSP ="";
	//Wenn man auf ein td innerhalb der Skillorderklickt
   $("#skillOrder").on("click", "td", function() {
   	//Und der klick nicht in der ersten reihe ist
   		countSP = 0;
   		var strSP ="";
	   	if($(this).attr("name")!="info"){
	   		//Variable welche alle tr beinhaltet
	   		var allTr = $(this).parent().parent().children("tr");
	   		//Zuerst überprüfe alle td in der gleichen reihe
	   		var pos = $(this).parent().children().index($(this));
	   		//Variable welche weiss auf welche ability reihe geklickt wurde
	   		var ab = $(this).parent().attr("id");
	   		//Setze alle td an gleicher position leer
	   		for(var i = 0; i<4;i++){
	   			var allTd = allTr.eq(i).children("td");
	   			allTd.eq(pos).text(" ");
	   		}
	   		//An der geklickten position wird ein zeichen gesetzt
	   		$(this).text("\u2022");
	   		//Im array wird an der richtigen stelle das entsprechende hinzugefügt
	   		arrAb[pos-1] = pos + ab;
	   		console.log(arrAb);
	   		//Schleife welche durch jedes einzelne td einmal druchgeht
	   		for(var i = 0;i<4;i++){
	   			//Variable welcke alle Tds in einer reihe speichert
	   			var rowTd = allTr.eq(i).children("td");
	   			rowTd.each(function(){
	   				//Wenn die das geschlaufte den inhalt vom klicken enthalten so increment countSp
	   				if($(this).text()=="\u2022"){
	   					countSP++;
	   					console.log(countSP);
	   				}
	   			});
	   		}
	   		//Wenn 18 gedrückt wurden verwandle den Array in ein String und adde im dem richtigen hiddenfield
	   		if(countSP==18){
	   			for(var i = 0;i<arrAb.length;i++){
	   				strSP += arrAb[i] +",";
	   			}
	   			console.log(strSP);
	   			$("#skill_order").val(strSP);
	   		}
	   	}
   });
 	
	/*######################################################################################
	Masteries section
	########################################################################################*/

	//Entfernt das standard browser rechtsklick menu auf der Klasse imgMas
	$('.imgMas').contextmenu( function() {
    	return false;
	});

	//Arrays welche zählen wieviele mas pro tree benutzt wurden
	var arrOff = [0,0,0,0,0,0];
	var arrDef = [0,0,0,0,0,0];
	var arrUtil = [0,0,0,0,0,0];

	//Arrays welche die Namen der Masterys in ihren jeweiligen array speichern
	var arrNameOff = [];
	var arrNameDef = [];
	var arrNameUtil = [];

	//Variablen welche gebraucht werden um zu zählen wie viele variablen es pro tree gibt
	var offenseCount= 0;
	var defenseCount= 0;
	var utilityCount= 0;
	//Hier werden die links und rechts klick überprüfungen abgedeckt	
	$(".imgMas")
		//Deckt den links klick ab
	    .click(function(){
	    	//Der Links klickt kann man nur ausführen wenn man überhaupt noch masteries verteilen kann
	    	if(offenseCount + defenseCount + utilityCount < 30){
		    	//Speichert das geklickte img in einer variable ab
		    	var imageMasteries = $(this);
		    	//Zieht den string aus der span wo die angagben über act/max anzahl drin ist
		    	var strNumb = imageMasteries.siblings("span.masNumb").text();
		    	//Splitet die variable in zwei variablen ab und speichert diese in actNum und maxNum
		    	var numbers = strNumb.split("/");
		    	var actNum = parseInt(numbers[0]);
		    	var maxNum = parseInt(numbers[1]);

		    	//Speichert das tr element in dem geklick wurde in eine Variable
		    	var trClick = imageMasteries.parent("td").parent("tr");
		    	//Speichert das td element in dem geklict wurde in eine Variable
		    	var tdClick = imageMasteries.parent("td");
				//In diese variable kommt das entsprechnde div des trees wo man den neuen conter im text anhängt
		    	var treeCount = trClick.parent().parent().siblings(".mastCounter");
		    	//In diese variable kommt die entsprechende ids des trees
				var tree = trClick.parent().parent().parent().attr("id");
		    	//Der Counter wird für den jeweiligen Tree erhöht und neu reingeschrieben
		    	//Wenn die Zahl des angeklickten Masteries grösser als 0 ist so kann man eine abziehen und auch so anzeigen
		    	//variable für tbody
		        var tbody = trClick.parent();
		        var arrTNow = tbody.children("tr");
		        var arrTbody = tbody.children("tr").next();
		  		var tdNow = "";
		        var tdNext = trClick.next().children("td");
		        //Speichert die jewilige Reihe ab
		        var trId = parseInt(trClick.attr("id")-1);
		        var array = [];
		        var count = 0;
		    	if(tree =="off"){	    		
		    		if(actNum <  maxNum){
						offenseCount++;
						arrOff[trId]++;
						array = arrOff;
						count = offenseCount;
						arrNameOff.push(tdClick.attr("name"));
						console.log(arrNameOff);
			    		strTreeCount = offenseCount + " Offense";
			    		treeCount.text(strTreeCount);    			
		    		}
		    		
		    	}else if(tree == "def"){	    		
		    		if(actNum < maxNum){
			    		defenseCount++;
			    		arrDef[trId]++;
			    		array = arrDef;
		    			count = defenseCount;
		    			arrNameDef.push(tdClick.attr("name"));
		    			console.log(arrNameDef);			    		
			    		strTreeCount = defenseCount + " Defense";
			    		treeCount.text(strTreeCount);
			    	}
		    	}else if(tree == "util"){
		    		if(actNum < maxNum){
		    			utilityCount++;
		    			arrUtil[trId]++;
		    			array = arrUtil;
		    			count = utilityCount;
		    			arrNameUtil.push(tdClick.attr("name"));
		    			console.log(arrNameUtil);			    		
			    		strTreeCount = utilityCount + " Utility";
			    		treeCount.text(strTreeCount);
			    	}
	    		}
	 
		    	//Wenn die anzahl kleiner ist als die maximale Anzahle so wir die anzahl um eins erhöht
		    	if(actNum < maxNum){
		    		actNum = actNum + 1;
		    	}
		    	//Der neue Text der angegeben wird
		    	imageMasteries.siblings("span.masNumb").text(actNum+"/"+maxNum);

	    		//Für jeden 4 masteries wird die entsprechende Riehe angezeigt
			    for(var i = 0; i < Math.floor(count/4);i++){
		          	//speichert die nächste td reihe in einen variable
		            tdNext = arrTbody.eq(i).children("td");
		            //Speichert diese td reihe ab
		            tdNow = arrTNow.eq(i).children("td");
		            arrTbody.eq(i).children("td").each(function(){
						//Wenn this eine abh hat ein after beziehung hat
						if($(this).attr("id")=="after"){
							if(abhDone($(this), tdNow)){
								$(this).children(".overlay").hide();	
							}else{

								$(this).children(".overlay").show();
							}
						}else{
								$(this).children(".overlay").hide();					
						}					
		            });
		         }
		         //Wenn es nun im gesamtem 30 Masteries sind so speichere die Masteries in ein String und adde die dem hidden field
		         if(offenseCount + defenseCount + utilityCount == 30){
		         	console.log(finalMasString());
		         	$("#masteriesHidden").val(finalMasString());

		         }
    		}
	    })
	    //Deckt den rechts klick ab
	    .mousedown(function(e){
	        if(e.which == 3) {
	    	//Speichert das geklickte img in einer variable ab
		    	var imageMasteries = $(this);
		    	//Zieht den string aus der span wo die angagben über act/max anzahl drin ist
		    	var strNumb = imageMasteries.siblings("span.masNumb").text();
		    	//Splitet die variable in zwei variablen ab und speichert diese in actNum und maxNum
		    	var numbers = strNumb.split("/");
		    	var actNum = parseInt(numbers[0]);
		    	var maxNum = parseInt(numbers[1]);

		    	//Speichert das tr element in dem geklick wurde in eine Variable
		    	var trClick = imageMasteries.parent("td").parent("tr");
		    	var tdClick = imageMasteries.parent("td");                      

	    		//In diese variable kommt das entsprechnde div des trees wo man den neuen conter im text anhängt
		    	var treeCount = trClick.parent().parent().siblings(".mastCounter");
		    	//In diese variable kommt die entsprechende ids des trees
				var tree = trClick.parent().parent().parent().attr("id");
		        var tbody = trClick.parent();
		        var trAll = tbody.children();
		        var arrTbody = tbody.children("tr").next();
		        //Speichert die jewilige Reihe ab
		        var trId = parseInt(trClick.attr("id")-1);
		        var array = [];
		        var name = tdClick.attr("name");
				if(wegClickOk(tdClick, trId)){
					if(abhIstOk(tdClick)){
						if(tree =="off"){
				    		if(actNum>0){
					    		offenseCount--;
					    		arrOff[trId]--;
								array = arrOff;
								arrNameOff.splice( $.inArray(name, arrNameOff), 1 );
								console.log(arrNameOff);
					    		strTreeCount = offenseCount + " Offense";
					    		treeCount.text(strTreeCount);
				    		}

				    	}else if(tree == "def"){
				    		if(actNum>0){
					    		defenseCount--;
					    		arrDef[trId]--;
					    		array = arrDef;
					    		arrNameDef.splice( $.inArray(name, arrNameDef), 1 );
								console.log(arrNameDef);
					    		strTreeCount = defenseCount + " Defense";
					    		treeCount.text(strTreeCount);
					    	}
				    	}else if(tree == "util"){
				    		if(actNum>0){
				    			arrUtil[trId]--;
					    		utilityCount--;
				    			array = arrUtil;
				    			arrNameUtil.splice( $.inArray(name, arrNameUtil), 1 );
								console.log(arrNameUtil);					    		
					    		strTreeCount = utilityCount + " Utility";
					    		treeCount.text(strTreeCount);
			    			}
				    	}
		
				    	//Wenn die anzahl kleiner ist als die maximale Anzahle so wir die anzahl um eins erhöht
				    	if(actNum > 0){
				    		actNum = actNum - 1;
				    	}

				    	//Der neue Text der angegeben wird
			    		imageMasteries.siblings("span.masNumb").text(actNum+"/"+maxNum);

			    		
				    	//Funktion welche eine Reihe immer dann wegmacht wenn in der oberen Reihe * 4 -1 < reihe * 4 ist 
				    	//Berchnet an der wievilten stelle man im array ist
				    	var pos = 0;
				    	var gesamt = 0;
						for(var i = 0; i<array.length;i++){
							if(array[i]>0){
								pos = i + 1;
							}
						}
						for(var i = 0;i<pos;i++){
							//erster durchlauf gesetze zwischen erster und zweiter linie
							gesamt += array[i];			
						}
						//Wenn das gesamte kleiner ist wie die anzahl reihen mal 4 dann overlaye alle an der richtigen position
						if(gesamt < pos*4){
							console.log("ist kleiner");
							trAll.eq(pos).children("td").each(function(){
								$(this).children(".overlay").show();
							});
						}

					}
				}		    	
        	}
    });
	 //Funktion welche true zurück gibt für jede abhängikeit
	function abhDone(abh, tdNow){
		var ok = false;
		var arrTdPrev = tdNow;	
		
		//Man muss überprüfen

				var pos = abh.parent().children().index(abh);
				numbers = arrTdPrev.eq(pos).children(".masNumb").text();
				arrNumbers = numbers.split("/");
				if(parseInt(arrNumbers[0])==parseInt(arrNumbers[1])){
					console.log("true weil voll");
					ok = true;
					
				}

		
		return ok;
	}
	//Funktion welche überprüft ob der wegklick gültig ist
	//Ein klick ist nur dann gültig wenn die Regeln über jede Row gewährlistet ist
	function wegClickOk(click, id){
		trId = parseInt(id);
		var ok = true;
		var clickTd = click;
		var clickTr = clickTd.parent();
	    var tbody = clickTr.parent();
	    var nrTrRow = clickTr.attr("id");
	    var nextTr = clickTr.next();
	    var gesamt = 0;
	    var pos = 0;
	    var array = [];
	    var tree = tbody.parent().parent().attr("id");
	    //Schauen in welchem Tree man ist
	    if(tree=="off"){
	    	array = arrOff;
	    }else if(tree=="def"){
	    	array = arrDef;
	    }else if(tree == "util"){
	    	array = arrUtil;
	    }
		//Wenn in der reihe wo ich wegklicke das gesetzt von den reihen immer noch stimmt

			//Berchnet an der wievilten stelle man im array ist
			for(var i = 0; i<array.length;i++){
				if(array[i]>0){
					pos = i + 1;
				}

			}
			if(trId+1 == pos){
				return true;
			}
		
			//Wenn ich eins weglicken will, muss man schauen ob die gesetze oberhalb des klickes noch stimmen
			for(var i = 0;i<pos-1;i++){
				//erster durchlauf gesetze zwischen erster und zweiter linie
				gesamt += array[i];

				
			}
			var berechnung = gesamt/(pos-1)
			//wenn der gesamte wert höher ist wie der der zeileid * 4 dann ist es ok -> ok > 2*4
			if(!(berechnung > 4)){
				return false;
			}
		return ok;
	}


	//Funktion welche true zurückgibt wenn bei einer abhnigkeit die obere variable nicht 0 werden kann sofern im der id after bei der anzahl runen keine 0 drin ist
	function abhIstOk(click){
		var ok = true;
		var clickTd = click;
		var clickTr = clickTd.parent();
		var nextTr = clickTr.next();
		var nextTds = nextTr.children();
		//wenn man auf das feld klickt und es hat eine abhängigkeit
		if(clickTd.attr("id")=="pre"){
			//dann überprüfe ob im id after auch die anzahl geklikter 0 ist
			for(var i = 0;i<4;i++){
				if (nextTds.eq(i).attr("id") == "after"){
					numbers = nextTds.eq(i).children("span.masNumb").text();
					arrNumbers = numbers.split("/");
					anzNum = arrNumbers[0];
					if(anzNum==0){
						ok = true;
					}else{
						ok = false;
					}
				}
			}
		}
		return ok;
	}

	//Funktion welche die anzahl ausgewählten in einer Reihe zählt und returned
	function countRowMasteries(masImg){
		
		var count = 0;
		//Speichert die reihe auf der aktuell geklickt wurde in eine Variable
		var tr = masImg.parent("td").parent("tr");
		var arrTd = tr.children();
		var spanArr = arrTd.children("span.masNumb");
		//Loop für jedes td in der tr durch
		for(var i = 0; i<spanArr.length;i++){
			//Hier wird gezählt wievielmal ein mastery im gesamten pro Reihe angeklickt wird
			var strGesamtCount = spanArr[i].innerHTML;	
			var arrCount = strGesamtCount.split("/");
			intCount = parseInt(arrCount[0]);
			count = count + intCount;

		}
		return count;
	} 
	function finalMasString(){
		var finalString ="";
		var strOff = arrayCountElement(arrNameOff);
		var strDef = arrayCountElement(arrNameDef);
		var strUtil = arrayCountElement(arrNameUtil);
		//String zusammensetzen
		finalString = strOff + "|" + strDef + "|" + strUtil;
		
		return finalString;
	}
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
	//Arrays welche für das Backend gebruacht werden
	var arrMarks = [];
	var arrSeals = [];
	var arrGlyphs = [];
	var arrQuints = [];
	//String welcher aus den Array zussammen gesetzt wird
	var strRunen;
	//Strings welche das Array umwandeln
	var strMarks;
	var strSeals;
	var strGlyphs;
	var strQuints;
	//Variable welche die gesamtzahl runen festhaltet
	var runeTotal = 0;
	//Javascropt Function zum erstellen des Strings

	//Diese Funktion gibt alle Werte die vom übergebenen Array sind nur einmal pro wert in einem neuen Array zurück
	function arrayFilter(inputArray){
		var outputArray = [];
		for(var i =0 ; i < inputArray.length;i++){
			if((jQuery.inArray(inputArray[i], outputArray)) == -1){
				outputArray.push(inputArray[i]);
			}
		}
		return outputArray;		
	}
	//Funktion welche die anzahl arrays mit dem eigentlichen array vergleicht
	function arrayCountElement(inputArray){
		var origArray = inputArray;
		var filtArray = arrayFilter(origArray);
		var count = 0;
		var string= "";
		//Für jedes element in filt Array muss durch das origArray gelooped werden und den richten wert speichern
		for(var i=0; i<filtArray.length;i++){
			count=0;
			for(var j=0;j<origArray.length;j++){
				//Wenn das filtArray element im origArray vorkommt
				if(filtArray[i] == origArray[j]){
					//der Counter wird um eins erhöht
					count++;
				}		
			}
			//Das filter Array element mit dem Counter dem string adden = count x element
			string += count + "x" + filtArray[i] +',';
		}
		string = string.replace(/,\s*$/, "");
		return string;
	}

	function finalRuneString(){
		var finalString ="";
		var strMark = arrayCountElement(arrMarks);
		var strSeal = arrayCountElement(arrSeals);
		var strGlyph = arrayCountElement(arrGlyphs);
		var strQuint = arrayCountElement(arrQuints);
		//String zusammensetzen
		finalString = strMark + "|" + strSeal + "|" + strGlyph + "|" + strQuint;
		
		return finalString;
	}



	//Paar variablen die oft gebraucht werden für das frontend
	var stats;
	var exist;
	var existwell;
	var existnewnr;
	var existnr;
	var nr;
	var copy;
	//Funktion welche das klicken auf der linken seite bzw die Runen welche man beabsichtigt zu adden behandelt
	$('.well').click(function(){
			stats = "";
			//klont die geklickte rune
			var well = $(this).clone();

			//Ueberprufng ob das total der jeweiligen rune schon ereicht wude
			//Dazu muss man den runetype mit dem Total des types vergleichen
			var runetype = $(this).attr("type");
			var compareInt = 9;
			$('span#rune').each(function(){
				if($(this).attr("type") == runetype){
					totalNr = $(this).html();
				}
			});
			if(runetype=="black"){
				compareInt =3;
			}

			//Man kann nur adden wenn noch nicht das maximum erreicht wurde
			if(totalNr<compareInt){			
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
					if(existwell.children(".rune-number").text()==0){
						existwell.show();
					}
					//Am ende ird die nummer richtig erhöht
					existwell.children(".rune-number").text(existnewnr);
					runeTotal++;
				//Wenn das well noch nicht existiert wird sie angefügt
				}else if(!exist){
					//Der Name der Rune wird in eine Variable gespeichert
					name = well.children(".rune-info").children(".rune-name").text();
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
							runeTotal++;
						}
					}else{
						if(parseInt(anzahlTotal)<9){
							$('.runeAdd').append(well);
							runeTotal++;
						}
					}	
				}
				//Wenn max Runen hinzugefügt wurden schreibe den String in das hiddenfield
				if(runeTotal==30){
					$("#runesHidden").val(finalRuneString());
				}
				//Hier wird die Rune dem richtigen Array geaddet

				//Die Rune wird dem entsprechenden Array hinzugefügt		
				if(runetype=="red"){
					if(arrMarks.length<9){
						arrMarks.push(name);
						console.log(arrMarks);
					}
				}else if(runetype=="yellow"){
					if(arrSeals.length<9){
						arrSeals.push(name);
						console.log(arrSeals);
					}						
				}else if(runetype=="blue"){
					if(arrGlyphs.length<9){
						arrGlyphs.push(name);
						console.log(arrGlyphs);
					}
				}else if(runetype=="black"){
					if(arrQuints.length<3){
						arrQuints.push(name);
						console.log(arrQuints);
					}
				}
				//Array test

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
			}
		});
		//Wenn man auf eines rechts klickt
		$('.runeAdd').on('click', '.well', function() {
			copy = $(this);
			//Speichert die Anzahl runen in eine variable
			nr = copy.children(".rune-number").html();
			//Der Name der Rune wird in eine Variable gespeichert
			name = copy.children(".rune-info").children(".rune-name").text();
			//Speihert die stats der rune in eine variable
			stats = $(this).children(".rune-info").children(".rune-stats").html();
			//Wenn die nummer nicht eins ist, so wird sie nur um eins vermindert
			if(nr>1){
				newnr = nr -1;
				$(this).children(".rune-number").text(newnr);
				runeTotal--;
			}else{
				//das well wird gehided da remove nicht geht wegen event problemen
				newnr = nr -1;
				copy.children(".rune-number").text(newnr);
				copy.hide();
				runeTotal--;
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
			//Hier wird die Rune vom richtigen String wieder weggenohmen

			//Man muss überprüfen um welche art von Rune es sicht handelt
			if(runetype=="red"){
				arrMarks.splice( $.inArray(name, arrMarks), 1 );
				console.log(arrMarks);
			}else if(runetype=="yellow"){
				arrSeals.splice( $.inArray(name, arrSeals), 1 );
				console.log(arrSeals);
			}else if(runetype=="blue"){
				arrGylphs.splice( $.inArray(name, arrGlyphs), 1 );
				console.log(arrGlyphs);
			}else if(runetype=="black"){
				arrQuints.splice( $.inArray(name, arrQuints), 1 );
				console.log(arrQuints);
			}
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
			console.log(strChamp);
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
	var build = "";
	//Ueberprüft wo geklickt wurde und speichert die id in itemid
	$('.imgAdd').click(function(){
		itemid = $(this).attr("pos");
		build = $(this).parent().attr("class");
		alert(build);
			//Wenn die id nicht die erste ist
	});

	$('img.imgItem').click(function(){
		strFinalBuild = "";
		//Speicher das Bild bei klick auf ein item in eine variable
		itemimg = $(this).attr("src");
		//fügt dem geklickten dieses Bild hinzu
		$("."+build+"> .imgAdd[pos='" +itemid +"']").html("<img id ='" + itemid + "' src='" +itemimg +"'>");
		//Erstelle eintrag im Array und wandle in ein String um und setze in an den richtigen ort
		
		if(build == "finalbuild"){
			finalBuild[itemid-1] = itemimg;
		}

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
