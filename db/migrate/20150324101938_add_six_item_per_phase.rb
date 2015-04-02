class AddSixItemPerPhase < ActiveRecord::Migration
  def change
  	remove_column :matchups, :earlyitem, :text
  	remove_column :matchups, :miditem, :text
  	remove_column :matchups, :lateitem, :text

  	add_column :matchups,:early_item_1, :text
  	add_column :matchups,:early_item_2, :text
  	add_column :matchups,:early_item_3, :text
  	add_column :matchups,:early_item_4, :text
  	add_column :matchups,:early_item_5, :text
  	add_column :matchups,:early_item_6, :text

  	add_column :matchups,:mid_item_1, :text
  	add_column :matchups,:mid_item_2, :text
  	add_column :matchups,:mid_item_3, :text
  	add_column :matchups,:mid_item_4, :text
  	add_column :matchups,:mid_item_5, :text
  	add_column :matchups,:mid_item_6, :text

  	add_column :matchups,:late_item_1, :text
  	add_column :matchups,:late_item_2, :text
  	add_column :matchups,:late_item_3, :text
  	add_column :matchups,:late_item_4, :text
  	add_column :matchups,:late_item_5, :text
  	add_column :matchups,:late_item_6, :text
  end
end
