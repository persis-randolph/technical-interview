'use client';

import Image from 'next/image';
import AllResults from './components/allResults';
import { useState, useEffect } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lon, setLon] = useState<number | undefined>(undefined);
  const [userInput, setUserInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (err) => {
          console.log('Error:', err);
        }
      );
    }

    fetch('http://localhost:8000/jobs/count')
      .then((res) => res.json())
      .then((data: number) => {
        setCount(data);
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="h-full min-h-screen bg-stone-100 text-center">
        Loading...
      </div>
    );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      // TODO: send fetch request here
    } catch (err: any) {
      console.log(err);
    } finally {
      setSubmitting(false);
      setUserInput('');
    }
  };

  const menu = (
    <div
      id="menu-options"
      className="bg-white absolute top-[54px] left-1/2 -ml-[40px] z-2 w-28 text-center cursor-pointer"
    >
      <a href="#">
        <div className="py-2">Option 1</div>
      </a>
      <hr></hr>
      <a href="#">
        <div className="py-2">Option 2</div>
      </a>
      <hr></hr>
      <a href="#">
        <div className="py-2">Option 3</div>
      </a>
    </div>
  );

  return (
    <main className="h-full min-h-screen bg-stone-100">
      <nav className="font-bold bg-white flex justify-between items-center h-20 py-6 px-12 shadow-md">
        <div id="logo">
          <a href="#">
            <Image
              src="/logo_skill_up.svg"
              alt="SkillUp Logo"
              width={200}
              height={45}
              priority
            />
          </a>
        </div>
        <div id="menu-items" className="flex">
          <a href="#">
            <div className="px-4">Why SkillUp?</div>
          </a>
          {/* MENU */}
          <div
            className="px-4 flex items-center relative inline-block z-1 cursor-pointer"
            onClick={toggleMenu}
          >
            Menu
            <Image
              src="/icon_angle_down_light.svg"
              alt="heart icon"
              width={12}
              height={12}
              className="ml-2"
            />
            {isMenuOpen ? menu : ''}
          </div>
          <div></div>
          <div className="px-4 flex items-center">
            <Image
              src="/location-dot-thin.svg"
              alt="heart icon"
              width={18}
              height={18}
              className="mr-2"
            />
            {/* TODO: make dynamic */}
            {/* {lat && lon ? `${lat}, ${lon}` : 'New Orleans'} */}
            New Orleans
          </div>
          <a href="#">
            <div className="px-4 flex items-center">
              {/* TODO: If time, change to look more like real icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="pr-2 h-4"
              >
                {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
              </svg>
              My Path
            </div>
          </a>
          <a href="#">
            <div className="px-4 flex items-center">
              <Image
                src="/icon_heart_filled.svg"
                alt="heart icon"
                width={18}
                height={18}
                className="mr-2"
              />
              Persis
            </div>
          </a>
        </div>
      </nav>
      <main className="py-16 px-44">
        <div id="main-statement" className="mb-2">
          <h2 className="text-2xl font-bold text-sky-950">
            We locate promising jobs that provide educational perks. Keep coming
            back for new additions!
          </h2>
        </div>
        {/* RESULTS AND SEARCH */}
        <div className="flex justify-between items-center">
          <div id="result-summary-and-search text-left">
            <span className="font-semibold">
              Showing {count.toString()} results.
            </span>
            <span className="underline underline-offset-4 decoration-dashed decoration-1 ml-2">
              How did we choose these open jobs?
            </span>
          </div>
          {/* TODO: implement search */}
          <form>
            <input
              onSubmit={onFormSubmit}
              name="keywordSearch"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border-[1px] h-8 p-4"
              placeholder="Keyword"
              required
            ></input>
          </form>
        </div>
        <AllResults resultCount={count} />
      </main>
    </main>
  );
}
