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
    const newPage = currentPage + 1;
    const numOfPages = Math.ceil(resultCount / 10);
    if (newPage > 1 && newPage < resultCount) {
      setShowLeftToggle(true);
      setShowRightToggle(true);
    } else if (newPage !== 1) {
      setShowLeftToggle(true);
      setShowRightToggle(false);
    } else if (newPage > 0 && newPage < resultCount) {
      setShowLeftToggle(false);
      setShowRightToggle(true);
    }
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
    fetch(`http://localhost:8000/jobs/${newPageIndex}`)
      .then((res) => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setLoading(false);
        // would need if we were filtering only
        // setNumOfPages(Math.ceil(resultCount / 10));
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

  const leftButton = <div className="mr-2 text-2xl cursor">&lt;</div>;
  const rightButton = <div className="ml-2 text-2xl cursor">&gt;</div>;

  if (jobs) {
    const singleResults = jobs.map((el: Job, i: number) => {
      return <SingleResult key={i} job={el} i={i} />;
    });

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
            {currentPage + 1}
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
