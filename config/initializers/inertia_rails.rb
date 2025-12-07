# frozen_string_literal: true

InertiaRails.configure do |config|
  config.version = ViteRuby.digest
  config.ssr_enabled = ViteRuby.config.ssr_build_enabled
  config.encrypt_history = true
  config.always_include_errors_hash = true
end
