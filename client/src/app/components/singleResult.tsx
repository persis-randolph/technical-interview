import Image from 'next/image';
import { Job } from '../interfaces/Job';
import JobSpecificationButton from './jobSpecificationButton';

interface SingleResultProps {
  job: Job;
  i: number;
}

const SingleResult: React.FC<SingleResultProps> = ({ job, i }) => {
  const riasecArray = job.riasec.map((value: string, i: number) => {
    return (
      <div
        key={i}
        className="bg-stone-100 rounded-md h-9 mt-2 mr-2 flex items-center px-2"
      >
        {value}
      </div>
    );
  });

  const skillsArray = job.skills_name.map((skill, i) => {
    if (job.skills_name.length - 1 === i) {
      return <span key={i}>{skill.value}</span>;
    } else {
      return <span key={i}>{skill.value},&nbsp;</span>;
    }
  });

  return (
    // WHOLE RESULT
    <div key={i} className="border-2 rounded-md bg-white mt-4">
      {/* HEAD */}
      <div className="result-head flex pt-6 pr-6 pl-6">
        {/* HEAD LEFT */}
        <div className="w-4/5 flex h-24">
          {/* IMAGE CONTAINER */}
          <div className="image-container flex items-center px-4 border-2 rounded-md">
            <Image
              src="/logo_bright_horizons.svg"
              alt="Bright Horizons Logo"
              width={80}
              height={27}
            />
          </div>
          {/* TITLE, COMPANY, AND CITY CONTAINER */}
          <div className="pl-4 text-left">
            {/* TITLE */}
            <h2 className="text-2xl font-bold text-sky-950">
              {job.title_raw ? job.title_raw : job.title_name}
            </h2>
            {/* COMPANY AND CITY CONTAINER */}
            <div className="flex">
              <div className="pr-3">at {job.company_name}</div>
              <div className="flex">
                <Image
                  src="/location-dot-solid.svg"
                  alt="heart icon"
                  width={12}
                  height={12}
                  className="mr-1"
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="pr-2 h-6"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg> */}
                {job.city_name}
              </div>
            </div>
          </div>
        </div>
        {/* HEAD RIGHT */}
        <div className="w-1/5 text-right">
          {/* HEART */}
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-5 fill-red-400"
            >
              {/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
          </div>
          {/* GATEWAY / EARN & LEARN */}
          <JobSpecificationButton
            isEarnAndLearn={job.is_earn_and_learn}
            isGateway={job.is_gateway_job}
          />
        </div>
      </div>
      {/* SOCIAL ETC SECTION */}
      <div className="flex px-6 mt-2 mb-3">{riasecArray}</div>
      {/* SKILLS SECTION */}
      <div className="border-t-[1px]">
        <div className="flex flex-col mt-2 text-start pt-2 pr-6 pl-6 pb-6">
          <div className="font-bold text-sm mb-1">SKILLS</div>
          <div>{skillsArray}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
