import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @IsNumber()
  serviceId!: number;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  @IsNotEmpty()
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}