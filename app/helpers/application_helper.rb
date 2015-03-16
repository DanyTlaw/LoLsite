module ApplicationHelper

	#Make Devise variables accessible from other controllers
	def resource_name
		:user
	end

	def resource
		@resource ||= User.new
	end

	def devise_mapping
	 	@devise_mapping ||= Devise.mappings[:user]
	end

	# Get strongest Counters
	def getTopStrong(name)
		# Get all champions
		counters = Counter.where(champ_name: name)
		vArray = Array.new

		# add champs to temp Array with all the needed information
		counters.each do |w|
			champ = Champion.find_by_name(w.champ_gegner)
			vArray.push({"name" => w.champ_gegner, 
									 "upvotes" => w.get_upvotes.size,
									 "downvotes" => w.get_downvotes.size,
									 "portrait" => champ.portrait,
									 "champion_id" => w.champion_id,
									 "id" => w.id
									 })
		end

		# Sort the Array and only take the first 5
		topStrong = vArray.sort_by{|item| [item['upvotes']]}.reverse!.first(5)

		return topStrong
	end

	# Get weakest Counters
	def getTopWeak(name)
		# Get all champions
		counters = Counter.where(champ_name: name)
		vArray = Array.new

		# add champs to temp Array with all the needed information
		counters.each do |w|
			champ = Champion.find_by_name(w.champ_gegner)
			vArray.push({"name" => w.champ_gegner, 
									 "upvotes" => w.get_upvotes.size,
									 "downvotes" => w.get_downvotes.size,
									 "portrait" => champ.portrait,
									 "champion_id" => w.champion_id,
									 "id" => w.id									 
									 })
		end

		# Sort the Array and only take the first 5
		topWeak = vArray.sort_by{|item| [item['downvotes']]}.reverse!.first(5)

		return topWeak
	end
end
