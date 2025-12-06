class PasswordlessSessionsController < InertiaController
  skip_before_action :authenticate
  before_action :require_no_authentication, only: %i[new create verify confirm]

  rate_limit to: 10, within: 3.minutes, only: :create,
    with: -> { redirect_to sign_in_path, alert: t("flash.rate_limited") }

  rate_limit to: 10, within: 15.minutes, only: :confirm,
    with: -> { redirect_to verify_sign_in_path, alert: t("flash.rate_limited") }

  def new
    render inertia: "auth/SignIn"
  end

  def create
    @user = User.find_or_create_by(email: params[:email])

    if @user.persisted?
      @magic_link = @user.magic_links.create!
      send_passwordless_email
      session[:passwordless_email] = @user.email
      redirect_to verify_sign_in_path
    else
      redirect_to sign_in_path, alert: @user.errors.full_messages.first
    end
  end

  def verify
    @email = session[:passwordless_email]
    redirect_to sign_in_path unless @email.present?

    render inertia: "auth/VerifyCode", props: { email: @email }
  end

  def confirm
    magic_link = MagicLink.consume(params[:code])

    if magic_link
      session.delete(:passwordless_email)
      start_new_session_for(magic_link.user)
      redirect_to localized_root_path, notice: t("flash.signed_in")
    else
      redirect_to verify_sign_in_path, alert: t("flash.invalid_code")
    end
  end

  private
    def send_passwordless_email
      UserMailer.with(user: @user, magic_link: @magic_link, locale: I18n.locale).passwordless.deliver_later
    end
end
