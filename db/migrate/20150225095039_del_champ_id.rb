class DelChampId < ActiveRecord::Migration
  def change
  	remove_column :counters, :champ_id
  end
end
