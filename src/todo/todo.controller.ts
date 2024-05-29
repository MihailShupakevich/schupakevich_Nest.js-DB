import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateTodoDto } from 'src/todo/dto/сreate-todo';
import { UpdateTodoDto } from 'src/todo/dto/update-todo';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post() //Пользовательский заголок ответа
  async createTask(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(createTodoDto); //создание таски
  }

  @Get()
  findTasks() {
    return this.todoService.findTasks();
  }

  @Put()
  updateAllTasksStatus(
    @Body()
    updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.changeCheckboxes(updateTodoDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTask(id, updateTodoDto); //обновление 1 задачи
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.todoService.removeTask(id); //удаление задачи по айди
  }

  @Delete()
  removeAllDoneTasks(): Promise<string | never> {
    return this.todoService.removeAllDoneTasks();
  }
}
