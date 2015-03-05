Rails.application.routes.draw do

  resources :matchups

  resources :champions do
    resources :counters do
    	member do
    		put "like" => "counters#upvote"
    		put "unlike" => "counters#downvote"
    	end
    end
  end

  root 'champions#index'

  get '/selectmatchup' => 'matchups#selectmatchup'

  #route für api tests
  get '/champs' => 'api#champs'

  devise_for :users
                              

end
