import { useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    handleChange,
  };
};
