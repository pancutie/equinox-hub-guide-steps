
export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

export interface ProjectFiles {
  [key: string]: Document[];
}
