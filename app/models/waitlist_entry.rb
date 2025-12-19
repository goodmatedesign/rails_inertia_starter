class WaitlistEntry < ApplicationRecord
  normalizes :email, with: -> { _1.strip.downcase }

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
