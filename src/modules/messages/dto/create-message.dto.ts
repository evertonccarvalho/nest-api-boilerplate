import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsUUID()
  readonly toId: string;
}
