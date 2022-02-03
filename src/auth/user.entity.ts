import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @ApiProperty({ example: 1, description: 'id' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'ch.lee', description: '유저 이름', required: true })
  @Column()
  username: string;

  @ApiProperty({ example: '1234', description: '비밀번호', required: true })
  @Column()
  password: string;
}
