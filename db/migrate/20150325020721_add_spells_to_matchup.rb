class AddSpellsToMatchup < ActiveRecord::Migration
  def change
  	add_column :matchups, :spell_q, :text
  	add_column :matchups, :spell_w, :text
  	add_column :matchups, :spell_e, :text
  	add_column :matchups, :spell_r, :text
  end
end
