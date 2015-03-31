class Profile < ActiveRecord::Base
	#attr_accessible :image
	belongs_to :user
	has_one :avatar
	mount_uploader :avatar, AvatarUploader


	def after_initialize
		self.build_profile if self.profile.nil?
	end


	def summoner_profile

		summonerinfo = Hash.new
  	 
		summonerdata = $clienteuw.summoner.by_name(self[:summoner]) 
			summonerid = String.new 
			summonerdata.each do |ini| 
				summonerinfo['name'] = ini.name
				summonerinfo['id'] = ini.id
				summonerinfo['level'] = ini.summoner_level
			end
		return summonerinfo
	end

	def summoner_league(sinfo)

		leagueinfo = Hash.new
		imagepath = String.new

		leaguedata = $clienteuw.league.get_entries(sinfo['id'])

		leaguedata.each do |string, league|
			league.each do |there|
				leagueentries = Array.new
				leagueentries.push(there.entries).each do |every|
					every.each do |arr|
						@divnr = arr.division
					end
				end
				divi = there.tier + '_' + @divnr		
				leagueinfo[there.queue] = divi
			end
		end
		puts leagueinfo
		return leagueinfo
	end
end