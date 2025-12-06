class PasswordlessSessionsController < InertiaController
  skip_before_action :authenticate
  before_action :require_no_authentication, only: %i[new create]

  def new
    render inertia: "auth/SignIn"
  end

  def create
    @user = User.find_or_create_by(email: params[:email])

    if @user.persisted?
      send_passwordless_email
      redirect_to sign_in_path, notice: t("flash.magic_link_sent")
    else
      redirect_to sign_in_path, alert: @user.errors.full_messages.first
    end
  end

  def show
    @user = User.find_by_token_for(:passwordless, params[:sid])

    if @user
      start_new_session_for(@user)
      redirect_to localized_root_path, notice: t("flash.signed_in")
    else
      redirect_to sign_in_path, alert: t("flash.invalid_token")
    end
  end

  private
    def send_passwordless_email
      UserMailer.with(user: @user, locale: I18n.locale).passwordless.deliver_later
    end
end
