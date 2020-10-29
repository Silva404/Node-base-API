import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  public execute({ date, provider }: Request): Appointment {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
