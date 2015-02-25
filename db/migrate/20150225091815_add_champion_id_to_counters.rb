class AddChampionIdToCounters < ActiveRecord::Migration
  def change
  	add_column :counters, :champion_id, :integer
  end
end
