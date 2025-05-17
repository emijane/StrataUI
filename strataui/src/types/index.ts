// src/types/index.ts
export type Library = {
  id: number;
  name: string;
  url: string;
  tags: string[]; // ✅ array of tags
  category?: string;
};
