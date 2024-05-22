import { IsBoolean, IsString, Length } from 'class-validator';
export class UpdateTodoDto {
  @IsString()
  @Length(1, 256)
  text?: string;

  @IsBoolean()
  isChecked?: boolean;
}
