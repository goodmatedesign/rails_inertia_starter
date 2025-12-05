require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "passwordless email" do
    email = UserMailer.with(user: users(:one)).passwordless
    assert_equal [ users(:one).email ], email.to
    assert_equal "Your sign-in link", email.subject
    assert_match %r{sign_in/}, email.body.encoded
  end
end
