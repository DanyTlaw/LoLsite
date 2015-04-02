class AddLateItemToMatchup < ActiveRecord::Migration
  def change
  	add_column :matchups, :late_core_item, :text
  end
end
