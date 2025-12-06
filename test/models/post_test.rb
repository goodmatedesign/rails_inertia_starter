require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "valid with title and user" do
    post = Post.new(title: "Test Post", user: users(:one))
    assert post.valid?
  end

  test "invalid without title" do
    post = Post.new(user: users(:one))
    assert_not post.valid?
  end

  test "invalid without user" do
    post = Post.new(title: "Test Post")
    assert_not post.valid?
  end

  test "generates slug from title" do
    post = Post.create!(title: "My First Post", user: users(:one))
    assert_equal "my-first-post", post.slug
  end

  test "does not overwrite existing slug" do
    post = Post.create!(title: "My Post", slug: "custom-slug", user: users(:one))
    assert_equal "custom-slug", post.slug
  end

  test "slug must be unique" do
    Post.create!(title: "First", slug: "same-slug", user: users(:one))
    post = Post.new(title: "Second", slug: "same-slug", user: users(:one))
    assert_not post.valid?
  end

  test "published scope returns published posts" do
    assert_includes Post.published, posts(:published)
    assert_not_includes Post.published, posts(:draft)
  end

  test "draft scope returns draft posts" do
    assert_includes Post.draft, posts(:draft)
    assert_not_includes Post.draft, posts(:published)
  end

  test "published? returns true for published post" do
    assert posts(:published).published?
  end

  test "published? returns false for draft post" do
    assert_not posts(:draft).published?
  end

  test "published? returns false for future published_at" do
    post = Post.new(published_at: 1.day.from_now)
    assert_not post.published?
  end
end
