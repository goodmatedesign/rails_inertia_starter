Rails.application.routes.draw do
  # Authentication
  get "sign_in", to: "passwordless_sessions#new"
  post "sign_in", to: "passwordless_sessions#create"
  get "sign_in/:sid", to: "passwordless_sessions#show", as: :passwordless_sessions
  delete "sign_out", to: "sessions#destroy"

  # OmniAuth
  get "auth/:provider/callback", to: "omniauth#create"
  post "auth/:provider/callback", to: "omniauth#create"
  get "auth/failure", to: "omniauth#failure"

  root "home#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
