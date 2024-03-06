'use client';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Card from './components/Card';
import { Event } from '@/types/post';
import CustomDialog from './components/Dialog';

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
    <main className="p-4 md:p-10 mx-auto max-w-7xl bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {event?.map((event) => (
          <Card key={event.id} event={event} onClick={() => openModal(event)} />
        ))}
      </div>
      <CustomDialog // Tambahkan komponen dialog
        isOpen={isOpen}
        closeModal={closeModal}
        title={selectedEvent?.name || ''}
        content={selectedEvent?.description || ''}
        buttonText="Close"
      />
    </main>
  );
}
