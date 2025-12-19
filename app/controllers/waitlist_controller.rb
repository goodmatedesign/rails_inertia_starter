class WaitlistController < InertiaController
  skip_before_action :authenticate

  def new
    render inertia: "waitlist/New"
  end

  def create
    WaitlistEntry.find_or_create_by(email: params[:email])
    render inertia: "waitlist/New", props: { waitlist_position: WaitlistEntry.count }
  end
end
