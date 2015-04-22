$clienteuw = Lol::Client.new "755af3ee-dd19-4246-9f07-a5e442f8f2a0", {region: "euw"}

############################################################## static data ######################################
$allchamps = $clienteuw.static.champion.get(champData: 'all')

$masteries = $clienteuw.static.mastery.get(masteryListData: 'all')

$items = $clienteuw.static.item.get(itemListData: 'all')

$summoners = $clienteuw.static.summoner_spell.get(spellData: 'all')

$runes = $clienteuw.static.rune.get(runeListData: 'all')
############################################################## champion #########################################






############################################################## item id img ######################################
itemimages = Array.new
$imgItem = Array.new
$itemDesc = Array.new

$items.each do |item|
	$itemDesc.push(item.description)
	itemimages.push(item.image)
end

itemimages.each do |item|

	item.each do |string, img|
		if string == "full"
			$imgItem.push(img)
		end
	end
end
############################################################## Summoner img id und desc ##########################
sumimages = Array.new
$imgSum = Array.new
$sumDesc = Array.new

$summoners.each do |sum|
	$sumDesc.push(sum.description)
	sumimages.push(sum.image)
end

sumimages.each do |sum|
	sum.each do |string, img|
		if string == "full"
			$imgSum.push(img)
		end
	end
end
############################################################## Runes all info img id und desc ######################
runeimages = Array.new
runeinfos = Array.new
$imgRune = Array.new
$runeDesc = Array.new
$runeType = Array.new
$runeTier = Array.new

$runes.each do |rune|
	$runeDesc.push(rune.description)
	runeimages.push(rune.image)
	runeinfos.push(rune.rune)
end

runeimages.each do |rune|
	rune.each do |string, img|
		if string == "full"
			$imgRune.push(img)
		end
	end
end

runeinfos.each do |rune|
	rune.each do |string, info|
		if string == "tier"
			$runeTier.push(info)

		elsif string == "type"
			$runeType.push(info)
		end
	end
end
