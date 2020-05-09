import React from "react";
import { Link } from "gatsby";

const underConstraction = () => {
  return (
    <div className="min-h-screen justify-center items-center flex">
      <div className="font-display  text-center">
        <p className="text-3xl">- !!! sorry !!! -</p>
        <p className="mt-8">this page is under constraction </p>
        <p className="mt-4">ごめん。ぼちぼち作ってるから待っといて。</p>
        <div className="mt-8">
          <Link to="../" className="pj-button px-8 py-2 ">
            Top
          </Link>
        </div>
      </div>
    </div>
  );
};

export default underConstraction;
