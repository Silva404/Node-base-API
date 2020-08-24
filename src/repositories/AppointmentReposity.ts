import { isEqual } from 'date-fns';
import Appointment from '../models/appointments';

interface AppointmentDTO {
  date: Date;
  provider: string;
}

class AppoitmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public all() {
    return this.appointments;
  }

  public create({ provider, date }: AppointmentDTO): Appointment {
    const appointment = new Appointment({ date, provider });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppoitmentsRepository;
