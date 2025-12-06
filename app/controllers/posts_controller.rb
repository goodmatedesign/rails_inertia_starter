class PostsController < InertiaController
  def index
    posts = Post.published.includes(:user).order(published_at: :desc).map do |post|
      post_props(post)
    end

    render inertia: "posts/Index", props: { posts: posts }
  end

  def show
    post = Post.published.find_by!(slug: params[:slug])

    render inertia: "posts/Show", props: {
      post: post_props(post).merge(
        content_html: render_markdown(post.content)
      )
    }
  end

  private
    def post_props(post)
      {
        id: post.id,
        title: post.title,
        slug: post.slug,
        published_at: post.published_at.to_date.to_fs(:long),
        author: post.user.name
      }
    end

    def render_markdown(content)
      return "" if content.blank?

      Commonmarker.to_html(content, options: {
        parse: { smart: true },
        render: { unsafe: true }
      })
    end
end
