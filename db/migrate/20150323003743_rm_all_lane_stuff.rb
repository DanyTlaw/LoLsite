class RmAllLaneStuff < ActiveRecord::Migration
  def change
  	remove_column :matchups, :earlyitem_1, :text
  	remove_column :matchups, :earlyitem_2, :text
  	remove_column :matchups, :earlyitem_3, :text

  	remove_column :matchups, :miditem_1, :text
  	remove_column :matchups, :miditem_2, :text
  	remove_column :matchups, :miditem_3, :text

  	remove_column :matchups, :lateitem_1, :text
  	remove_column :matchups, :lateitem_2, :text
  	remove_column :matchups, :lateitem_3, :text
  end
end
