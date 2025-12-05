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
end
