import React from "react";

export default function Loader() {
  return (
    <span className="flex flex-row gap-2">
      <span className="w-4 h-4 rounded-full bg-background animate-bounce"></span>
      <span className="w-4 h-4 rounded-full bg-background animate-bounce [animation-delay:-.3s]"></span>
      <span className="w-4 h-4 rounded-full bg-background animate-bounce [animation-delay:-.5s]"></span>
    </span>
  );
}
