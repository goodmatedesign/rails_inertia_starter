require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "valid with email" do
    assert User.new(email: "test@example.com").valid?
  end

  test "invalid without email" do
    assert_not User.new(email: nil).valid?
  end

  test "invalid with duplicate email" do
    User.create!(email: "test@example.com")
    assert_not User.new(email: "test@example.com").valid?
  end

  test "normalizes email" do
    user = User.create!(email: "  TEST@EXAMPLE.COM  ")
    assert_equal "test@example.com", user.email
  end

  test "destroys sessions when destroyed" do
    user = users(:one)
    assert_difference "Session.count", -user.sessions.count do
      user.destroy
    end
  end

  test "destroys magic_links when destroyed" do
    user = users(:one)
    user.magic_links.create!
    assert_difference "MagicLink.count", -1 do
      user.destroy
    end
  end

  test "from_omniauth creates new user" do
    auth = mock_omniauth(email: "newuser@example.com")
    assert_difference "User.count", 1 do
      user = User.from_omniauth(auth)
      assert_equal "newuser@example.com", user.email
      assert_equal "google_oauth2", user.provider
      assert_equal "12345", user.uid
    end
  end

  test "from_omniauth finds existing oauth user" do
    auth = mock_omniauth(email: "oauth@example.com")
    existing = User.create!(email: "oauth@example.com", provider: "google_oauth2", uid: "12345")

    assert_no_difference "User.count" do
      user = User.from_omniauth(auth)
      assert_equal existing, user
    end
  end

  test "from_omniauth links oauth to existing email user" do
    auth = mock_omniauth(email: users(:one).email)

    assert_no_difference "User.count" do
      user = User.from_omniauth(auth)
      assert_equal users(:one), user
      assert_equal "google_oauth2", user.reload.provider
      assert_equal "12345", user.uid
    end
  end

  private

  def mock_omniauth(email:, provider: "google_oauth2", uid: "12345")
    OmniAuth::AuthHash.new(provider: provider, uid: uid, info: { email: email })
  end
end
