$(document).ready(function(){
	var id;
	var tmpid;
	var side;
	var clickedLeft = false;
	var clickedRight = false;

	$('#row > img').hover(
		function(){
		//Speichert die klasse vom mouse enter event in die variabe Seite (left or right)
		side = $(this).attr("class");
		//Speichert die id vom mouse entered in diese variable
		id = $(this).attr("id");
			if(!clickedLeft && side == "left"){

				$('#you > div#' + id).css("display","block");
				$('#you > div#default').css("display","none");

				$('div#'+"left"+'.'+id).css("display","block");			
			}else if(!clickedRight && side =="right"){


				$('#opponent > div#' +id).css("display","block");
				$('#opponent > div#default').css("display","none");

				$('div#'+"right"+'.'+id).css("display","block");

			}

		},
		function(){
		side = $(this).attr("class");
			if(!clickedLeft && side =="left"){

					$('div#'+"left"+'.'+id).css("display","none");

					$('#you > div#' + id).css("display","none");
					$('#you > div#default').css("display","block");
			
	
			}else if(!clickedRight  && side =="right"){

					$('div#'+"right"+'.'+id).css("display","none");

					$('#opponent > div#' +id).css("display","none");
					$('#opponent > div#default').css("display","block");		
		
			}	
	}).click(function(){

			if(side == "left"){
				if(clickedLeft){

					clickedLeft = false;
					$('#you > div#' + tmpid).css("display","none");
					$('div#'+"left"+'.'+tmpid).css("display","none");
					if(tmpid != id){
						tmpid = id;
						clickedLeft = true;
						$('#you > div#' + id).css("display","block");
						$('div#'+"left"+'.'+id).css("display","block");
					}
				}else{
					$('div#'+"left"+'.'+tmpid).css("display","none");					
					tmpid = id;
					clickedLeft = true;

					$('#you > div#' + id).css("display","block");

					$('div#'+"left"+'.'+id).css("display","block");					
				}

			}else if (side == "right"){
				if(clickedRight){
					clickedRight = false;
					$('#opponent > div#' + tmpid).css("display","none");
					$('div#'+"right"+'.'+tmpid).css("display","none");
					if(tmpid != id){
						tmpid = id;
						clickedRight = true;
						$('#opponent > div#'+id).css("display","block");
						$('div#'+"right"+'.'+id).css("display","block");
					}
				}else{
					$('div#'+"right"+'.'+tmpid).css("display","none");
					tmpid = id;
					clickedRight = true;

					$('#opponent > div#' +id).css("display","block");

					$('div#'+"right"+'.'+id).css("display","block");					
				}
			}
		});

});


