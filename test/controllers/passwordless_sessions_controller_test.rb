require "test_helper"

class PasswordlessSessionsControllerTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  test "sends magic link and creates user if needed" do
    assert_difference [ "User.count", "MagicLink.count" ], 1 do
      assert_enqueued_emails 1 do
        post sign_in_url(locale: :en), params: { email: "newuser@example.com" }
      end
    end
    assert_redirected_to verify_sign_in_path(locale: :en)
  end

  test "signs in with valid code" do
    user = users(:one)
    magic_link = user.magic_links.create!

    assert_difference "Session.count", 1 do
      post verify_sign_in_url(locale: :en), params: { code: magic_link.code }
    end
    assert_redirected_to localized_root_path(locale: :en)
    assert MagicLink.where(id: magic_link.id).empty?, "MagicLink should be consumed"
  end

  test "rejects invalid code" do
    post verify_sign_in_url(locale: :en), params: { code: "INVALID" }
    assert_redirected_to verify_sign_in_path(locale: :en)
  end

  test "rejects expired code" do
    user = users(:one)
    magic_link = user.magic_links.create!

    travel 20.minutes do
      post verify_sign_in_url(locale: :en), params: { code: magic_link.code }
      assert_redirected_to verify_sign_in_path(locale: :en)
    end
  end

  test "redirects signed in user" do
    sign_in_as users(:one)
    get sign_in_url(locale: :en)
    assert_redirected_to localized_root_path(locale: :en)
  end

  private

  def sign_in_as(user)
    magic_link = user.magic_links.create!
    # Set up session for verify page
    post sign_in_url(locale: :en), params: { email: user.email }
    post verify_sign_in_url(locale: :en), params: { code: magic_link.code }
  end
end
