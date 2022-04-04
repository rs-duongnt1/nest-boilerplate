import { define } from 'typeorm-seeding';

import { UserEntity } from '../../modules/user/user.entity';

define(UserEntity, (faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new UserEntity();
  user.firstName = firstName;
  user.lastName = lastName;

  return user;
});
