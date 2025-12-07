Rails.application.routes.draw do
  mount_avo

  # OmniAuth (outside locale scope - callbacks don't need localization)
  get "auth/:provider/callback", to: "omniauth#create"
  post "auth/:provider/callback", to: "omniauth#create"
  get "auth/failure", to: "omniauth#failure"

  # Health check (outside locale scope)
  get "up" => "rails/health#show", as: :rails_health_check

  # Root redirects to default locale
  root to: redirect("/#{I18n.default_locale}", status: 302)

  # Locale-scoped routes
  scope "/:locale", locale: /#{I18n.available_locales.join('|')}/ do
    # Authentication
    get "sign_in", to: "passwordless_sessions#new", as: :sign_in
    post "sign_in", to: "passwordless_sessions#create"
    get "sign_in/verify", to: "passwordless_sessions#verify", as: :verify_sign_in
    post "sign_in/verify", to: "passwordless_sessions#confirm"
    delete "sign_out", to: "sessions#destroy", as: :sign_out

    # Home
    root "home#show", as: :localized_root

    # Pricing
    get "pricing", to: "pricing#show", as: :pricing

    # Posts
    resources :posts, only: [ :index ]
    get "posts/:slug", to: "posts#show", as: :post
  end

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
