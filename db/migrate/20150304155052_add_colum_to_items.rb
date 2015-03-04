class AddColumToItems < ActiveRecord::Migration
  def change

  	add_column :items, :cost, :string

  end
end
