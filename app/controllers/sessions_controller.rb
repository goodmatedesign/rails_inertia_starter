class SessionsController < ApplicationController
  def destroy
    terminate_session
    redirect_to root_path, notice: "You have been signed out."
  end
end
