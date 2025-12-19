require "test_helper"

class WaitlistEntryTest < ActiveSupport::TestCase
  test "valid with email" do
    entry = WaitlistEntry.new(email: "test@example.com")
    assert entry.valid?
  end

  test "invalid without email" do
    entry = WaitlistEntry.new(email: nil)
    assert_not entry.valid?
  end

  test "invalid with blank email" do
    entry = WaitlistEntry.new(email: "")
    assert_not entry.valid?
  end

  test "invalid with malformed email" do
    entry = WaitlistEntry.new(email: "not-an-email")
    assert_not entry.valid?
  end

  test "email must be unique" do
    WaitlistEntry.create!(email: "unique@example.com")
    entry = WaitlistEntry.new(email: "unique@example.com")
    assert_not entry.valid?
  end

  test "normalizes email to lowercase" do
    entry = WaitlistEntry.create!(email: "TEST@EXAMPLE.COM")
    assert_equal "test@example.com", entry.email
  end

  test "strips whitespace from email" do
    entry = WaitlistEntry.create!(email: "  spaced@example.com  ")
    assert_equal "spaced@example.com", entry.email
  end
end
