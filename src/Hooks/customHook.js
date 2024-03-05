import { useState, useEffect } from "react";

const useCustomHook = (initValue) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    console.log("ini valuenya: ", value);
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return { value, handleChange };
};

export default useCustomHook;