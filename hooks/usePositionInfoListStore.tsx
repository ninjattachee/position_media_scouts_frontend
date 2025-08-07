import { create } from "zustand";

export type NamedUrl = {
  name: string;
  url: string;
};

export type PositionInfo = {
  company: string;
  position: string;
  name: string;
  blog_articles: string[];
  youtube_interviews: NamedUrl[];
};

export const usePositionInfoListStore = create<{
  positionInfoList: PositionInfo[];
  setPositionInfoList: (positionInfoList: PositionInfo[]) => void;
}>((set) => ({
  positionInfoList: [],
  setPositionInfoList: (positionInfoList) => set({ positionInfoList }),
}));
