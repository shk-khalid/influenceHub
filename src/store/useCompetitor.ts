import { create } from 'zustand';
import { Competitor } from '../components/types';

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'TechInfluencer',
    handle: '@techinfluencer',
    platform: 'twitter',
    followers: 125000,
    engagement: 4.8,
    category: 'Technology',
    recentPosts: [
      {
        id: 'p1',
        content: 'Just unboxed the latest smartphone! Full review coming soon 📱',
        likes: 3200,
        comments: 428,
        date: '2024-03-01'
      },
      {
        id: 'p2',
        content: 'Top 5 tech trends to watch in 2024 🚀',
        likes: 4500,
        comments: 567,
        date: '2024-03-05'
      }
    ]
  },
  {
    id: '2',
    name: 'FashionForward',
    handle: '@fashionforward',
    platform: 'instagram',
    followers: 250000,
    engagement: 5.2,
    category: 'Fashion',
    recentPosts: [
      {
        id: 'p3',
        content: 'Spring collection sneak peek! 🌸',
        likes: 8900,
        comments: 743,
        date: '2024-03-02'
      },
      {
        id: 'p4',
        content: 'Sustainable fashion tips for 2024 🌿',
        likes: 6700,
        comments: 892,
        date: '2024-03-06'
      }
    ]
  }
];

interface CompetitorStore {
  competitors: Competitor[];
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  addCompetitor: (competitor: Omit<Competitor, 'id'>) => void;
  removeCompetitor: (id: string) => void;
  updateCompetitor: (id: string, data: Partial<Competitor>) => void;
  filteredCompetitors: () => Competitor[];
}

export const useCompetitorStore = create<CompetitorStore>((set, get) => ({
  competitors: mockCompetitors,
  searchTerm: '',
  selectedCategory: 'all',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addCompetitor: (competitor) =>
    set((state) => ({
      competitors: [
        ...state.competitors,
        { ...competitor, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  removeCompetitor: (id) =>
    set((state) => ({
      competitors: state.competitors.filter((c) => c.id !== id),
    })),
  updateCompetitor: (id, data) =>
    set((state) => ({
      competitors: state.competitors.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    })),
  filteredCompetitors: () => {
    const state = get();
    return state.competitors.filter((competitor) => {
      const matchesSearch = competitor.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                          competitor.handle.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchesCategory = state.selectedCategory === 'all' || competitor.category === state.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
}));