module MatchupsHelper

	#Metode um per namen das richtige img zu kriegen und macht dazu noch den link
	def urlImgMasteries(masteryname)
		$mastery.each do |mast|
			if mast["name"] == masteryname
				@thismast = mast
			end
		end
		imgMast = @thismast.image.full
		#http://ddragon.leagueoflegends.com/cdn/5.2.1/img/mastery/4111.png

		url = $apiurl + "mastery/" + imgMast
		return url
	end

end
