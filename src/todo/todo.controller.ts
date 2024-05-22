import {
  Controller,
  Get,
  Post,
  Header,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from 'dto/Create-todo';
import { UpdateTodoDto } from 'dto/Update-todo';
@Controller('Todo')
export class TodoController {
  @Post()
  @Header('Cache-Control', 'none') //Пользовательский заголок ответа
  async create(@Body() createTodoDto: CreateTodoDto) {
    return `This action adds a new ${createTodoDto} todo`;
  }
  @Get()
  findAll(): string {
    return 'This action returns all todo';
  }

  @Put()
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${updateTodoDto} todo`;
  }

  //patch
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} todo`;
  }
}
//   @Get()
//   async findAll(): Promise<any[]> {
//     return [];
//   }
// }
//получить все таски, 1 таску, установить состояние чебоксов, удалить таску, изменить таску.
