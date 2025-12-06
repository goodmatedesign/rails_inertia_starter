module Localizable
  extend ActiveSupport::Concern

  included do
    around_action :switch_locale
    helper_method :current_locale, :available_locales, :locale_path
  end

  private

  def switch_locale(&action)
    locale = extract_locale || session[:locale] || I18n.default_locale
    session[:locale] = locale
    I18n.with_locale(locale, &action)
  end

  def extract_locale
    parsed_locale = params[:locale]
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end

  def current_locale
    I18n.locale.to_s
  end

  def available_locales
    I18n.available_locales.map(&:to_s)
  end

  def default_url_options
    { locale: I18n.locale }
  end

  # Helper to generate path for switching locales
  def locale_path(new_locale)
    url_for(request.params.merge(locale: new_locale, only_path: true))
  rescue ActionController::UrlGenerationError
    "/#{new_locale}"
  end
end
