class UserMailer < ApplicationMailer
  def passwordless
    @user = params[:user]
    @locale = params[:locale] || I18n.default_locale
    @signed_id = @user.generate_token_for(:passwordless)

    I18n.with_locale(@locale) do
      mail to: @user.email, subject: t("user_mailer.passwordless.subject")
    end
  end
end
