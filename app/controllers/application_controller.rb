class ApplicationController < ActionController::Base
	require 'lol'
	client = Lol::Client.new "755af3ee-dd19-4246-9f07-a5e442f8f2a0", {region: "euw"}
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    #devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:user_id, :username, :email, :password, :password_confirmation, :remember_me) }
  end
end
