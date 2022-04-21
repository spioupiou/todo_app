SAMPLE_TASKS = [
  {
    name: 'Send availabilities to Company X',
  },
  {
    name: 'Practice for Cookday 1'
  }
]

SAMPLE_TASKS.each do |task|
  Task.create(task)
end
