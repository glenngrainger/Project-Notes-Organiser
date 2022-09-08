import cookie from "js-cookie";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

interface BaseModel {
  id?: string;
  created?: Date | string;
  updated?: Date | string;
}

export interface Folder extends BaseModel {
  name: string;
  notes: Note[];
}

export interface Note extends BaseModel {
  name: string;
  folderId?: string;
  content: string;
  isComplete?: boolean;
}

export const CreateFolder = (folder: Folder) => {
  let foldersString = cookie.get("folders");
  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  folder.id = uuidv4();
  folder.name = folder.name;
  folder.created = moment(moment.now()).format("YYYY-MM-DD hh:mm");
  folder.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");

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
  note.created = moment(moment.now()).format("YYYY-MM-DD hh:mm");
  note.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");

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

export const RemoveNote = (noteId: string, folderId: string) => {
  let folders = GetFolders();
  var folder = folders.find((x) => x.id === folderId);
  if (folder === undefined) return undefined;
  folder.notes = folder.notes.filter((x) => x.id !== noteId);
  folders = [...folders.filter((x) => x.id !== folderId), folder];
  cookie.set("folders", JSON.stringify(folders));
  return folders;
};

export const RemoveFolder = (folderId: string) => {
  const folders = GetFolders().filter((x) => x.id !== folderId);
  cookie.set("folders", JSON.stringify(folders));
};
