Rails.application.routes.draw do

 
  resources :counters
  resources :champions

  root 'champions#index'

  devise_for :users
  
end
