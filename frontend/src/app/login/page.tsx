'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { SubmitButton } from '../components/submit-button';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/Auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { setToken, setUser, token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
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
    const data = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const res = await data.json();
    if (res.status === 200) {
      setToken(res.data.token);
      setUser(res.data);

      toast.success('Login successful');
      setTimeout(() => {
        router.push('/');
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
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email/username and password to sign in
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
              Email or Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="username"
              placeholder="user@acme.com"
              autoComplete="username"
              required
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
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </form>
      </div>
    </div>
  );
}
