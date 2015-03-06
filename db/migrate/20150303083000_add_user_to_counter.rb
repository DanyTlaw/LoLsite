class AddUserToCounter < ActiveRecord::Migration
  def change
  	add_column :counters, :current_user, :integer
  end
end
