import {
  CreateFolder,
  CreateNote,
  Folder,
  GetFolders as GetFoldersCookie,
  GetNotes,
  Note,
  UpdateNote,
} from "../helper/cookieHelper";

export const getFolders = async () => {
  return GetFoldersCookie() as Folder[];
};

export const getNotes = async (selectedFolderId: string) => {
  return GetNotes(selectedFolderId) as Note[];
};

export const addFolder = async (folder: Folder) => {
  return CreateFolder({
    name: folder.name,
    notes: [],
  });
};

export const addNote = async (folderId: string, note: Note) => {
  return CreateNote(folderId, note);
};

export const updateNote = async (folderId: string, note: Note) => {
  return UpdateNote(folderId, note);
};
