class Api::V1::TasksController < ApplicationController
  def index
    tasks = Task.order(updated_at: :desc)
    render json: tasks
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def create
    task = Task.new(task_params)
    if task.save
      render json: task
    else
      render json: task.errors, status: 422
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render json: task.errors, status: 422
    end
  end

  def destroy
    if Task.destroy(params[:id])
      head :no_content
    else
      render json: { error: "Could not delete" }, status: 422
    end
  end

  def destroy_all
    if Task.destroy_all
      head :no_content
    else
      render json: { error: "Could not delete" }, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :is_completed)
  end
end
