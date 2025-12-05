class User < ApplicationRecord
  has_secure_password

  has_many :sessions, dependent: :destroy

  normalizes :email, with: -> { _1.strip.downcase }

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  generates_token_for :passwordless, expires_in: 1.hour do
    [ password_salt.last(10), email ]
  end

  before_validation :set_random_password, on: :create

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
    create!(provider: auth.provider, uid: auth.uid, email: auth.info.email)
  end

  private
    def set_random_password
      self.password = SecureRandom.hex(32) if password.blank?
    end
end
