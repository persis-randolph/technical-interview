export interface Job {
  readonly _id: String;
  readonly body: String;
  readonly is_gateway_job: Boolean;
  readonly riasec: string[];
  readonly city_name: String;
  readonly company_name: String;
  readonly is_earn_and_learn: Boolean;
  readonly posted: Date;
  readonly skills_name: { value: string }[];
  readonly title_name: String;
  readonly title_raw: String;
}
