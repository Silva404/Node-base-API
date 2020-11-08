import { container } from 'tsyringe';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
