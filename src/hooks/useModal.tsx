import { UseMutationResult } from "react-query";
import useForm from "./useForm";
import useVisibility from "./useVisibility";

const useModal = () => {
  const { isVisible, show, hide } = useVisibility(false);

  const { formData, updateFormData } = useForm();

  const saveData = (mutation: any) => {
    // Save here
    mutation.mutate(formData);

    hide();
  };

  // on save update

  // on close, reset

  //

  return { isVisible, show, hide, saveData, updateFormData } as const;
};
export default useModal;
