class Counter < ActiveRecord::Base
	belongs_to :champion
	acts_as_votable
end
