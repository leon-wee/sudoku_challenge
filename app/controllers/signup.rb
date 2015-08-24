module Sudoku
  module Routes
    class Signup < Base
      get '/users/new' do
        erb :'users/new'
      end

      post '/users' do
        user = User.create(username: params[:username],
                           email: params[:email],
                           password: params[:password],
                           password_confirmation: params[:password_confirmation])
        session[:user_id] = user.id
        redirect('/')
      end
    end
  end
end