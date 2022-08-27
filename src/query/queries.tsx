import { Folder, GetFolders as GetFoldersCookie } from "../helper/cookieHelper";

export const getFolders = async () => {
  return GetFoldersCookie() as Folder[];
};
