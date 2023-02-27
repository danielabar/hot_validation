Rails.application.routes.draw do
  resources :books
  resources :authors
  namespace :form_validations do
    resources :books, only: %i[create update]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "books#index"
end
