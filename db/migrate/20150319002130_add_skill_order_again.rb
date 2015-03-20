class AddSkillOrderAgain < ActiveRecord::Migration
  def change
  	add_column :matchups, :skill_order, :string
  end
end
