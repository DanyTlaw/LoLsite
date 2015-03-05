class ApiController < ApplicationController
	#link zum gem api https://github.com/shishi/riot_games_api

	def champs

    @allchampion = champImages

	end

	#Methde welche alles url von dern Portrait der Champions holt
	def champImages

		#Es werden alle champions geladen incl daten (lange ladezeit)
		champs = $client.static_data.champion_all RiotGamesApi::LOL::CHAMPIONS
		#Ein Array welche die image speichert
		images = Array.new

		#Es wird durch den Hash alles champ iteriert und das bild jedes einzelne Champs wird im Array images 
		#hinzugefügt
		champs.data.each do |name, champ|
			puts "#{name} => #{champ}"
			images.push(champ.image.full)
			
		end

		#Ein Array welche alle url pfade für die images angegeben werden
		image_url = Array.new

		#informationen zum zusammensetzen des url werden gespeicht
	    realm = $client.static_data.realm
	    url = realm.cdn

	    #so sollte es gemacht werden jedoch ist das gem nch in einer alten version
	    # -> dd_version = realm.dd -> 4.17.1
	    dd_version = "5.4.1"

	    #Für jedes Image wird der url im array hinzugefügt
		images.each do |img|
			image_url.push(url + '/' + dd_version + '/img/' + 'champion' + '/' + img )
		end

		#Array mit allen image pfaden wird zurück gegeben
		return image_url

	end

end