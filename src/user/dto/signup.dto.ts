import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

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

