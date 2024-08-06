from app.models.tasks_models import TasksModels


class TaskController(TasksModels):
    
    def create_task(self, metadata):
        return super().create_task(metadata)