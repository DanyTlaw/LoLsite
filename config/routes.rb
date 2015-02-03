Rails.application.routes.draw do
  resources :champions

  root 'statics#home'

 
end
