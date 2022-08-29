import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState<object>({});

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => setFormData({});

  return { formData, updateFormData, clearData } as const;
};
export default useForm;
