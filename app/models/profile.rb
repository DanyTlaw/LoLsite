class Profile < ActiveRecord::Base
	#attr_accessible :image
	belongs_to :user
	has_one :avatar
	mount_uploader :avatar, AvatarUploader


  def after_initialize
    self.build_profile if self.profile.nil?
  end

end
