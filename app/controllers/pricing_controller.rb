class PricingController < InertiaController
  skip_before_action :authenticate

  def show
    render inertia: "Pricing"
  end
end
