$clienteuw = Lol::Client.new "755af3ee-dd19-4246-9f07-a5e442f8f2a0", {region: "euw"}

danytier = $clienteuw.league.get_entries(27572622)
myentries = Array.new
danytier.each do |string, league|

	league.each do |there|
		#gibt meine solo q tier zurück
		puts there.tier
		puts there.queue
		puts there.entries
		myentries.push(there.entries)
	end
	
end

myentries.each do |every|
	puts every
	every.each do |arr|
		puts arr.division
	end
end