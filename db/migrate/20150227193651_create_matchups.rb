class CreateMatchups < ActiveRecord::Migration
  def change
    create_table :matchups do |t|

      t.timestamps null: false
      t.string :champ_eins
      t.string :champ_zwei
      t.integer :champ_eins_id
      t.integer :champ_zwei_id
      t.integer :user_id
      
    end
  end
end
