import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Body,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { CreateTodoDto } from 'src/todo/dto/Create-todo';
import { UpdateTodoDto } from 'src/todo/dto/Update-todo';
import { GlobalCheckboxTodoDto } from './dto/GlobalCheckboxTodoDto';
import { TodoService } from './todo.service';
@Controller('Todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @Header('Cache-Control', 'none') //Пользовательский заголок ответа
  async createTask(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTask(createTodoDto); //создание таски
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Put()
  updateAllTasksStatus(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto, //обновление всех задач
  ) {
    return `This action updates a #${updateTodoDto} todo`;
  }

  @Patch()
  updateTask(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return `This action updates a todo with id ${id} and data ${JSON.stringify(updateTodoDto)}`; //обновление 1 задачи
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} todo`; //удаление задачи по айди
  }

  @Delete(':isChecked')
  removeAllDoneTasks(
    @Param('isChecked') isChecked: boolean,
    @Body() globalCheckboxTodoDto: GlobalCheckboxTodoDto,
  ) {
    return `This action removes all done tasks with ${globalCheckboxTodoDto} === true `;
  }
}

//       if (isChecked === 'true'){
//         remove(@Param('id' id: string));
//         return `${JSON.stringify(updateTodoDto)}`
//       }
//     }
//   }
// //

//@Get()
//   async findAll(): Promise<any[]> {
//     return [];
//   }
// }
//получить все таски, 1 таску, установить состояние чебоксов, удалить таску, изменить таску.
//удалить все выполненные таски
//менять чекбокс и менять чекбокс всем
