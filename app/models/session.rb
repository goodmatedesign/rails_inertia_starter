class Session < ApplicationRecord
  belongs_to :user

  def as_json(options = {})
    super(only: %i[id user_agent ip_address created_at]).merge(current: self == Current.session)
  end
end
