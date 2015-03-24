module MatchupsHelper

	#Metode um per namen das richtige img zu kriegen und macht dazu noch den link
	def urlImgMasteries(masteryname)
		$masteries.each do |mast|
			if mast[:name] == masteryname
				mast.image.each do |string, img|
					if string == "full"
						@thismast = img
					end
				end		
			end
		end
	
		
	#http://ddragon.leagueoflegends.com/cdn/5.2.1/img/mastery/4111.png

		url = $apiurl + "mastery/" + @thismast
		return url
	end

	def urlImgChamps(champname)
		$allchamps.each do |champ|
			if champ[:name] == champname
				champ.image.each do |string, img|
					if string == "full"
						@imgChamp = img
						
					end
				end
			end
		end
		url = $apiurl + "champion/" + @imgChamp
		return url
	end
end
