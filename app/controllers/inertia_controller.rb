class InertiaController < ApplicationController
  inertia_share flash: -> { flash.to_hash }
end
