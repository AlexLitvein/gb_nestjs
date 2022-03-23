import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @CreateDateColumn()
  createdat!: Date;

  @Column({ name: 'text', type: 'text' })
  text!: string;
}
