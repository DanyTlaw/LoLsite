class AddReferenceToCounter < ActiveRecord::Migration
	def self.up
		change_table :counters do |t|
		t.references :champ_name
		end
	end
 
	def self.down
		change_table :counters do |t|
		t.remove :champ_name
		end
	end 
end
