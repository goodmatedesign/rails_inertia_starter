require "test_helper"

class PasswordlessSessionsControllerTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  test "sends magic link and creates user if needed" do
    assert_difference "User.count", 1 do
      assert_enqueued_emails 1 do
        post sign_in_url, params: { email: "newuser@example.com" }
      end
    end
    assert_redirected_to sign_in_path
  end

  test "signs in with valid token" do
    token = users(:one).generate_token_for(:passwordless)
    assert_difference "Session.count", 1 do
      get passwordless_sessions_url(sid: token)
    end
    assert_redirected_to root_path
  end

  test "rejects invalid token" do
    get passwordless_sessions_url(sid: "invalid")
    assert_redirected_to sign_in_path
  end

  test "rejects expired token" do
    token = users(:one).generate_token_for(:passwordless)
    travel 2.hours do
      get passwordless_sessions_url(sid: token)
      assert_redirected_to sign_in_path
    end
  end

  test "redirects signed in user" do
    sign_in_as users(:one)
    get sign_in_url
    assert_redirected_to root_path
  end

  private

  def sign_in_as(user)
    get passwordless_sessions_url(sid: user.generate_token_for(:passwordless))
  end
end
