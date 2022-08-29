import cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export interface Folder {
  id?: string;
  name: string;
  created?: Date;
  updated?: Date;
  notes: Note[];
}

export interface Note {
  id?: string;
  name: string;
  folderId?: string;
  content: string;
  created?: Date;
  updated?: Date;
  isComplete?: boolean;
}

export const CreateFolder = (folder: Folder) => {
  let foldersString = cookie.get("folders");
  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  folder.id = uuidv4();
  folder.name = folder.name;
  folder.created = new Date();
  folder.updated = new Date();
  folder.notes = [];

  cookie.set("folders", JSON.stringify([...folders, folder]));
  return folder;
};

export const CreateNote = (folderId: string, note: Note) => {
  let foldersString = cookie.get("folders");

  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  note.id = uuidv4();
  note.name = note.name;
  note.folderId = note.folderId;
  note.isComplete = false;
  note.created = new Date();
  note.updated = new Date();

  folders.find((x) => x.id === folderId)?.notes.push(note);
  cookie.set("folders", JSON.stringify(folders));
  return note;
};

export const UpdateNote = (folderId: string, note: Note) => {
  let foldersString = cookie.get("folders");

  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  var noteToUpdate = folders
    .find((x) => x.id === folderId)
    ?.notes.find((x) => x.id === note.id);

  if (!noteToUpdate) return;
  noteToUpdate.name = note.name;
  noteToUpdate.content = note.content;
  noteToUpdate.isComplete = note.isComplete;
  noteToUpdate.updated = new Date();

  cookie.set("folders", JSON.stringify(folders));
  return noteToUpdate;
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
