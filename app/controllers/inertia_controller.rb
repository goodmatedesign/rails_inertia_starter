class InertiaController < ApplicationController
  inertia_share flash: -> { flash.to_hash }
  inertia_share user: -> { user_props }
  inertia_share locale: -> { current_locale }
  inertia_share available_locales: -> { available_locales }

  private
    def user_props
      return nil unless Current.session&.user

      { name: Current.user.name, email: Current.user.email }
    end
end
