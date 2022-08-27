import cookie from "js-cookie";

export interface Folder {
  id: string;
  name: string;
  created?: Date;
  updated?: Date;
  notes: Note[];
}

export interface Note {
  id: string;
  name: string;
  content: string;
  created?: Date;
  updated?: Date;
}

export const CreateFolder = (folder: Folder) => {
  let foldersString = cookie.get("folders");
  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  folder.created = new Date();
  folder.updated = new Date();

  cookie.set("folders", JSON.stringify([...folders, folder]));
  return folder;
};

export const CreateNote = (folderId: string, note: Note) => {
  if (!folderId) return;

  let foldersString = cookie.get("folders");

  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  note.created = new Date();
  note.updated = new Date();

  folders.find((x) => x.id === folderId)?.notes.push(note);
  cookie.set("folders", JSON.stringify(folders));
};

export const GetFolders = () => {
  const foldersString = cookie.get("folders");
  return foldersString ? (JSON.parse(foldersString) as Folder[]) : [];
};

export const GetNotes = (folderId: string) => {
  const folder = GetFolders().find((x) => x.id === folderId);
  if (folder === undefined) return;
  return folder.notes;
};

export const GetNote = (folderId: string, noteId: string) => {
  let notes = GetNotes(folderId);
  if (notes === undefined) return;
  return notes.find((x) => x.id === noteId);
};

export const SetNote = (folderId: string, note: Note) => {
  let folders = GetFolders();
  let folder = folders.find((x) => x.id === folderId);
  if (folder === undefined) return;
  folder.notes = [...folder.notes, note];
  cookie.set("folders", JSON.stringify(folders));
};
