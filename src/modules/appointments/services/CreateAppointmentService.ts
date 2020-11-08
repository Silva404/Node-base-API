import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) { }

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
