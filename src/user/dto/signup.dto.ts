import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'Username of a user',
    type: String,
    example: 'user1'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email of a user',
    type: String,
    example: 'user1@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of a user',
    type: String,
    minLength: 8,
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Confirm your password using this',
    type: String,
    example: '12345678'
  })
  @IsString()
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })  // Custom validation
  confirmPassword: string;
}



function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;  // Check if values match
        },
      },
    });
  };
}

