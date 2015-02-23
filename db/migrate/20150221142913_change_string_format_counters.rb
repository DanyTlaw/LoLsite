class ChangeStringFormatCounters < ActiveRecord::Migration
	def self.up
		change_table :counters do |t|
		t.change :strong, 'integer USING CAST(strong AS integer)'
		end
	end
 
	def self.down
		change_table :counters do |t|
		t.change :weak, 'integer USING CAST(weak AS integer)'
		end
	end 
end
