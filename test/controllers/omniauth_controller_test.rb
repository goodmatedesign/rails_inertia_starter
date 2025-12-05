require "test_helper"

class OmniauthControllerTest < ActionDispatch::IntegrationTest
  test "creates session on successful oauth" do
    mock_omniauth(email: "oauth@example.com")

    assert_difference "Session.count", 1 do
      get "/auth/google_oauth2/callback"
    end
    assert_redirected_to root_path
  end

  test "redirects to sign in on failure" do
    get "/auth/failure", params: { message: "Access denied" }
    assert_redirected_to sign_in_path
  end

  private

  def mock_omniauth(email:, provider: "google_oauth2", uid: "12345")
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new(
      provider: provider,
      uid: uid,
      info: { email: email }
    )
  end
end
