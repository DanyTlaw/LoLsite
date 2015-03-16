class Users::RegistrationsController < Devise::RegistrationsController
  
  def after_sign_up_path_for(resource)
   profile_path(current_user)
  end

  def new
    build_resource({})
    self.resource.profile = Profile.new
    respond_with self.resource
  end

  # POST /resource
  def create
    super
    self.resource.profile = Profile.new
    #@profile = Profile.new(profile_params)
    profile = Profile.new
  end

 private

  def profile_params
    params.require(:user).permit(:user_id, :about, :summoner)
  end

end