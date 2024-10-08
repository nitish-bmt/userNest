import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto{
  
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;
}