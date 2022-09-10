import {
  BulkRemoveFolders,
  BulkRemoveNotes,
  BulkSetNoteStatus,
  CreateFolder,
  CreateNote,
  Folder,
  GetFolders as GetFoldersCookie,
  GetNotes,
  Note,
  RemoveNote,
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

export const deleteNote = async (noteId: string, folderId: string) => {
  return RemoveNote(noteId, folderId);
};

export const bulkDeleteNotes = async (folderId: string, noteIds: string[]) => {
  return BulkRemoveNotes(folderId, noteIds);
};

export const bulkRemoveFolders = async (folderIds: string[]) => {
  return BulkRemoveFolders(folderIds);
};

export const bulkSetNoteStatus = async (
  folderId: string,
  noteIds: string[],
  status: boolean
) => {
  return BulkSetNoteStatus(folderId, noteIds, status);
};
