export interface Job {
  readonly _id: string;
  readonly body: string;
  readonly is_gateway_job: boolean;
  readonly riasec: string[];
  readonly city_name: string;
  readonly company_name: string;
  readonly is_earn_and_learn: boolean;
  readonly max_salary: number;
  readonly min_salary: number;
  readonly posted: Date;
  readonly skills_name: { value: string }[];
  readonly title_name: string;
  readonly title_raw: string;
}
