class Post < ActiveRecord::Base
	has_one :image
	mount_uploader :image, PostUploader


end
