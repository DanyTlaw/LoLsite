Rails.application.routes.draw do

  resources :posts

  resources :profiles 

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

  root 'statics#home'

  get '/selectmatchup' => 'matchups#selectmatchup'
  get '/specindex/:champ_eins/vs/:champ_zwei' => 'matchups#specindex', as: 'specindex'


  devise_for :users, controllers: { registrations: "users/registrations" }
                                

end
