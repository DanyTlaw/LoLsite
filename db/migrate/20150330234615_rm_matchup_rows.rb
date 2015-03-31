class RmMatchupRows < ActiveRecord::Migration
  def change
  	remove_column :matchups, :situational_items, :text
  	remove_column :matchups, :trinkets, :text
  end
end
