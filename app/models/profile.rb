class Profile < ActiveRecord::Base
	belongs_to :user


  def after_initialize
    self.build_profile if self.profile.nil?
  end

end
