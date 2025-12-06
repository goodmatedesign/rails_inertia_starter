require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "passwordless email in English" do
    email = UserMailer.with(user: users(:one), locale: :en).passwordless
    assert_equal [ users(:one).email ], email.to
    assert_equal "Your sign-in link", email.subject
    assert_match %r{/en/sign_in/}, email.body.encoded
  end

  test "passwordless email in Chinese" do
    email = UserMailer.with(user: users(:one), locale: :zh).passwordless
    assert_equal [ users(:one).email ], email.to
    assert_equal "您的登录链接", email.subject
    # Check the decoded body for Chinese locale
    assert_match %r{/zh/sign_in/}, email.html_part.body.decoded
  end
end
