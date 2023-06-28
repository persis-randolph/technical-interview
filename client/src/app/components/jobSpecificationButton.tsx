import Image from 'next/image';

interface JSBProps {
  isEarnAndLearn: Boolean;
  isGateway: Boolean;
}

const JobSpecificationButton: React.FC<JSBProps> = ({
  isEarnAndLearn,
  isGateway
}) => {
  let buttonText;
  if (isGateway) {
    buttonText = 'Gateway Job';
  }
  if (isEarnAndLearn) {
    buttonText = 'Earn & Learn';
  }

  let iconPath: string = '';
  let width: number | undefined;
  let height: number | undefined;
  if (isEarnAndLearn) {
    iconPath = 'dollar-sign-regular.svg';
    width = 10;
    height = 10;
  }
  if (isGateway) {
    iconPath = 'door-open-regular.svg';
    width = 20;
    height = 20;
  }

  if (isGateway || isEarnAndLearn) {
    return (
      <div className="group bg-purple-300 rounded-md h-9 w-36 mt-2 relative inline-block z-1">
        <div className="flex justify-center">
          <Image
            src={iconPath}
            alt=""
            width={width}
            height={height}
            className="mr-1 pt-1"
          />
          <span className="underline underline-offset-4 decoration-dashed decoration-1 pt-1">
            {buttonText}
          </span>
        </div>
        <div className="tooltip shadow-md border-[0.5px] rounded-md text-xs w-56 bg-white p-2 text-left absolute z-2 top-10 left-1/2 -ml-28 invisible group-hover:visible">
          {buttonText} Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    );
  }
};

export default JobSpecificationButton;
