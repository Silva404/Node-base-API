import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  date: Date;

  @Column('timestamp with time zone')
  provider: string;
}

export default Appointment;
