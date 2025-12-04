class User < ApplicationRecord
  has_secure_password

  has_many :sessions, dependent: :destroy

  normalizes :email, with: -> { _1.strip.downcase }

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  generates_token_for :passwordless, expires_in: 1.hour do
    [ password_salt.last(10), email ]
  end

  before_validation :set_random_password, on: :create

  private
    def set_random_password
      self.password = SecureRandom.hex(32) if password.blank?
    end
end
