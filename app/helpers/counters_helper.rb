module CountersHelper
	def actualCounter(champname, countername)
		counter = Counter.where(champ_name: champname).where(champ_gegner: countername).first
		return counter
	end
end
