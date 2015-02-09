// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


//Function for chaning image borders
$(function () {

	var guide = $('input[id=guide]');
	var matchup = $('input[id=matchup]');

  $(".port").click(function() {
  	
  	//Code for color the border guides
  	if (guide.filter(':checked').val()){
  		if($(this).hasClass('border-orange')){
  			$(this).removeClass("border-orange");
  			//here comes a link
  		}else{
  			$(this).addClass("border-orange");
  		}
  		
  	}
  	//Code for color the border matchups
  	if (matchup.filter(':checked').val()){
		if($(this).hasClass('border-red')){
  			$(this).removeClass("border-red");
  		}else{
  			$(this).addClass("border-red");
  		}	
  	}     
  });
});