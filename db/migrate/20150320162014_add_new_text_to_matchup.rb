class AddNewTextToMatchup < ActiveRecord::Migration
  def change
  	add_column :matchups, :earlyitem_1, :text
  	add_column :matchups, :earlyitem_2, :text
  	add_column :matchups, :earlyitem_3, :text

  	add_column :matchups, :miditem_1, :text
  	add_column :matchups, :miditem_2, :text
  	add_column :matchups, :miditem_3, :text

  	add_column :matchups, :lateitem_1, :text
  	add_column :matchups, :lateitem_2, :text
  	add_column :matchups, :lateitem_3, :text
  end
end
