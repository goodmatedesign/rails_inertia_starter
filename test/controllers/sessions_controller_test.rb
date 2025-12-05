require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "signs out user" do
    get passwordless_sessions_url(sid: users(:one).generate_token_for(:passwordless))
    assert_difference "Session.count", -1 do
      delete sign_out_url
    end
    assert_redirected_to root_path
  end

  test "requires authentication" do
    delete sign_out_url
    assert_redirected_to sign_in_path
  end
end
