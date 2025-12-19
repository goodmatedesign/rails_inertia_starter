class Avo::Resources::WaitlistEntry < Avo::BaseResource
  self.search = {
    query: -> { query.ransack(email_cont: q, m: "or").result(distinct: false) }
  }

  def fields
    field :id, as: :id
    field :email, as: :text
    field :created_at, as: :date_time, sortable: true
  end
end
