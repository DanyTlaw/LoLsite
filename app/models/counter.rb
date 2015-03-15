class Counter < ActiveRecord::Base
	before_save :checkups
	after_rollback :voteCounter
	belongs_to :champion
	acts_as_votable
	acts_as_commontable

	protected

		# Ueberprueft ob es diesen Matchup schon gibt, wenn ja dann Rollback sonst erstellen
		def checkups	    
   		if Counter.exists?(champ_name: self.champ_name, champ_gegner: self.champ_gegner)
      	false
      # Der selbe Champ ist kein Counter deshalb Rollback 
    	elsif self.champ_name == self.champ_gegner
    		false
    	else
    		true	
			end
		end

		# Nach dem Rollback wird der Counter upvoted.
		def voteCounter
			counter = Counter.find_by(champ_name: self.champ_name, champ_gegner: self.champ_gegner)
			vuser = User.find(self.current_user)
      counter.liked_by vuser
		end
end
