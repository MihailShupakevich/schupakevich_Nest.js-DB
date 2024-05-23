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
import { CreateTodoDto } from 'src/todo/dto/Create-todo';
import { UpdateTodoDto } from 'src/todo/dto/Update-todo';
import { TodoService } from './todo.service';
@Controller('Todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post() //Пользовательский заголок ответа
  async createTask(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(createTodoDto); //создание таски
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Put()
  async updateAllTasksStatus(
    @Param()
    @Body()
    updateTodoDto: UpdateTodoDto, //обновление всех задач
  ) {
    return this.todoService.updateAllTasksStatus(updateTodoDto);
  }

  @Patch()
  updateTask(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTask(id, updateTodoDto); //обновление 1 задачи
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.todoService.remove(id); //удаление задачи по айди
  }

  @Delete()
  removeAllDoneTasks(): Promise<string | never> {
    return this.todoService.removeAllDoneTasks();
  }
}
