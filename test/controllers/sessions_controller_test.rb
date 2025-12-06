require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "signs out user" do
    sign_in_as users(:one)
    assert_difference "Session.count", -1 do
      delete sign_out_url(locale: :en)
    end
    assert_redirected_to localized_root_path(locale: :en)
  end

  test "requires authentication" do
    delete sign_out_url(locale: :en)
    assert_redirected_to sign_in_path(locale: :en)
  end

  private

  def sign_in_as(user)
    magic_link = user.magic_links.create!
    post sign_in_url(locale: :en), params: { email: user.email }
    post verify_sign_in_url(locale: :en), params: { code: magic_link.code }
  end
end
