class DeleteChampNameId < ActiveRecord::Migration
  def change
  	remove_column :counters, :champ_name_id
  end
end
