class OmniauthController < ApplicationController
  skip_before_action :authenticate

  def create
    @user = User.from_omniauth(omniauth)

    if @user.persisted?
      start_new_session_for(@user)
      redirect_to localized_root_path, notice: t("flash.signed_in")
    else
      redirect_to sign_in_path, alert: @user.errors.full_messages.first || "Authentication failed."
    end
  end

  def failure
    redirect_to sign_in_path, alert: params[:message] || "Authentication failed."
  end

  private
    def omniauth
      request.env["omniauth.auth"]
    end
end
