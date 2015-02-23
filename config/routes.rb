Rails.application.routes.draw do

 
  resources :counters
  resources :champions

  root 'statics#home'

  get '/ahri', to: 'champions#ahri'

  devise_for :users
  
end
