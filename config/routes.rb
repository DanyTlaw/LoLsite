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

  mount Commontator::Engine => '/commontator'

  root 'champions#index'

  get '/selectmatchup' => 'matchups#selectmatchup'

  devise_for :users

end
