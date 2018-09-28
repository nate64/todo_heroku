require 'rails/application_controller'
class StaticController < Rails::ApplicationController
  layout false#kills generic rails css that comes with it

  def index
    render file: Rails.root.join('public', 'index.html')
  end

end
