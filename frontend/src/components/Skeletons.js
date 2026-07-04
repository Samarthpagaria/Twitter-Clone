import React from 'react';

export const TweetSkeleton = () => (
  <div className="flex p-4 border-b border-gray-200 animate-pulse animate-duration-[1500ms]">
    <div className="rounded-full bg-gray-200 h-10 w-10 flex-shrink-0"></div>
    <div className="ml-3 w-full">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="space-y-2 mt-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="flex gap-10 mt-4">
        <div className="h-4 bg-gray-200 rounded w-10"></div>
        <div className="h-4 bg-gray-200 rounded w-10"></div>
        <div className="h-4 bg-gray-200 rounded w-10"></div>
      </div>
    </div>
  </div>
);

export const UserSkeleton = () => (
  <div className="flex items-center justify-between my-3 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-gray-200 h-[50px] w-[50px]"></div>
      <div className="flex flex-col gap-1">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
  </div>
);
