class Api::TodosController < ApplicationController
  
  def index
    render json: Todo.order(created_at: :desc)
  end

  def create
    todo = Todo.create(name: params[:name])
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(complete: !todo.complete)
    render json: todo
  end

  def destroy
    Todo.find(params[:id]).destroy
  end
  
end
