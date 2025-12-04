class UserMailer < ApplicationMailer
  def passwordless
    @user = params[:user]
    @signed_id = @user.generate_token_for(:passwordless)

    mail to: @user.email, subject: "Your sign-in link"
  end
end
