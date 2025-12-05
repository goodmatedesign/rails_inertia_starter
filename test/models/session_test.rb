require "test_helper"

class SessionTest < ActiveSupport::TestCase
  test "belongs to user" do
    assert_instance_of User, sessions(:one).user
  end

  test "invalid without user" do
    assert_not Session.new(user: nil).valid?
  end
end
