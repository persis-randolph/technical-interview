import * as mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  value: String,
});

const CoordinatesSchema = new mongoose.Schema({
  type: String,
  coordinates: [Number, Number],
});

const LocationSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  coordinates: CoordinatesSchema,
});

export const JobSchema = new mongoose.Schema({
  _id: String,
  body: String,
  city_name: String,
  company_name: String,
  expiredAt: Date,
  is_gateway_job: Boolean,
  is_earn_and_learn: Boolean,
  location: LocationSchema,
  posted: Date,
  riasec: [String],
  skills_name: [SkillSchema],
  title_name: String,
  title_raw: String,
});
