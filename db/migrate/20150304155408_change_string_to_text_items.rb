class ChangeStringToTextItems < ActiveRecord::Migration
	def self.up
		change_table :items do |t|
		t.change :info, :text
		end
	end
 
	def self.down
		change_table :items do |t|
		t.change :info, :text
		end
	end 
end
