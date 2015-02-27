class RemoveWeakstrongFromCounters < ActiveRecord::Migration
  def change
  	remove_column :counters, :weak
  	remove_column :counters, :strong
  end
end
