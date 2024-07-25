import React from "react";

export default function ErrorModal({ onClose }) {
  return (
    <div
      role='alert'
      className='rounded-lg border-s-4 border-red-900 bg-white p-6 m-20 opacity-75 relative'
    >
      <div className='flex items-center justify-between gap-2 text-red-900'>
        <div className='flex items-center gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-5 w-5'
          >
            <path
              fillRule='evenodd'
              d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
              clipRule='evenodd'
            />
          </svg>

          <strong className='block font-medium'> Whoa, Not So Fast!</strong>
        </div>

        <button onClick={onClose} className='ml-auto text-red-900'>
          <i className='fa fa-times-circle' aria-hidden='true'></i>
        </button>
      </div>

      <p className='mt-2 text-sm text-red-700'>
        You missed selecting your muscle groups. Remember, no muscle left
        behind! Head back and pick your targets.
      </p>
    </div>
  );
}
