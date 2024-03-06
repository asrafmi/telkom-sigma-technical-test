'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { SubmitButton } from '../components/submit-button';
import toast from 'react-hot-toast';
import to from 'await-to-js';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/Auth';

export default function Register() {
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    role: '',
    fullname: '',
    password: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (token || user) {
      router.push('/');
    }
  }, [token, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    if (res.status === 201) {
      toast.success('Registration successful');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } else if (res.errors) {
      const errorMessages = Object.values(res.errors).flat();
      errorMessages.forEach((errorMessage) => {
        toast.error(errorMessage);
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-600 uppercase"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="user@acme.com"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-xs text-gray-600 uppercase"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              placeholder="JohnDoe"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-xs text-gray-600 uppercase"
            >
              Role
            </label>
            <input
              id="role"
              name="role"
              type="role"
              placeholder="user or admin"
              autoComplete="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block text-xs text-gray-600 uppercase"
            >
              Fullname
            </label>
            <input
              id="fullname"
              name="fullname"
              type="fullname"
              placeholder="John Doe"
              autoComplete="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </form>
      </div>
    </div>
  );
}
