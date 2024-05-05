import React from "react";

function Home() {
  return (
    <div className="w-screen min-h-full flex flex-col justify-center items-center gap-4">
      <p className="text-4xl text-center">
        Now with the{" "}
        <span className="text-white text-2xl bg-orange-400 px-4 py-2 font-bold rounded-full ">
          Task Manager
        </span>{" "}
        You can create and manage your tasks easily.{" "}
      </p>
    </div>
  );
}

export default Home;
