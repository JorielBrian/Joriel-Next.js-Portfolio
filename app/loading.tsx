'use client';

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-gray-300 animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;