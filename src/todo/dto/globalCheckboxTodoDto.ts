import { IsBoolean } from 'class-validator';
export class GlobalCheckboxTodoDto {
  @IsBoolean()
  isChecked: boolean;
}
