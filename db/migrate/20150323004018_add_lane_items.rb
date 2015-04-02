class AddLaneItems < ActiveRecord::Migration
  def change
	add_column :matchups, :earlyitem, :text
	add_column :matchups, :miditem, :text
	add_column :matchups, :lateitem, :text
  end
end
