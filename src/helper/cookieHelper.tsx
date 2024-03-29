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
  let folder = folders.find((x) => x.id === folderId);
  if (folder === undefined) return;

  note.id = uuidv4();
  note.name = note.name;
  note.folderId = folderId;
  note.isComplete = false;
  note.created = moment(moment.now()).format("YYYY-MM-DD hh:mm");
  note.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");

  folder.notes.push(note);
  folder.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");

  cookie.set("folders", JSON.stringify(folders));
  return note;
};

export const UpdateNote = (folderId: string, note: Note) => {
  let foldersString = cookie.get("folders");

  let folders = foldersString ? (JSON.parse(foldersString) as Folder[]) : [];

  var folder = folders.find((x) => x.id === folderId);
  var noteToUpdate = folder?.notes.find((x) => x.id === note.id);
  if (!noteToUpdate || !folder) return;
  folder.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");
  noteToUpdate.name = note.name;
  noteToUpdate.content = note.content;
  noteToUpdate.isComplete = note.isComplete;
  noteToUpdate.updated = moment(moment.now()).format("YYYY-MM-DD hh:mm");

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
  var removedNote = folder.notes.find((x) => x.id === noteId);
  folder.notes = folder.notes.filter((x) => x.id !== noteId);
  folders = [...folders.filter((x) => x.id !== folderId), folder];
  cookie.set("folders", JSON.stringify(folders));
  return removedNote;
};

export const RemoveFolder = (folderId: string) => {
  let folders = GetFolders().filter((x) => x.id !== folderId);
  cookie.set("folders", JSON.stringify(folders));
};

export const BulkRemoveNotes = (folderId: string, noteIds: string[]) => {
  let folders = GetFolders();
  let folder = folders.find((x) => x.id === folderId);
  if (folder === undefined) return;
  folder.notes = folder.notes.filter((x) => !noteIds.includes(x?.id || ""));
  cookie.set(
    "folders",
    JSON.stringify([...folders.filter((x) => x.id !== folderId), folder])
  );
  return noteIds;
};

export const BulkRemoveFolders = (folderIds: string[]) => {
  let folders = GetFolders();
  folders = folders.filter((x) => !folderIds.includes(x.id || ""));
  cookie.set("folders", JSON.stringify(folders));
  return folderIds;
};

export const BulkSetNoteStatus = (
  folderId: string,
  noteIds: string[],
  status: boolean
) => {
  let folders = GetFolders();
  let folder = folders.find((x) => x.id === folderId);
  if (folder === undefined) return;
  let notesToUpdate = folder.notes.filter((x) => noteIds.includes(x.id || ""));
  notesToUpdate.forEach((x) => (x.isComplete = status));
  cookie.set("folders", JSON.stringify(folders));
  return noteIds;
};
