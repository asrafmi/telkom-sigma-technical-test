'use client';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Card from './components/Card';
import { Event } from '@/types/post';
import CustomDialog from './components/Dialog';
import Link from 'next/link';

export default function Home() {
  const [event, setEvent] = useState<Event[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State untuk menyimpan event yang dipilih

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/event');
      const data = await response.json();

      setEvent(data);
    }
    fetchData();
  }, []);
  return (
    <main className="">
      <section className="pt-8 md:pt-12 lg:pt-20 pb-0 md:pb-0 border-b-2">
        <div className="container px-6 mx-auto text-center">
          <h1 className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
            Find Your Best Events Here!
          </h1>
          <div className="max-w-xl mx-auto mt-2 text-lg font-light leading-tight text-gray-500 sm:text-xl md:text-2xl">
            <p>
              On this page, you can find the best events that you can attend to
              make your day more fun and enjoyable.
            </p>
          </div>
        </div>
        <div className="container px-6 mx-auto">
          <div className="w-full h-40 mb-4 overflow-hidden sm:rounded-xl md:mt-12 lg:mt-20 md:h-56 lg:h-[700px]">
            <img src="/hero.jpg" alt="hero" />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-20 bg-gray-100 border-b-2">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
            Events
          </h2>
          <div className="max-w-xl mx-auto mt-2 text-lg font-light leading-tight text-gray-500 sm:text-xl md:text-2xl">
            Discover upcoming events and concerts. Get your tickets now and
            don't miss out on the fun!
          </div>
        </div>
        <div className="container px-6 mx-auto">
          <div className="grid justify-center gap-20 pt-20 lg:grid-cols-3">
            <div className="max-w-sm text-center lg:max-w-none">
              <h3 className="text-2xl font-bold">Music Events</h3>
              <div className="pt-2 text-lg">
                <p>
                  Join us in a spectacular music celebration. Get ready for an
                  unforgettable experience!
                </p>
              </div>
            </div>
            <div className="max-w-sm text-center lg:max-w-none">
              <h3 className="text-2xl font-bold">Art Exhibitions</h3>
              <div className="pt-2 text-lg">
                <p>
                  Explore the latest artworks from talented artists around the
                  world. Enjoy an inspiring art experience!
                </p>
              </div>
            </div>
            <div className="max-w-sm text-center lg:max-w-none">
              <h3 className="text-2xl font-bold">Comedy Concerts</h3>
              <div className="pt-2 text-lg">
                <p>
                  Laugh along with us in the best comedy concerts in town. Treat
                  yourself to a heartwarming entertainment!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-20">
        <div className="container px-6 mx-auto">
          <div className="grid items-center gap-8 md:grid-flow-col-dense md:grid-cols-2 md:gap-12">
            <div className="md:col-start-2">
              <img className="rounded-lg" src="/event.jpg" alt="event" />
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
                Various Events
              </h2>
              <div className="max-w-md mt-4 text-lg font-light leading-relaxed text-gray-500 sm:text-xl lg:text-2xl">
                <p>
                  We provide a variety of events that you can choose from. From
                  music concerts, art exhibitions, to comedy shows, we have it
                  all for you!
                </p>
              </div>
              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                <Link
                  className="px-6 py-3 text-lg transition-colors rounded-md  bg-blue-600 text-white hover:bg-blue-700"
                  href="/event"
                >
                  Get Started!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container px-6 py-12 mx-auto">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <p className="mb-6 md:mb-0">Asraf M. I.</p>{' '}
            <ul className="flex gap-4">
              <li>
                <Link href="https://github.com/asrafmi">GitHub</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
