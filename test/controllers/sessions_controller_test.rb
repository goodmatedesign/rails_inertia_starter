require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "signs out user" do
    get passwordless_sessions_url(locale: :en, sid: users(:one).generate_token_for(:passwordless))
    assert_difference "Session.count", -1 do
      delete sign_out_url(locale: :en)
    end
    assert_redirected_to localized_root_path(locale: :en)
  end

  test "requires authentication" do
    delete sign_out_url(locale: :en)
    assert_redirected_to sign_in_path(locale: :en)
  end
end
