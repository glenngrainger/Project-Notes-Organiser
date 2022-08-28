import { useGeneral } from "../store/generalStore";

const useFile = () => {
  const {
    selectedNoteId,
    setDirectoryView,
    currentDirectoryView,
    setSelectedNoteId,
  } = useGeneral();

  const noteSelected = (id: string) => {
    setSelectedNoteId(id);
  };

  return { noteSelected, currentDirectoryView, selectedNoteId } as const;
};

export default useFile;
