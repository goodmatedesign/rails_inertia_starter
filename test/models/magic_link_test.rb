require "test_helper"

class MagicLinkTest < ActiveSupport::TestCase
  test "generates code on create" do
    magic_link = users(:one).magic_links.create!
    assert_equal 6, magic_link.code.length
    assert magic_link.code.match?(/\A[0-9]+\z/)
  end

  test "sets expiration on create" do
    magic_link = users(:one).magic_links.create!
    assert_in_delta 15.minutes.from_now, magic_link.expires_at, 1.second
  end

  test "consume finds and destroys active link" do
    magic_link = users(:one).magic_links.create!
    code = magic_link.code

    result = MagicLink.consume(code)
    assert_equal magic_link.user, result.user
    assert MagicLink.where(id: magic_link.id).empty?
  end

  test "consume returns nil for invalid code" do
    assert_nil MagicLink.consume("INVALID")
  end

  test "consume returns nil for expired code" do
    magic_link = users(:one).magic_links.create!
    code = magic_link.code

    travel 20.minutes do
      assert_nil MagicLink.consume(code)
    end
  end

  test "consume strips whitespace" do
    magic_link = users(:one).magic_links.create!
    result = MagicLink.consume("  #{magic_link.code}  ")
    assert_equal magic_link.user, result.user
  end

  test "cleanup removes expired links" do
    users(:one).magic_links.create!
    expired = users(:one).magic_links.create!
    expired.update_column(:expires_at, 1.hour.ago)

    assert_difference "MagicLink.count", -1 do
      MagicLink.cleanup
    end
  end
end
