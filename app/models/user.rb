class User < ApplicationRecord
  has_secure_password

  has_many :sessions, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :magic_links, dependent: :destroy

  normalizes :email, with: -> { _1.strip.downcase }

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  before_validation :set_random_password, on: :create
  before_validation :set_name_from_email, on: :create

  def self.from_omniauth(auth)
    # First try to find by provider/uid
    user = find_by(provider: auth.provider, uid: auth.uid)
    return user if user

    # Then try to find by email and link the OAuth account
    user = find_by(email: auth.info.email)
    if user
      user.update!(provider: auth.provider, uid: auth.uid)
      return user
    end

    # Otherwise create a new user
    create!(provider: auth.provider, uid: auth.uid, email: auth.info.email, name: auth.info.name)
  end

  private
    def set_random_password
      self.password = SecureRandom.hex(32) if password.blank?
    end

    def set_name_from_email
      self.name = email.split("@").first if name.blank? && email.present?
    end
end
