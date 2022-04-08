import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { UsersEntity } from './user.entity';

// @Entity('user_roles_role')
@Entity('users_roles')
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  userId!: number;

  @Column({ type: 'int' })
  roleId!: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn() // ! { name: 'userId' }
  user!: UsersEntity;

  @ManyToOne(() => Role)
  @JoinColumn() // ! { name: 'roleId' }
  role!: Role;
}
