Rails.application.routes.draw do

  resources :champions

  root 'statics#home'

  get '/ahri', to: 'champions#ahri'
 
end
