require "test_helper"

class WaitlistControllerTest < ActionDispatch::IntegrationTest
  test "renders waitlist page" do
    get waitlist_url(locale: :en)
    assert_response :success
  end

  test "creates waitlist entry" do
    assert_difference "WaitlistEntry.count", 1 do
      post waitlist_url(locale: :en), params: { email: "newuser@example.com" }
    end
    assert_response :success
  end

  test "handles duplicate email gracefully" do
    WaitlistEntry.create!(email: "existing@example.com")

    assert_no_difference "WaitlistEntry.count" do
      post waitlist_url(locale: :en), params: { email: "existing@example.com" }
    end
    assert_response :success
  end
end
