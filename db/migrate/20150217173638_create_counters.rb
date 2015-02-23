class CreateCounters < ActiveRecord::Migration
  def change
    create_table :counters do |t|

      t.timestamps null: false
      t.string :champ_name
      t.integer :champ_id
      t.string :champ_gegner
      t.string :strong
      t.string :weak
    end
  end
end
