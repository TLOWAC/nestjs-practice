import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardStatusEnumType } from '../boards.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatusEnumType;

  // @CreateDateColumn()
  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
