import { UseMutationResult } from "react-query";
import useForm from "./useForm";
import useVisibility from "./useVisibility";

const useModal = () => {
  const { isVisible, show, hide: hideModal } = useVisibility(false);

  const { formData, updateFormData, clearData } = useForm();

  const saveData = (mutation: any) => {
    mutation.mutate(formData);
    hide();
  };

  const hide = () => {
    clearData();
    hideModal();
  };

  return { isVisible, show, hide, saveData, updateFormData } as const;
};
export default useModal;
