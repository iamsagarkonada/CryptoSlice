import React, { useState } from 'react';

function Alert(props) {
  const [isVisible, setIsVisible] = useState(true);

  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && props.alert && (
        <div className="z-50 fixed top-0 left-1/2 transform -translate-x-1/2 mt-4">
          <div className="max-w-md bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-8 py-6 shadow-md" role="alert">
            <div className="flex items-center">
              <div className="py-1">
                <svg
                  className="fill-current h-8 w-8 text-teal-500 mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{capitalize(props.alert.type)}</p>
                <p className="text-base">{props.alert.msg}</p>
              </div>
              <div className="ml-auto">
                <button onClick={handleDismiss} className="text-teal-700">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
