    ##Verbindung wird hergestellt mit der api aus der Region euw und euw pfad, da api key euw ist

    $client = RiotGamesApi::LOL::Client.new api_key: "755af3ee-dd19-4246-9f07-a5e442f8f2a0", region: "euw", use_ssl: "https://euw.api.pvp.net/"

    $item_list = $client.static_data.item_all

    $champs = $client.static_data.champion_all

    #items und url für die items werden gemacht

    itemImages = Array.new

	$item_image_url = Array.new
	$items = Array.new

	$item_list.data.each do |name, item|
		puts "#{name} => #{item}"
		$items.push(item)			
	end

	$items.each do |item|
		itemImages.push(item.image.full)	
	end
		
    realm = $client.static_data.realm
    url = realm.cdn

    #so sollte es gemacht werden jedoch ist das gem nch in einer alten version
    # -> dd_version = realm.dd -> 4.17.1
    dd_version = "5.4.1"

	#Für jedes Image wird der url im array hinzugefügt
	itemImages.each do |img|
		$item_image_url.push(url + '/' + dd_version + '/img/' + 'item' + '/' + img )
	end

	#champion und champion bilder url werden gemacht
	#Ein Array welche die image speichert
	champ_images = Array.new

	#Es wird durch den Hash alles champ iteriert und das bild jedes einzelne Champs wird im Array images 
	#hinzugefügt
	$champs.data.each do |name, champ|
		puts "#{name} => #{champ}"
		champ_images.push(champ.image.full)
		
	end

	#Ein Array welche alle url pfade für die images angegeben werden
	$champ_image_url = Array.new

    #Für jedes Image wird der url im array hinzugefügt
	champ_images.each do |img|
		$champ_image_url.push(url + '/' + dd_version + '/img/' + 'champion' + '/' + img )
	end

	$apiurl = (url + '/' + dd_version + '/img/' + 'champion' + '/')

