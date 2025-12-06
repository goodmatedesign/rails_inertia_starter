class SessionsController < ApplicationController
  def destroy
    terminate_session
    redirect_to localized_root_path, notice: t("flash.signed_out")
  end
end
