import useForm from "./useForm";
import useVisibility from "./useVisibility";

const useModal = () => {
  const { isVisible, show, hide } = useVisibility(false);

  const { formData, updateFormData } = useForm();

  const saveData = () => {
    // Save here
    hide();
  };

  // on save update

  // on close, reset

  //

  return { isVisible, show, hide, saveData, updateFormData } as const;
};
export default useModal;
