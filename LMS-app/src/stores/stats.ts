import { defineStore } from 'pinia';
// import api from '../services/api';

interface StatData {
  labels: string[];
  values: number[];
}

export interface FilterOptions {
  class?: string;
  grade?: string;
  experience?: string;
  teacher?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

interface OverallStats {
  avgScore: number;
  avgCompletionRate: number;
  studentsInClass: number;
  assignedVRExperiences: number;
  avgEngagementTime: string;
  avgMistakes: number | string;
  scoreDistribution: StatData;
  mistakesDistribution: StatData;
  timeDistribution: StatData;
}

interface StatsState {
  overallStats: OverallStats | null;
  classStats: Record<string, OverallStats>;
  experienceStats: Record<string, any>;
  teacherStats: Record<string, any>;
  currentFilters: FilterOptions;
  defaultDateRange: {
    start: string;
    end: string;
  };
  loading: boolean;
}

export const useStatsStore = defineStore('stats', {
  state: (): StatsState => ({
    overallStats: {
      avgScore: 77,
      avgCompletionRate: 92,
      studentsInClass: 28,
      assignedVRExperiences: 8,
      avgEngagementTime: '8 min 40 secs',
      avgMistakes: '7 Mistakes',
      scoreDistribution: {
        labels: ['0-50', '50-59', '60-69', '70-79', '80-89', '90-100'],
        values: [5, 10, 15, 20, 25, 15]
      },
      mistakesDistribution: {
        labels: ['0-1', '2-3', '4-5', '6-7', '8-9', '10+'],
        values: [10, 20, 30, 25, 10, 5]
      },
      timeDistribution: {
        labels: ['0-5min', '5-10min', '10-15min', '15-20min', '20-25min', '25min+'],
        values: [15, 35, 25, 15, 8, 2]
      }
    },
    classStats: {
      'class001': {
        avgScore: 77,
        avgCompletionRate: 96,
        studentsInClass: 28,
        assignedVRExperiences: 8,
        avgEngagementTime: '8 min 40 secs',
        avgMistakes: '7 Mistakes',
        scoreDistribution: {
          labels: ['0-50', '50-59', '60-69', '70-79', '80-89', '90-100'],
          values: [5, 8, 20, 22, 20, 25]
        },
        mistakesDistribution: {
          labels: ['0-1', '2-3', '4-5', '6-7', '8-9', '10+'],
          values: [12, 25, 28, 20, 10, 5]
        },
        timeDistribution: {
          labels: ['0-5min', '5-10min', '10-15min', '15-20min', '20-25min', '25min+'],
          values: [18, 32, 26, 14, 8, 2]
        }
      },
      // More class stats would be added here
    },
    experienceStats: {
      'exp001': {
        avgScore: 92,
        completionRate: 95,
        studentsAssigned: 72,
        avgTime: '8 min 24 secs',
        avgMistakes: 2,
        scoreDistribution: {
          labels: ['0-50', '50-59', '60-69', '70-79', '80-89', '90-100'],
          values: [0, 2, 5, 10, 15, 40]
        }
      },
      // More experience stats would be added here
    },
    teacherStats: {
      't001': {
        avgStudentsScore: 87,
        avgStudentsCompletion: 92,
        assignedClasses: 6,
        numberOfStudents: 142,
        assignedExperiences: 7,
        avgTimePerExperience: '7 minutes'
      },
      // More teacher stats would be added here
    },
    currentFilters: {
      class: '',
      grade: '',
      experience: '',
      teacher: '',
      dateRange: {
        start: 'Aug 12th 2024',
        end: 'Oct 12th 2024'
      }
    },
    defaultDateRange: {
      start: 'Aug 12th 2024',
      end: 'Oct 12th 2024'
    },
    loading: false
  }),
  
  actions: {
    // Fetch overall stats with optional filters
    async fetchOverallStats(filters?: FilterOptions) {
      this.loading = true;
      
      // If filters are provided, update the current filters
      if (filters) {
        this.applyFilters(filters);
      }
      
      try {
        // In a real app, this would be an API call
        // const params = { ...this.currentFilters };
        // const response = await api.get('/stats/overall', { params });
        // this.overallStats = response.data;
        
        // For the mock, we'll pretend the API call was made
        // In a real app, the API would process the filters and return filtered data
        // Here we're just returning the sample data
        
        // Simulate delayed response
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return this.overallStats;
      } catch (error) {
        console.error('Error fetching overall stats:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch class stats with optional filters
    async fetchClassStats(classId: string, filters?: FilterOptions) {
      this.loading = true;
      
      // Combine class filter with any other filters
      const combinedFilters = { 
        ...filters,
        class: classId 
      };
      
      // Update current filters
      this.applyFilters(combinedFilters);
      
      try {
        // In a real app, this would be an API call
        // const params = { ...this.currentFilters };
        // const response = await api.get(`/stats/classes/${classId}`, { params });
        // this.classStats[classId] = response.data;
        
        // For the mock, we'll check if we have sample data for this class
        if (this.classStats[classId]) {
          // Simulate delayed response
          await new Promise(resolve => setTimeout(resolve, 500));
          
          return this.classStats[classId];
        } else {
          // Return default stats if no sample data exists
          return this.overallStats;
        }
      } catch (error) {
        console.error('Error fetching class stats:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch experience stats with optional filters
    async fetchExperienceStats(experienceId: string, filters?: FilterOptions) {
      this.loading = true;
      
      // Combine experience filter with any other filters
      const combinedFilters = { 
        ...filters,
        experience: experienceId 
      };
      
      // Update current filters
      this.applyFilters(combinedFilters);
      
      try {
        // In a real app, this would be an API call
        // const params = { ...this.currentFilters };
        // const response = await api.get(`/stats/experiences/${experienceId}`, { params });
        // this.experienceStats[experienceId] = response.data;
        
        // For the mock, we'll check if we have sample data for this experience
        if (this.experienceStats[experienceId]) {
          // Simulate delayed response
          await new Promise(resolve => setTimeout(resolve, 500));
          
          return this.experienceStats[experienceId];
        } else {
          // Return a placeholder if no sample data exists
          return {
            avgScore: 0,
            completionRate: 0,
            studentsAssigned: 0,
            avgTime: '0 min',
            avgMistakes: 0,
            scoreDistribution: {
              labels: ['0-50', '50-59', '60-69', '70-79', '80-89', '90-100'],
              values: [0, 0, 0, 0, 0, 0]
            }
          };
        }
      } catch (error) {
        console.error('Error fetching experience stats:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch teacher stats with optional filters
    async fetchTeacherStats(teacherId: string, filters?: FilterOptions) {
      this.loading = true;
      
      // Combine teacher filter with any other filters
      const combinedFilters = { 
        ...filters,
        teacher: teacherId 
      };
      
      // Update current filters
      this.applyFilters(combinedFilters);
      
      try {
        // In a real app, this would be an API call
        // const params = { ...this.currentFilters };
        // const response = await api.get(`/stats/teachers/${teacherId}`, { params });
        // this.teacherStats[teacherId] = response.data;
        
        // For the mock, we'll check if we have sample data for this teacher
        if (this.teacherStats[teacherId]) {
          // Simulate delayed response
          await new Promise(resolve => setTimeout(resolve, 500));
          
          return this.teacherStats[teacherId];
        } else {
          // Return a placeholder if no sample data exists
          return {
            avgStudentsScore: 0,
            avgStudentsCompletion: 0,
            assignedClasses: 0,
            numberOfStudents: 0,
            assignedExperiences: 0,
            avgTimePerExperience: '0 minutes'
          };
        }
      } catch (error) {
        console.error('Error fetching teacher stats:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    // Apply filters for stats queries
    applyFilters(filters: FilterOptions) {
      this.currentFilters = {
        ...this.currentFilters,
        ...filters
      };
      
      // If dateRange is not provided, use the default
      if (!filters.dateRange) {
        this.currentFilters.dateRange = this.defaultDateRange;
      }
    },
    
    // Generate a comprehensive report with filters
    async generateReport(filters: FilterOptions) {
      this.loading = true;
      
      // Update current filters
      this.applyFilters(filters);
      
      try {
        // In a real app, this would be an API call
        // const params = { ...this.currentFilters };
        // const response = await api.get('/stats/report', { params });
        // return response.data;
        
        // For the mock, we'll return a custom object combining various stats
        // Simulate delayed response
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be a comprehensive report based on the filters
        return {
          overallStats: this.overallStats,
          filteredStats: {
            avgScore: 85,
            avgCompletionRate: 93,
            totalStudents: filters.class ? 28 : (filters.grade ? 125 : 450),
            totalExperiences: 8,
            topPerformingClass: '9C',
            lowestPerformingClass: '10B',
            mostActiveTeacher: 'Sarah Silvergold',
            mostPopularExperience: 'Atomic Bonds',
            scoreDistribution: this.overallStats?.scoreDistribution
          },
          // Add detailed breakdowns based on filters
          detailedBreakdowns: {
            byClass: filters.class ? this.classStats[filters.class as string] : null,
            byExperience: filters.experience ? this.experienceStats[filters.experience as string] : null,
            byTeacher: filters.teacher ? this.teacherStats[filters.teacher as string] : null
          },
          // Add comparison data if relevant
          comparisons: {
            vsLastMonth: {
              avgScoreChange: '+2.5%',
              completionRateChange: '+1.2%',
              engagementTimeChange: '-0.5 min'
            }
          }
        };
      } catch (error) {
        console.error('Error generating report:', error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    // Export data in specified format
    async exportData(format: 'csv' | 'pdf', data: any) {
      try {
        // In a real app, this would be an API call or client-side generation
        // const response = await api.post('/stats/export', { format, data });
        // return response.data;
        
        // For now, we'll just return a mock URL
        console.log(`Exporting data in ${format} format...`);
        
        // Simulate delayed response
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Return mock download URL
        return {
          downloadUrl: `/exports/stats-export-${Date.now()}.${format}`
        };
      } catch (error) {
        console.error(`Error exporting data as ${format}:`, error);
        return null;
      }
    },
    
    // Reset filters to default
    resetFilters() {
      this.currentFilters = {
        class: '',
        grade: '',
        experience: '',
        teacher: '',
        dateRange: { ...this.defaultDateRange }
      };
    }
  }
});