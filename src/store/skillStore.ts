import { create } from 'zustand';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

interface SkillState {
  selectedSkills: Skill[];
  assessmentCompleted: boolean;
  currentPath: string | null;
  addSkill: (skill: Skill) => void;
  removeSkill: (skillId: string) => void;
  clearSkills: () => void;
  completeAssessment: () => void;
  setCurrentPath: (path: string) => void;
}

export const useSkillStore = create<SkillState>((set) => ({
  selectedSkills: [],
  assessmentCompleted: false,
  currentPath: null,
  addSkill: (skill) =>
    set((state) => ({
      selectedSkills: [...state.selectedSkills, skill],
    })),
  removeSkill: (skillId) =>
    set((state) => ({
      selectedSkills: state.selectedSkills.filter((skill) => skill.id !== skillId),
    })),
  clearSkills: () => set({ selectedSkills: [] }),
  completeAssessment: () => set({ assessmentCompleted: true }),
  setCurrentPath: (path) => set({ currentPath: path }),
}));