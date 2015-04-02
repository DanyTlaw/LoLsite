class Champion < ActiveRecord::Base
has_many :counters
	# Methode welche den Loading Splash pro Champion zurück gibt
	def loadingChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				# Bearbeitet den String so, das er für die Loading Splashs benutzt werden kann
				@imgChamp = self[:name].gsub(/[^0-9a-z ]/i, '').delete(' ')
				# Beinhaltet alle ausnahmen wegen schlechten Api Namen Nennung
				if champ[:name] == "Fiddlesticks"
					@imgChamp = "FiddleSticks"
				elsif champ[:name] == "Kha'Zix"
					@imgChamp = "Khazix"
				elsif champ[:name] == "Cho'Gath"
					@imgChamp = "Chogath"
				elsif champ[:name] == "LeBlanc"
					@imgChamp = "Leblanc"
				elsif champ[:name] == "Wukong"
					@imgChamp = "MonkeyKing"
				elsif champ[:name] == "Vel'Koz"
					@imgChamp = "Velkoz"
				end
			end
		end
		url = "http://ddragon.leagueoflegends.com/cdn/" + "img/champion/loading/" + @imgChamp + "_0.jpg"
		return url
	end
	# Methode welche das Portrait des einzelnen Champions zurück gibt
	def portraitChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				champ.image.each do |string, img|
					if string == "full"
						@imgChamp = img					
					end
				end
			end
		end
		url = $apiurl + "champion/" + @imgChamp.to_s
		return url
	end
	# Methode welche das Splash bild pro Champion zurück gibt
	def splashChamps
		$allchamps.each do |champ|
			if champ[:name] == self[:name]
				# Bearbeitet den String so, das er für die Loading Splashs benutzt werden kann
				@imgChamp = self[:name].gsub(/[^0-9a-z ]/i, '').delete(' ')
				# Beinhaltet alle ausnahmen wegen schlechten Api Namen Nennung
				if champ[:name] == "Fiddlesticks"
					@imgChamp = "FiddleSticks"
				elsif champ[:name] == "Kha'Zix"
					@imgChamp = "Khazix"
				elsif champ[:name] == "Cho'Gath"
					@imgChamp = "Chogath"
				elsif champ[:name] == "LeBlanc"
					@imgChamp = "Leblanc"
				elsif champ[:name] == "Wukong"
					@imgChamp = "MonkeyKing"
				elsif champ[:name] == "Vel'Koz"
					@imgChamp = "Velkoz"
				end
			end
		end
		url = "http://ddragon.leagueoflegends.com/cdn/" + "img/champion/splash/" + @imgChamp + "_0.jpg"
		return url
	end
end
