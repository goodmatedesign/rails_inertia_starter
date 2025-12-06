class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true

  before_validation :generate_slug, on: :create

  scope :published, -> { where.not(published_at: nil).where(published_at: ..Time.current) }
  scope :draft, -> { where(published_at: nil) }

  def published?
    published_at.present? && published_at <= Time.current
  end

  def status
    published? ? "published" : "draft"
  end

  private
    def generate_slug
      self.slug = title.parameterize if slug.blank? && title.present?
    end
end
