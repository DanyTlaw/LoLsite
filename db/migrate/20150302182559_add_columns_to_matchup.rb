class AddColumnsToMatchup < ActiveRecord::Migration
  def change

	add_column :matchups, :runes, :text
	add_column :matchups, :masteries, :text
	add_column :matchups, :summoners, :text
	add_column :matchups, :early_laning, :text
	add_column :matchups, :mid_laning, :text
	add_column :matchups, :late_laning, :text
	add_column :matchups, :general_role, :text
	add_column :matchups, :start_items, :text
	add_column :matchups, :final_build, :text
	add_column :matchups, :early_core_items, :text
	add_column :matchups, :mid_core_items, :text
	add_column :matchups, :situational_items, :text
	add_column :matchups, :trinkets, :text
  end
end
