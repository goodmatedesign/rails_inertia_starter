class Avo::Resources::Post < Avo::BaseResource
  def fields
    field :id, as: :id
    field :title, as: :text
    field :status, as: :badge, options: { success: "published", warning: "draft" }, only_on: [ :index ]
    field :slug, as: :text, only_on: :index
    field :content, as: :easy_mde
    field :published_at, as: :date_time, help: "Leave blank for draft. Set date to publish."
    field :user, as: :belongs_to, default: -> { current_user }, attach_scope: -> { query.where(admin: true) }
    field :created_at, as: :date_time, only_on: :index
    field :updated_at, as: :date_time, only_on: :show
  end
end
