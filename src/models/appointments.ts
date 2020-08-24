import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  date: Date;

  provider: string;

  constructor({ date, provider }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.date = date;
    this.provider = provider;
  }
}

export default Appointment;
