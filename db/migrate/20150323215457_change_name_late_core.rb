class ChangeNameLateCore < ActiveRecord::Migration
  def change
  	remove_column :matchups, :late_core_item, :text
  	add_column :matchups, :late_core_items, :text
  end
end
