Rails.application.routes.draw do
  root to: redirect('/tasks')

  get 'tasks', to: 'pages#index'
  get 'tasks/new', to: 'pages#index'
  get 'tasks/:id/edit', to: 'pages#index'

  namespace :api do
    namespace :v1 do
      delete '/tasks/destroy_all', to: 'tasks#destroy_all'
      resources :tasks, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
