import React from "react";

const div = {
  background: "green",
  width: "100px",
  height: "100px",
  borderRadius: "100%",
  overflow: "hidden",
  margin: "5px",
};

const Avatar = ({ title, image }) => {
  return (
    <div className="avatar" style={div}>
      {image ? (
        <img
          src={image}
          alt=""
          srcset=""
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p style={{ color: "white", paddingBottom: "5px", fontSize: "30px" }}>
          {title[0]}
        </p>
      )}
    </div>
  );
};

export default Avatar;

//
