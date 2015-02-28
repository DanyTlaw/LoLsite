Rails.application.routes.draw do

  resources :champions do
    resources :counters
  end

  root 'champions#index'

  devise_for :users
                                                                                                                                
end
