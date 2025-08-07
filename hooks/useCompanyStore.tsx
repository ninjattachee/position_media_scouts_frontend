import { create } from "zustand";

export const useCompanyStore = create<{
  companies: string[];
  setCompanies: (companies: string[]) => void;
  addCompany: (company: string) => void;
  removeCompany: (company: string) => void;
}>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  removeCompany: (company) =>
    set((state) => ({
      companies: state.companies.filter((c) => c !== company),
    })),
}));
