module ApplicationHelper

	def topweak(name)
		#Alle Counter vom spezifischen Champion nach weak geordnet
		@counterweak = Counter.where(champ_name: name)
		return @counterweak
	end

	def oneChamp(champname)
		@champs = Champion.find_by_name(champname)
		return @champs
	end

end
