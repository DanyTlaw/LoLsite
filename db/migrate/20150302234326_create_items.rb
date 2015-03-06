class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|

      t.timestamps null: false
      t.string :name
      t.string :info
      t.string :image
      
    end
  end
end
