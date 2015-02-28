class AddBigSplashArt < ActiveRecord::Migration
  def change
  	add_column :champions, :splashartBig, :string
  end
end
