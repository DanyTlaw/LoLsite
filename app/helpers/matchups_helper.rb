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



	def runeStringSplit(runeString)
		# Splitet den String in die einzelnen typen mit anzahl -> 3xName
		arrRunes = Array.new
		arrRunes = runeString.split("|")
		return arrRunes
	end

end
