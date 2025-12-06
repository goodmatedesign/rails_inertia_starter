class MagicLink < ApplicationRecord
  CODE_LENGTH = 6
  EXPIRATION_WINDOW = 15.minutes

  belongs_to :user

  scope :active, -> { where("expires_at > ?", Time.current) }
  scope :expired, -> { where("expires_at <= ?", Time.current) }

  before_validation :generate_code, :set_expiration, on: :create

  def self.consume(code)
    active.find_by(code: code.to_s.strip)&.consume
  end

  def self.cleanup
    expired.delete_all
  end

  def consume
    destroy
    self
  end

  private
    def generate_code
      loop do
        self.code = SecureRandom.random_number(10**CODE_LENGTH).to_s.rjust(CODE_LENGTH, "0")
        break unless MagicLink.exists?(code: code)
      end
    end

    def set_expiration
      self.expires_at = EXPIRATION_WINDOW.from_now
    end
end
