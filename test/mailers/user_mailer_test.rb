require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "passwordless email in English" do
    user = users(:one)
    magic_link = user.magic_links.create!
    email = UserMailer.with(user: user, magic_link: magic_link, locale: :en).passwordless

    assert_equal [ user.email ], email.to
    assert_equal "Your sign-in code is #{magic_link.code}", email.subject
    assert_match magic_link.code, email.body.encoded
  end

  test "passwordless email in Chinese" do
    user = users(:one)
    magic_link = user.magic_links.create!
    email = UserMailer.with(user: user, magic_link: magic_link, locale: :zh).passwordless

    assert_equal [ user.email ], email.to
    assert_equal "您的登录验证码是 #{magic_link.code}", email.subject
    assert_match magic_link.code, email.html_part.body.decoded
  end
end
