import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState<object>({});
  const updateFormData = () => {
    setFormData((prev) => ({ ...prev, ["test"]: "test" }));
  };

  return { formData, updateFormData } as const;
};
export default useForm;
