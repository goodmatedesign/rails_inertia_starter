class HomeController < InertiaController
  skip_before_action :authenticate

  def show
    render inertia: "Home"
  end
end
