class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_session
  before_action :authenticate

  helper_method :signed_in?

  private
    def set_current_session
      Current.session ||= Session.find_by(id: cookies.signed[:session_id])
    end

    def authenticate
      redirect_to sign_in_path, alert: "You need to sign in to access this page." unless signed_in?
    end

    def require_no_authentication
      redirect_to root_path, notice: "You are already signed in." if signed_in?
    end

    def signed_in?
      Current.session.present?
    end

    def start_new_session_for(user)
      user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |session|
        Current.session = session
        cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
      end
    end

    def terminate_session
      Current.session.destroy
      cookies.delete(:session_id)
    end
end
