class Post < ActiveRecord::Base
	mount_uploader :image, PostUploader
end
