class ChangeStringFormatCounters2 < ActiveRecord::Migration
	def self.up
		change_table :counters do |t|
		t.change :weak, 'integer USING CAST(weak AS integer)'
		end
	end
 
	def self.down
		change_table :counters do |t|
		t.change :weak, 'integer USING CAST(weak AS integer)'
		end
	end 
end
