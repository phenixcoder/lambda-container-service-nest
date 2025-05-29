import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateSampleDto {
  @ApiProperty({
    description: 'Name of the sample resource',
    example: 'Sample Resource Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the sample resource',
    example: 'This is a sample description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Email associated with the sample resource',
    example: 'user@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class SampleResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the sample resource',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the sample resource',
    example: 'Sample Resource Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the sample resource',
    example: 'This is a sample description',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Email associated with the sample resource',
    example: 'user@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-05-29T10:30:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-05-29T10:30:00.000Z',
  })
  updatedAt: string;
}
