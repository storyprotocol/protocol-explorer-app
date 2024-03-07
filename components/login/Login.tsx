import { useState } from 'react';

export default function Login({ setIsAdmin }: { setIsAdmin: (isAdmin: boolean) => void }) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredPassword = (event.target as HTMLFormElement).password.value;
    if (enteredPassword === process.env.NEXT_PUBLIC_DASHBOARD_PW) {
      setIsAdmin(true);
    } else {
      setErrorMessage('Invalid password');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 pt-6 pb-12 shadow rounded-lg sm:px-12">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
              <img className="mx-auto h-14 w-auto" src="/sp_logo_black.svg" alt="SP" />
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
