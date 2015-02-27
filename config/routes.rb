Rails.application.routes.draw do

  resources :champions do
    resources :counters do
    	member do
    		put "like" => "counters#upvote"
    		put "unlike" => "counters#downvote"
    	end
    end
  end

  root 'champions#index'

  devise_for :users
                              

end
