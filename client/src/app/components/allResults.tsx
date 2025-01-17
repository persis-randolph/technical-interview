import SingleResult from './singleResult';
import { Job } from '../interfaces/Job';
import { useEffect, useState } from 'react';

interface AllResultsProps {
  resultCount: number;
}

const AllResults: React.FC<AllResultsProps> = ({ resultCount }) => {
  const [jobs, setJobs] = useState<Job[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setPage] = useState<number>(0);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [showLeftToggle, setShowLeftToggle] = useState<boolean>(false);
  const [showRightToggle, setShowRightToggle] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/jobs/1')
      .then((res) => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setLoading(false);
        setNumOfPages(Math.ceil(resultCount / 10));
      });
    const numOfPages = Math.ceil(resultCount / 10);
    numOfPages > 1 && setShowRightToggle(true);
  }, []);

  if (!jobs) {
    return <div>No results found.</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePage = (newPageIndex: number) => {
    const newPageNum = newPageIndex + 1;
    setPage(newPageIndex);
    setLoading(true);
    fetch(`http://localhost:8000/jobs/${newPageNum}`)
      .then((res) => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setLoading(false);
      });
    if (newPageNum > 1 && newPageNum < numOfPages) {
      setShowLeftToggle(true);
      setShowRightToggle(true);
    } else if (newPageNum !== 1) {
      setShowLeftToggle(true);
      setShowRightToggle(false);
    } else if (newPageNum > 0 && newPageNum < numOfPages) {
      setShowLeftToggle(false);
      setShowRightToggle(true);
    }
  };

  const leftButton = <div className="mr-2 mb-1 text-2xl cursor">&lt;</div>;
  const rightButton = <div className="ml-2 mb-1 text-2xl cursor">&gt;</div>;

  if (jobs) {
    const singleResults = jobs?.map((el: Job, i: number) => {
      return <SingleResult key={i} job={el} i={i} />;
    }) || <div>No results.</div>;

    return (
      <div>
        {singleResults}
        <div className="text-center pt-4">
          Viewing {jobs.length} results
          <div className="flex justify-center items-center">
            <div
              onClick={() => updatePage(currentPage - 1)}
              className="cursor-pointer"
            >
              {showLeftToggle ? leftButton : ''}
            </div>
            Page {currentPage + 1}
            <div
              onClick={() => updatePage(currentPage + 1)}
              className="cursor-pointer"
            >
              {showRightToggle ? rightButton : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AllResults;
