import React from "react";

export default function Card(props) {
  const { className, image, diKlik, item } = props;

  return (
    <div
      onClick={diKlik}
      className={[
        `${className} group h-60 overflow-hidden p-4 border rounded-lg shadow-md cursor-pointer duration-300 hover:shadow-none`,
      ]}
    >
      <img
        src={image}
        className="w-full h-40 object-contain duration-300 object-center group-hover:scale-95"
      />
      <div className="pt-2">
        <p className="truncate text-sm">{item.title}</p>
        <p className="text-black">${item.price}</p>
      </div>
    </div>
  );
}
