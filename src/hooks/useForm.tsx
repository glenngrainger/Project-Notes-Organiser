import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState<object>({});
  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return { formData, updateFormData } as const;
};
export default useForm;
