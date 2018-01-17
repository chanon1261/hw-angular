class UsersController < ApplicationController
  load_and_authorize_resource

  def index
    render json: @users
  end
end