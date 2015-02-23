class AddImageToChamp < ActiveRecord::Migration
  def change
    # add_column table_name, :column_name, :column_type
    add_column :champions, :portrait, :string

  end
end
