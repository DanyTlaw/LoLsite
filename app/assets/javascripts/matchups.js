var ready;
ready = function(){
	/*######################################################################################
	Skill Order Section
	########################################################################################*/
    console.log(gon.skillorder);
    console.log(gon.summoners);
    console.log(gon.startArray);
    console.log(gon.finalArray);
    console.log(gon.earlyCore);
    console.log(gon.midCore);
    console.log(gon.lateCore);
	//Array welche das geklickte beinhaltet
	var arrAb =[];
	var countSP = 0;
	var strSP ="";
		//funktion welche die punktre im sillorder füllt falls diese scn geklickt wurden
	setSkillPoints();
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
	   					countSP++;
	   					console.log(countSP);
	   				});
	   		}
	   		//Wenn 18 gedrückt wurden verwandle den Array in ein String und adde im dem richtigen hiddenfield
	   		if(countSP>0){
	   			makeSkillOrderString();
	   		}
	   	}
   });
	//Funktion welche bei edit oder validation die punkte richtig verteilt
	function setSkillPoints(){
		var trall = $("#skillOrder").find("tr");
		console.log(trall);
		if(gon.skillorder.length > 0){
			console.log("nicht leer");
			for(var i = 0;i <gon.skillorder.length;i++){
				skill = gon.skillorder[i];
				tr = trall.parent().children("#" + skill).children();
				tr.eq(i+1).text("\u2022");
				arrAb[i] = (i+1) + gon.skillorder[i];
			}
		}
		makeSkillOrderString();
	}

	//Funktion welche den Skill order string erstellt
 	function makeSkillOrderString(){
 		strSP = "";
 		if(arrAb.length>0){
	 	   	for(var i = 0;i<arrAb.length;i++){
				strSP += arrAb[i] +",";
			}
			console.log(strSP);
			$("#skill_order").val(strSP);			
 		}

 	}
	/*######################################################################################
	Masteries section
	########################################################################################*/
	//Arrays welche die Namen der Masterys in ihren jeweiligen array speichern
	var arrNameOff = [];
	var arrNameDef = [];
	var arrNameUtil = [];
	//Arrays welche zählen wieviele mas pro tree benutzt wurden
	var arrOff = [];
	var arrDef = [];
	var arrUtil = [];
	//Brauche alle drei trees
	var offMasterieTree = $(".offmasteries");
	var defMasterieTree = $(".defmasteries");
	var utilMasterieTree = $(".utilmasteries");
	//Diese Variablen beinhaltet die anzahl geklickte masteries pro zeile
	var offcount = offMasterieTree.find(".mastCounter").text().split(" ")[0];
	var defcount= defMasterieTree.find(".mastCounter").text().split(" ")[0];
	var utilcount = utilMasterieTree.find(".mastCounter").text().split(" ")[0];
	//Variablen welche alle tds pro Tree enthalten
	var offTdTree = offMasterieTree.find(".masTable").children("tbody").children("tr");
	var defTdTree = defMasterieTree.find(".masTable").children("tbody").children("tr");
	var utilTdTree = utilMasterieTree.find(".masTable").children("tbody").children("tr");
	console.log(offcount);
	console.log(defcount);
	console.log(utilcount);
	var arrTree = [offTdTree,defTdTree,utilTdTree];
	var arrCounts = [offcount,defcount,utilcount];
	makeMasNameArray();
	makeTreeArrays();
	hideShow();
	//FUnktion welche die masteries richtig hided uns show
	function hideShow(){

		//Für jeden 4 masteries wird die entsprechende Riehe angezeigt
		for(var h = 0; h<arrTree.length;h++){
		    for(var i = 0; i < Math.floor(arrCounts[h]/4);i++){
	          	//speichert die nächste td reihe in einen variable
	            tdNext = arrTree[h].next().eq(i).children("td");
	            //Speichert diese td reihe ab
	            tdNow = arrTree[h].eq(i).children("td");

	            arrTree[h].next().eq(i).children("td").each(function(){
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
     	}
	}

	function makeTreeArrays(){
		for(var i =0; i<arrTree.length;i++){
			for(var j = 0; j<arrTree[i].length;j++){
				//Wenn man im ersten durchgang ist so handelt es sich um die Offense Array
				if(i ==0){
					arrOff[j] = countRowMasteries(arrTree[i].eq(j));
				}else if(i == 1){
					arrDef[j] = countRowMasteries(arrTree[i].eq(j));
				}else if(i == 2){
					arrUtil[j] = countRowMasteries(arrTree[i].eq(j));
				}
			}
		}
	}

	//Entfernt das standard browser rechtsklick menu auf der Klasse imgMas
	$('.imgMas').contextmenu( function() {
    	return false;
	});

	function makeMasNameArray(){
		//Forschleife welche dreimal für jeden tree einmal durchgeht
		for(var i =0; i< arrTree.length;i++){
			//For schleife welche für jede tr einmal durchgeht = sechsmal
			for(var j = 0; j<arrTree[i].length;j++){
				//Für jedes td in der reihe wirg geschaut ob etwas angeklickt wurde und wievielmal
				arrTree[i].eq(j).children("td").each(function(){
					//Ueberpruefen wie oft es schon geklickt wurde
					nr = $(this).find(".masNumb").text().split("/")[0];
					if(nr > 0){
						//Je nach durchgang geht es um einen anderen tree und jedesmal wird für soviel mal wie
						//der mastery geklickt wurde dieser mastery dem namen array hinzugefügt
						switch(i){
							case 0:
								for(var k = 0; k<nr;k++){
									arrNameOff.push($(this).attr("name"));
								}
								break;
							case 1:
								for(var k = 0; k<nr;k++){
									arrNameDef.push($(this).attr("name"));
								}
								break;
							case 2:
								for(var k = 0; k<nr;k++){
									arrNameUtil.push($(this).attr("name"));
								}
								break;
						}
					}
				});	
			}
		}
	}



	//Variablen welche gebraucht werden um zu zählen wie viele variablen es pro tree gibt
	var offenseCount= parseInt(offcount);
	var defenseCount= parseInt(defcount);
	var utilityCount= parseInt(utilcount);
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
	         	
		         	$("#masteriesHidden").val(finalMasString());
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
					    		strTreeCount = offenseCount + " Offense";
					    		treeCount.text(strTreeCount);
				    		}

				    	}else if(tree == "def"){
				    		if(actNum>0){
					    		defenseCount--;
					    		arrDef[trId]--;
					    		array = arrDef;
					    		arrNameDef.splice( $.inArray(name, arrNameDef), 1 );
					    		strTreeCount = defenseCount + " Defense";
					    		treeCount.text(strTreeCount);
					    	}
				    	}else if(tree == "util"){
				    		if(actNum>0){
				    			arrUtil[trId]--;
					    		utilityCount--;
				    			array = arrUtil;
				    			arrNameUtil.splice( $.inArray(name, arrNameUtil), 1 );;					    		
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
				    	console.log(array);
						for(var i = 0; i<array.length;i++){
							if(array[i]>0){
								pos = i + 1;
							}
						}
						for(var i = 0;i<pos;i++){
							//erster durchlauf gesetze zwischen erster und zweiter linie
							gesamt += array[i];			
						}
						console.log(gesamt);
						//Wenn das gesamte kleiner ist wie die anzahl reihen mal 4 dann overlaye alle an der richtigen position
						if(gesamt < pos*4){
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
	function countRowMasteries(trow){
		
		var count = 0;
		//Speichert die reihe auf der aktuell geklickt wurde in eine Variable
		var tr = trow;
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
	var red = 0;
	var yellow = 0;
	var blue = 0;
	var black = 0;
	//Variable welche die gesamtzahl runen festhaltet
	var runeTotal = 0;
	//Funktion welche beim laden der page ausgefhrt werden muss
	makeRuneArray();


	//Funktion welche die Arrays erstellt
	function makeRuneArray(){
		var runeRight = $(".runeAdd");
		var runeRightChilds = runeRight.children();

		//Für jede Rune die rechts ist wird gelooped
		runeRightChilds.each(function(){	
			//der Runenname wird dem entsprechenden Array hinzugefügt
			console.log($(this).attr("type"));
			console.log($(this).find(".rune-name").text());
			switch($(this).attr("type")){
				//Je nach Typ der reune rechts wird sie für die Anzahl dem richtigen array hinzugefügt
				case "red":
					//Schlaufe die solange geht wie die Anzahl der Rune 
					for(var i = 0; i< parseInt($(this).find(".rune-number").text());i++){
						arrMarks.push($(this).find(".rune-name").text());
						//Für jede existierende Rune muss das Total auch angepasst werden
						runeTotal+=1;
						//Die variable des jewiligen typs wird erhöht und auf der view im totalrune bereich angezeigt
						red +=1;
					}
					break;
				case "yellow":
					for(var i = 0; i< parseInt($(this).find(".rune-number").text());i++){
						arrSeals.push($(this).find(".rune-name").text());
						runeTotal+=1;
						yellow += 1;
					}
					break;
				case "blue":
					for(var i = 0; i< parseInt($(this).find(".rune-number").text());i++){
						arrGlyphs.push($(this).find(".rune-name").text());
						runeTotal+=1;
						blue +=1;
					}
					break;
				case "black":
					for(var i = 0; i< parseInt($(this).find(".rune-number").text());i++){
						arrQuints.push($(this).find(".rune-name").text());
						runeTotal+=1;
						black +=1;
					}
					break;
			}
		});
		console.log(arrMarks);
		console.log(arrSeals);
		console.log(arrGlyphs);
		console.log(arrQuints);
		//Setzt die Anzahl runen des typs auf der view
		var selectedRune = $(".selected-runes");
		selectedRune.find("span[type='red']").text(red);
		selectedRune.find("span[type='yellow']").text(yellow);
		selectedRune.find("span[type='blue']").text(blue);
		selectedRune.find("span[type='black']").text(black);
		//Am ende wird noch der String richtig zusammengesetzt
		$("#runesHidden").val(finalRuneString());
		console.log(finalRuneString());
	}
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

		var allString = [];
		allString[0] = strMark;
		allString[1] = strSeal;
		allString[2] = strGlyph;
		allString[3] = strQuint;

		for(var i = 0; i<allString.length;i++){
			if(allString[i] != ""){
				finalString = finalString + allString[i] + "|";
			}
		}

		finalString = finalString.substring("|", finalString.length - 1);
		console.log(finalString);
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
	$('.runes > .well').click(function(){
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
						console.log($(this));
						console.log(existnr);
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
					name = well.children(".rune-info").children(".rune-name").text();
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
				//Wenn max Runen hinzugefügt wurden schreibe den String in das hiddenfield
				if(runeTotal>0){
					$("#runesHidden").val(finalRuneString());
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
			//Wenn max Runen hinzugefügt wurden schreibe den String in das hiddenfield
			if(runeTotal>0){
				$("#runesHidden").val(finalRuneString());
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
	$(document).on("click",'.champAdd', function(){
		champid = $(this).attr("id");
	});

	//Funktion
	$(document).on("click",'img.imgChamp', function(){
		strChamp ="";

		champimg = $(this).attr('src');
		champname = $(this).attr("name");

		//hier wird das bild links oder recchts je nach id mit name und bild in ddie jeweilge anzeige gespeichert
		$(".champAdd#"+champid).children("img").attr("src", champimg);
		$(".champAdd#"+champid).children("img").attr("id", champid);
		$(".champAdd#"+champid).children("img").attr("name", champname);
		$(".champAdd#"+champid).children("img").attr("style", 'max-width: 100%;max-height: 100%;');
		//Wenn es der Linke champ ist
		if(champid == "left"){

			$("#champLinks").val(champname);
			//Da der Matchup sich um den links handelt müssen noch alle fähigkeiten richtig angepasst werden
			//Zugriff auf die Gon variable
			for(var i = 0; i< gon.champs.length;i++){

				if(gon.champs[i].table.name == champname){
					//Speichert einen Array von Spells in diese variable, welches schon nach q w e r sotiert ist
					champspells = gon.champs[i].table.spells;
					//Für jeden spell wir das entsprechende bild geladen
					for(var j = 0; j< champspells.length;j++){
						//Setzt den richtigen url zusammen
						url = gon.url + "spell/" + champspells[j].image.full;

						//Beim ersten durchgang geht es um den q spell
						if(j==0){
							$(".skill > #q").attr("src", url);
						}else if(j==1){
							$(".skill > #w").attr("src", url);
						}else if(j==2){
							$(".skill > #e").attr("src", url);
						}else if(j==3){
							$(".skill > #r").attr("src", url);
						}
					}
				}
			}

		}else if(champid == "right"){

			$("#champRechts").val(champname);

		}
	});
	/*######################################################################################
	Summ pick up function section
	########################################################################################*/
	
	var sumid = ""; 
	var strSum ="";
	var arrSum = [];
	loadSum();
	//Ueberprüft wo geklickt wurde und speichert die id in itemid
	$(document).on("click",'.sumAdd', function(){
		sumid = $(this).attr("pos");
	});

	$(document).on("click","img.imgSum", function(){
		sumimg = $(this).attr("src");
		$("."+"summoners"+"> .sumAdd[pos='" +sumid +"']").children("img").attr("src", sumimg);
		$("."+"summoners"+"> .sumAdd[pos='" +sumid +"']").children("img").attr("id", sumid);
		arrSum[parseInt(sumid)-1] = sumimg;
		//Erhöhe itemd id um 1
		if(sumid <2){
			sumid++;
		}

		//Macht aus dem Array einen String für die Summoners
		strSum ="";
		for(var i = 0; i < arrSum.length;i++){
			strSum  += arrSum[i] + "|";
		}
		strSum = strSum.substring("|", strSum.length - 1);
		//Diesen String dem hiddenfeld für summoners hinzufügen
		$("#sum").val(strSum);
	})

	//Funktion welche die summoners am anfang lädt bei edit und validation
	function loadSum(){
		if(gon.summoners.length >0){
			console.log(gon.summoners.length);
			for(var i = 0;i<gon.summoners.length;i++){
				$("."+"summoners"+"> .sumAdd[pos='" +(i+1) +"']").children("img").attr("src", gon.summoners[i]);
				$("."+"summoners"+"> .sumAdd[pos='" +(i+1) +"']").children("img").attr("id", (i));
				arrSum.push(gon.summoners[i]);
			}
			strSum ="";
			for(var i = 0; i < gon.summoners.length;i++){
				strSum  += arrSum[i] + "|";
			}
				strSum = strSum.substring("|", strSum.length - 1);
			}
			$("#sum").val(strSum);
	}
	/*######################################################################################
	addItem function section
	########################################################################################*/
	$(document).on("click",".plusAdd", function(){
		//Beim klick muss zuerst herausgefunden werden wo genau man sich befindet
		//Dazu brucht man eine variable bei der der parent gespeichert wird
		var parClass = $(this).parent().siblings().children().attr("class");
		var par = $(this).parent().siblings().children();

		//wenn geklick wurde muss die aktuelle position des letzten imgAdd gesucht werden 
		var lastchild = par.children(".imgAdd").last();
		var lastPos = lastchild.attr("pos");
		newPos = parseInt(lastPos) +1;

		//Die anzahl der bereits bestehenden muss in eine variabe gespeichert werden
		var laneT = $(this).parent().parent().attr("lane");
		colPar = $("#" + laneT);
		panelShow = colPar.children();
		panelShow.eq(lastPos).css("display","block");
	/*
	  <div class="imgAdd" pos="1"style="border-style: solid; border-color:black;" 
	  	data-toggle="modal" data-target="#modal_item" ></div>
	*/
	//Added an der richtigen stelle ein neues Feld sofern nicht schon sechs dort stehen
		if(par.children(".imgAdd").size()!=6){			
			lastchild.after("<div class='imgAdd' pos='"+ newPos+"' style='border-style: solid; border-color:black;'data-toggle='modal' data-target='#modal_item'><img src='' ></div>");
		}
	});
	/*######################################################################################
	addItem function section
	########################################################################################*/
	$(document).on("click",".minusAdd", function(){
		console.log("minusAdd wurde geklickt");
		//Beim klick muss zuerst herausgefunden werden wo genau man sich befindet
		//Dazu brucht man eine variable bei der der parent gespeichert wird
		var parClass = $(this).parent().siblings().children().attr("class");
		var par = $(this).parent().siblings().children();
		console.log(par.children());
		//wenn geklick wurde muss die aktuelle position des letzten imgAdd gesucht werden 
		var lastchild = par.children(".imgAdd").last();
		var lastPos = lastchild.attr("pos");
		//Die anzahl der bereits bestehenden muss in eine variabe gespeichert werden
		var laneT = $(this).parent().parent().attr("lane");

		colPar = $("#" + laneT);
		panelShow = colPar.children();
		//wenn es mehr als ein imgAdd in den items hat so kann das an letzter stelle entfernt werden
		if(lastPos > 1){

			par.children().eq(lastPos-1).remove();
			//Wenn es entfernt wurde so muss auch die beschreibung entfernt werden
			panelShow.eq(lastPos-1).css("display","none");
			//Das bild muss entfernt werden
			panelShow.eq(lastPos-1).children(".panel-body").children().children().children().children("img").attr("src", "");
			//Und der text muss auch entfernt werden
			panelShow.eq(lastPos-1).children(".panel-body").children(".col-md-9").children(".itemText").val("");
			//Entferne Item aus dem entsprechendem array
			switch(parClass){
				case "coreEarly":
					coreEarly[lastPos-1] = "";
					break;
				case "coreMid":
					coreMid[lastPos-1] = "";
					break;
				case "coreLate":
					coreLate[lastPos-1] = "";
					break;
			}


		}
		makeItemStrings();
	});

	/*######################################################################################
	Item pick up function section
	########################################################################################*/

	var itemid;
	var itemimg;
	var srcDrinId;
	//Array mit einem item/url pro slot
	var finalBuild = [];
	var startBuild = [];
	var coreEarly = [];
	var coreMid = [];
	var coreLate = [];

	var strFinalBuild = "";
	var strStartBuild = "";
	var strCoreEarly = "";
	var strCoreMid = "";
	var strCoreLate = "";
	var build = "";

	//funktion welche bei edit oder validation die richtien items einführt
	loadItems();

	//Ueberprüft wo geklickt wurde und speichert die id in itemid

	$(document).on("click",".imgAdd", function(){
		itemid = $(this).attr("pos");
		build = $(this).parent().attr("class");	
		//Speichere die anzahl siblings in eine variable
		childs = $(this).parent().children(".imgAdd");
		anzChilds = childs.length;
	});

	$(document).on("click",'img.imgItem', function(){

		//Speicher das Bild bei klick auf ein item in eine variable
		itemimg = $(this).attr("src");

		//fügt dem geklickten dieses Bild hinzu
		$("."+build+"> .imgAdd[pos='" +itemid +"']").children("img").attr("pos", itemid);
		$("."+build+"> .imgAdd[pos='" +itemid +"']").children("img").attr("src", itemimg);
		//Erstelle eintrag im Array und wandle in ein String um und setze in an den richtigen ort
		//Wenn es sich um den Finalbuild handelt
		if(build == "finalbuild"){
			finalBuild[itemid-1] = itemimg;
			console.log(finalBuild);
			if(itemid <7){
				itemid++;
			}
		//Wenn es sicht um den startbuild handelt	
		}else if(build == "startbuild"){
			startBuild[itemid-1] = itemimg;
			console.log(startBuild);
			if(itemid <6){
				itemid++;
			}
		}else if(build == "coreEarly"){
			coreEarly[itemid-1] = itemimg;
			console.log(itemid);
			if(itemid <6){
				if(anzChilds<itemid){
					itemid++;
				}

			}
		}else if(build == "coreMid"){
			coreMid[itemid-1] = itemimg;
			console.log(coreMid);
				if(anzChilds<itemid){
					itemid++;
				}
		}else if(build == "coreLate"){
			coreLate[itemid-1] = itemimg;
			console.log(coreLate);
				if(anzChilds<itemid){
					itemid++;
				}
		}
		makeItemStrings();
	});

	function makeItemStrings(){
		strFinalBuild = "";
		strStartBuild = "";
		strCoreEarly = "";
		strCoreMid = "";
		strCoreLate= "";
		//Macht aus dem Array einen String für dem Finalbuild
		for(var i = 0; i < finalBuild.length;i++){
			strFinalBuild = strFinalBuild + finalBuild[i] + "|";
		}
		//Macht aus dem Array einen String für den Startbuild
		for(var i = 0; i < startBuild.length;i++){
			strStartBuild = strStartBuild + startBuild[i] + "|";
		}		
		//Macht aus dem Array einen String für den earlyCore
		for(var i = 0; i < coreEarly.length;i++){
			strCoreEarly = strCoreEarly + coreEarly[i] + "|";
		}	
		//Macht aus dem Array einen String für den midCore
		for(var i = 0; i < coreMid.length;i++){
			strCoreMid = strCoreMid + coreMid[i] + "|";
		}
		for(var i = 0; i < coreLate.length;i++){
			strCoreLate = strCoreLate + coreLate[i] + "|";
		}	
		//Adde den string den hidden textfielder zu
		$("#final_build").val(strFinalBuild);
		$("#start_build").val(strStartBuild);
		$("#early_build").val(strCoreEarly);
		$("#mid_build").val(strCoreMid);
		$("#late_build").val(strCoreLate);
	}

	//Funktion welche das ausfüllen der items bei editieren oder validieren übernimmt
	function loadItems(){
		//Füllt den Startbuild ein
		//Variable welche alle imgAdd div enthält
		if(gon.startArray.length > 0){
			var imgAdds = $(".startbuild").children();
			for(var i = 0; i< gon.startArray.length;i++){
				//Das Bild wird an der richtigen position hinzugefügt
				imgAdds.eq(i).children().attr("src",gon.startArray[i]);
				imgAdds.eq(i).children().attr("pos",i+1);
				//Das item wird an der richtigen stelle im array hinzugefügt
				startBuild.push(gon.startArray[i]);
			}
		}
		if(gon.finalArray.length > 0){
			var imgAdds = $(".finalbuild").children();
			for(var i = 0; i< gon.finalArray.length;i++){
				//Das Bild wird an der richtigen position hinzugefügt
				imgAdds.eq(i).children().attr("src",gon.finalArray[i]);
				imgAdds.eq(i).children().attr("pos",i+1);
				//Das item wird an der richtigen stelle im array hinzugefügt
				finalBuild.push(gon.finalArray[i]);
			}
		}
		if(gon.earlyCore.length>0){
			var panelEarly = $("#earlyitems").children();
			var addItems = $("#addEarlyItems");
			//fügt an erster stelle bei der ausawahl und der beschreibung das bild hinzu
			addItems.children(".imgAdd").last().children().attr("src", gon.earlyCore[0]);
			panelEarly.eq(0).find(".imgAdd").children().attr("src",gon.earlyCore[0]);
			//Dieses bild muss dem Array an erster Stelle hinzugefügt werden
			coreEarly[0] = gon.earlyCore[0];
			for(var i = 1; i< gon.earlyCore.length;i++){
				//Ladet das bild bei der beschreibung
				panelEarly.eq(i).find(".imgAdd").children().attr("src",gon.earlyCore[i]);
				panelEarly.eq(i).css("display", "block");
				lastitem = addItems.children(".imgAdd").last();
				//Es muss ein item für jedes bidl im array hinzugefügt werden
				lastitem.after("<div class='imgAdd' pos='"+ (i+1)+"' style='border-style: solid; border-color:black;'data-toggle='modal' data-target='#modal_item'></div>");
				addItems.children(".imgAdd").last().html("<img src='"+ gon.earlyCore[i] +"' >");
				coreEarly[i] = gon.earlyCore[i];
				console.log(coreEarly);
			}
		}
		if(gon.midCore.length>0){
			var panelMid = $("#miditems").children();
			var addItems = $("#addMidItems");
			//fügt an erster stelle bei der ausawahl und der beschreibung das bild hinzu
			addItems.children(".imgAdd").last().children().attr("src", gon.midCore[0]);
			console.log(panelMid);
			panelMid.eq(0).find(".imgAdd").children().attr("src",gon.midCore[0]);
			//Dieses bild muss dem Array an erster Stelle hinzugefügt werden
			coreMid[0] = gon.midCore[0];
			for(var i = 1; i< gon.midCore.length;i++){
				//Ladet das bild bei der beschreibung
				panelMid.eq(i).find(".imgAdd").children().attr("src",gon.midCore[i]);
				panelMid.eq(i).css("display", "block");
				lastitem = addItems.children(".imgAdd").last();
				//Es muss ein item für jedes bidl im array hinzugefügt werden
				lastitem.after("<div class='imgAdd' pos='"+ (i+1)+"' style='border-style: solid; border-color:black;'data-toggle='modal' data-target='#modal_item'></div>");
				addItems.children(".imgAdd").last().html("<img src='"+ gon.midCore[i] +"' >");
				coreMid[i] = gon.midCore[i];
				console.log(coreMid);
			}
		}
		if(gon.lateCore.length>0){
			var panelLate = $("#lateitems").children();
			var addItems = $("#addLateItems");
			//fügt an erster stelle bei der ausawahl und der beschreibung das bild hinzu
			addItems.children(".imgAdd").last().children().attr("src", gon.lateCore[0]);
			console.log(panelMid);
			panelLate.eq(0).find(".imgAdd").children().attr("src",gon.lateCore[0]);
			//Dieses bild muss dem Array an erster Stelle hinzugefügt werden
			coreLate[0] = gon.lateCore[0];
			for(var i = 1; i< gon.lateCore.length;i++){
				//Ladet das bild bei der beschreibung
				panelLate.eq(i).find(".imgAdd").children().attr("src",gon.lateCore[i]);
				panelLate.eq(i).css("display", "block");
				lastitem = addItems.children(".imgAdd").last();
				//Es muss ein item für jedes bidl im array hinzugefügt werden
				lastitem.after("<div class='imgAdd' pos='"+ (i+1)+"' style='border-style: solid; border-color:black;'data-toggle='modal' data-target='#modal_item'></div>");
				addItems.children(".imgAdd").last().html("<img src='"+ gon.lateCore[i] +"' >");
				coreLate[i] = gon.lateCore[i];
				console.log(coreMid);
			}
		}
		//Am ende wenn alles geladen wurde werden die strings gemacht und dem hiddenfield hinzugefügt
		makeItemStrings();
	}

	/*######################################################################################
	Select Matchup section
	########################################################################################*/

	var id;
	var tmpidL;
	var tmpidR;
	var side;
	var clickedLeft = false;
	var clickedRight = false;
	var champ_eins;
	var champ_zwei;
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
				//Speichert den linken ausgewählten champion in eine variable
				champ_eins = $(".vsTextField").children("#you").find("#"+id).text();
				console.log(champ_eins);

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
				//Und man schon mal auf der linken seite geklickt hat
				//Speichert den ausgewählten champion in eine variable ab
				champ_zwei = $(".vsTextField").children("#opponent").find("#"+id).text();
				console.log(champ_zwei);
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

	$("#buttonCreate").click(function(){
		alert(Routes.new_matchup_path());
		window.location.href= Routes.new_matchup_path();
	});
	$("#buttonGo").click(function(){
		alert(Routes.new_matchup_path());
		window.location.href= Routes.specindex_path(champ_eins,champ_zwei);
	});
};
$(document).ready(ready);
$(document).on('page:load', ready);
