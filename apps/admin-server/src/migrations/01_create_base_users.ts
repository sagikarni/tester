import { User, UserRole } from '../mongodb';

export const name = 'create_base_users';

export async function migrate(): Promise<void> {
  const [userRole, adminRole] = await UserRole.create([
    {
      name: 'user',
      isDefault: true,
      permissions: [],
    },
    {
      name: 'admin',
      permissions: [
        'users#create',
        'users#list-read',
        'users#update',
        'users#delete',
      ],
    },
  ]);

  await User.create([
    {
      firstName: 'Sagi',
      lastName: 'Test',
      email: 'sagi@test.com',
      role: userRole._id,
      password: 'test',
    },
    {
      firstName: 'Shlomi',
      lastName: 'Levi',
      email: 'wizardnet972@gmail.com',
      role: adminRole._id,
      password: 'admin',
    },
  ]);
}

export async function rollback(): Promise<void> {
  await User.remove({
    $or: [{ email: 'test@test.com' }, { email: 'admin@admin.com' }],
  });
  await UserRole.remove({ $or: [{ name: 'user' }, { name: 'admin' }] });
}
