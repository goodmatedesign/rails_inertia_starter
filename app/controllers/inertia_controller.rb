class InertiaController < ApplicationController
  inertia_share flash: -> { flash.to_hash }
  inertia_share user: -> { user_props }

  private
    def user_props
      return nil unless Current.session&.user

      { email: Current.user.email }
    end
end
