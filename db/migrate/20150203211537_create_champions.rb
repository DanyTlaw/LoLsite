class CreateChampions < ActiveRecord::Migration
  def change
    create_table :champions do |t|
      t.string :name
      t.string :lane
      t.text :quickinfo

      t.timestamps null: false
    end
  end
end
