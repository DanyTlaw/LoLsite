class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.text :about
      t.string :summoner

      t.timestamps null: false
    end
  end
end
