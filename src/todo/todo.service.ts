import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import Todo from './todo.model';
import { CreateTodoDto } from './dto/сreate-todo';
import { UpdateTodoDto } from './dto/update-todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  createTask(createTodoDtoTask: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDtoTask);
  }

  findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  updateAllTasksStatus(updateTodoDto: UpdateTodoDto) {
    const isCheckedFront = updateTodoDto.isChecked;
    return this.todoModel.update(
      {
        isChecked: !isCheckedFront,
      },
      {
        where: { isChecked: isCheckedFront },
      },
    );
  }

  // async removeTask(id: number): Promise<string | never> {
  //   const count = await this.todoModel.destroy<Todo>({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (count === 0) {
  //     throw new NotFoundException('Нет такой задачи');
  //   }
  //   return 'OK';
  // }

  removeTask(id: number): Promise<string | never> {
    return this.todoModel
      .destroy<Todo>({
        where: {
          id: id,
        },
      })
      .then((count) => {
        if (count === 0) {
          throw new NotFoundException('Нет такой задачи');
        }
        return 'OK';
      });
  }
  async removeAllDoneTasks(): Promise<string | never> {
    const todos = await this.todoModel.destroy<Todo>({
      where: {
        isChecked: true,
      },
    });
    if (todos === 0) {
      throw new Error('Нет Задач');
    }
    return 'Удалены все выполненные задачи';
  }

  // async removeAllDoneTasks(): Promise<string | never> {
  //   const completedTasks = await this.todoModel.findAll<Todo>({
  //     where: {
  //       isChecked: true,
  //     },
  //   });
  //   if (completedTasks.length === 0) {
  //     throw new Error('Нет выполненных задач');
  //   }
  //   const idsToDelete = completedTasks.map((task) => task.id);
  //   await this.todoModel.destroy<Todo>({
  //     where: {
  //       id: idsToDelete,
  //     },
  //   });
  //   return 'Удалены все выполненные задачи';
  // }

  // async updateTask(idTodo: number, updateTodoDto: UpdateTodoDto) {
  //   const [count, task] = await this.todoModel.update(updateTodoDto, {
  //     where: {
  //       id: idTodo,
  //     },
  //     returning: true,
  //   });
  //   if (count === 0) {
  //     throw new NotFoundException('Такой задачи нет!');
  //   }
  //   return task;
  // }
  updateTask(
    idTodo: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | never> {
    return new Promise((resolve, reject) => {
      this.todoModel
        .update(updateTodoDto, {
          where: {
            id: idTodo,
          },
          returning: true,
        })
        .then(([updatedRows, updatedTasks]) => {
          if (updatedRows === 0) {
            reject(new NotFoundException('Такой задачи нет!'));
          }

          resolve(updatedTasks[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
