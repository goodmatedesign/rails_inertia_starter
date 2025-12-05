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

  test "generates passwordless token" do
    user = users(:one)
    token = user.generate_token_for(:passwordless)
    assert_equal user, User.find_by_token_for(:passwordless, token)
  end

  test "destroys sessions when destroyed" do
    user = users(:one)
    assert_difference "Session.count", -user.sessions.count do
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
