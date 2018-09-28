Rails.application.routes.draw do
  namespace :api do 
    resources :todos
end

get '*other', to: 'static#index'
end
