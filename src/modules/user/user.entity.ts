import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';

export interface IUserEntity {
  firstName?: string;
  lastName?: string;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Column({ nullable: true, name: 'last_name' })
  lastName?: string;
}
