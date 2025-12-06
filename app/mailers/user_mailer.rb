class UserMailer < ApplicationMailer
  def passwordless
    @user = params[:user]
    @magic_link = params[:magic_link]
    @locale = params[:locale] || I18n.default_locale

    I18n.with_locale(@locale) do
      mail to: @user.email, subject: t("user_mailer.passwordless.subject", code: @magic_link.code)
    end
  end
end
