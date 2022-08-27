import {
  CreateFolder,
  Folder,
  GetFolders as GetFoldersCookie,
} from "../helper/cookieHelper";

export const getFolders = async () => {
  return GetFoldersCookie() as Folder[];
};

export const addFolder = async (folder: Folder) => {
  return CreateFolder({
    id: "test",
    name: "test",
    notes: [],
  });
};
