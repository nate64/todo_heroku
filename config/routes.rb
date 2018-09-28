Rails.application.routes.draw do
  namespace :api do 
    resource :todos
end

get '*other', to: 'static#index'
end
