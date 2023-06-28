import { Document } from 'mongoose';

type Coordinates = {
  type: 'Point';
  coordinates: [number, number];
};

type Location = {
  lat: number;
  lon: number;
  coordinates: Coordinates;
};

export interface Job extends Document {
  readonly _id: String;
  readonly body: String;
  readonly expiredAt: Date | null;
  readonly is_gateway_job: Boolean;
  readonly riasec: string[];
  readonly city_name: String;
  readonly company_name: String;
  readonly is_earn_and_learn: Boolean;
  readonly location: Location;
  readonly max_salary: Number;
  readonly min_salary: Number;
  readonly posted: Date;
  readonly skills_name: { value: string }[];
  readonly title_name: String;
  readonly title_raw: String;
}
