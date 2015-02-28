module ApplicationHelper

	def topweak(name)
		#Alle Counter vom spezifischen Champion nach weak geordnet
		@counterweak = Counter.where(champ_name: name)
		return @counterweak
	end

	def oneChamp(champname)
		puts champname
		@champs = Champion.find_by_name(champname)
		puts @champs.name
		return @champs
	end

end
