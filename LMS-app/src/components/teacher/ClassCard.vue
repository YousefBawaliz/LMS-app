<template>
  <div class="class-card">
    <div class="class-info">
      <div class="class-header">
        <div class="class-title">{{ classData.name }}</div>
        <div class="class-details">
          <div class="detail-item student-count">
            <i class="fas fa-user"></i> <span>{{ classData.studentCount }}</span>
          </div>
          <div class="detail-item subject">
             <i class="fas fa-flask"></i> <span>{{ classData.subject }}</span>
          </div>
        </div>
      </div>

      <div class="experiences-section">
        <div class="status-header complete-header">Complete</div>
        <div v-if="classData.completedExperiences && classData.completedExperiences.length" class="experience-list">
          <div v-for="exp in classData.completedExperiences" :key="'comp-'+exp.id" class="experience-item complete-item">
            <span>{{ exp.title }}</span>
            <span class="experience-value">{{ exp.completionRate }}%</span>
          </div>
        </div>
         <div v-else class="no-experiences">No completed experiences.</div>


        <div class="status-header upcoming-header">Upcoming</div>
         <div v-if="classData.upcomingExperiences && classData.upcomingExperiences.length" class="experience-list">
            <div v-for="exp in classData.upcomingExperiences" :key="'upc-'+exp.id" class="experience-item upcoming-item">
              <span>{{ exp.title }}</span>
              <span class="experience-value">{{ exp.upcomingDate }}</span>
            </div>
         </div>
         <div v-else class="no-experiences">No upcoming experiences.</div>
      </div>
    </div>

    <div class="class-metrics">
       <div class="metric-container">
         <div class="metric-circle avg-score-circle" :style="avgScoreStyle">
           <div class="metric-value">{{ classData.avgScore }}%</div>
         </div>
         <div class="metric-label">AVG Score</div>
       </div>

       <div class="metric-container">
         <div class="metric-circle completion-circle" :style="completionRateStyle">
           <div class="metric-value">{{ classData.completionRate }}%</div>
         </div>
         <div class="metric-label">Completion</div>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

// Define a simple interface for ClassData if not already globally defined
// Adjust this based on your actual Class structure
interface Experience {
  id: string | number;
  title: string;
  completionRate?: number; // Optional for upcoming
  upcomingDate?: string;  // Optional for completed
}

interface Class {
  name: string;
  studentCount: number;
  subject: string;
  completedExperiences: Experience[];
  upcomingExperiences: Experience[];
  avgScore: number;
  completionRate: number;
}


export default defineComponent({
  name: 'ClassCard',
  props: {
    classData: {
      type: Object as PropType<Class>,
      required: true
    }
  },
  setup(props) {
    // Calculate conic-gradient styles for progress circles
    const avgScoreStyle = computed(() => {
  const score = Math.max(0, Math.min(100, props.classData.avgScore || 0));
  return { '--progress': `${score}%` };
});

const completionRateStyle = computed(() => {
  const rate = Math.max(0, Math.min(100, props.classData.completionRate || 0));
  return { '--progress': `${rate}%` };
});


    // No longer need getScoreClass based on the target design
    // Removed getScoreClass function

    return {
      avgScoreStyle,
      completionRateStyle
    };
  }
});
</script>

<style scoped>
/* Variables for easier maintenance */
:root {
  --card-bg-left: #f0f4f8; /* Light greyish-blue background for left side */
  --card-bg-right: #e6f2ff; /* Lighter blue background for right side */
  --primary-blue: #3786d6; /* Main blue color from original */
   --primary-blue-dark: #2a6eb6; /* Darker blue for accents if needed */
  --text-dark: #333;
  --text-light: #555;
  --text-white: #ffffff;
  --progress-color: #4CAF50; /* Green for progress */
  --progress-bg: #e0e0e0; /* Light grey for progress background */
  --border-color: #d1d9e0; /* Light border color */
}

.class-card {
  width: 100%;
  background-color: #e6f0fc; /* Changed from var(--card-bg-left) to match VRExperienceCard */
  border-radius: 8px; /* Slightly more rounded corners */
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  border: 1px solid var(--border-color);
  font-family: sans-serif; /* Basic font */
}

/* Left Section */
.class-info {
  flex: 3; /* Takes more space */
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.class-header {
  display: flex;
  flex-direction: column; /* Stack title and details vertically */
  margin-bottom: 15px;
}

.class-title {
  font-size: 28px; /* Made bigger */
  color: #4D91DA;
  font-weight: bold;
  margin-right: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #E0E0E0; /* Added divider */
  width: 100%; /* Ensure divider spans full width */
}

.class-details {
  display: flex;
  gap: 15px;
  padding-top: 15px; /* Space after the divider */
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #4D91DA;
}

.detail-item i {
  color: #4D91DA;
  font-size: 14px;
}

.experiences-section {
  flex-grow: 1; /* Takes remaining space in the left column */
}

.status-header {
  font-size: 11px;
  font-weight: bold;
  padding: 3px 10px;
  border-radius: 0 5px 5px 0; /* Remove left border radius */
  display: inline-block;
  text-transform: uppercase;
  color: white; /* Keeping white for complete/upcoming headers */
  margin-left: -15px; /* Pull it to the left to align with card edge, matching the padding of class-info */
}

.complete-header {
  background-color: #3786d6;
}

.upcoming-header {
  background-color: #3786d6;
  margin-top: 15px; /* Add some space between complete and upcoming sections */
}

/* Ensure the experiences section has proper spacing */
.experiences-section {
  flex-grow: 1;
  margin-top: 15px; /* Add some space after the header section */
}

/* Adjust the experience list spacing */
.experience-list {
  font-size: 13px;
  color: var(--text-dark);
  margin: 10px 0; /* Adjust margins */
  padding-left: 0; /* Remove any default padding */
}

.experience-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 0; /* Add some vertical padding */
  border-bottom: 1px dashed var(--border-color); /* Dashed line separator */
  color: #4D91DA; /* Updated text color */
}
.experience-item:last-child {
    border-bottom: none; /* Remove border for the last item */
}

.experience-value {
  font-weight: bold;
  color: #4D91DA;
}

.complete-item .experience-value {
  color: #418BD8; /* Specific color for percentages in complete section */
}
.upcoming-item .experience-value {
  color: #4D91DA;
} 

.no-experiences {
  font-size: 13px;
  color: #4D91DA;
  padding: 5px 0;
  font-style: italic;
}


/* Right Section */
.class-metrics {
  flex: 1; /* Takes less space */
  background-color: #5D9DDE; /* Changed from var(--card-bg-right) to match VRExperienceCard */
  padding: 20px 15px; /* More vertical padding */
  margin: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center items vertically */
  align-items: center;
  gap: 30px; /* Increased gap between circles */
  border-left: 1px solid var(--border-color); /* Separator line */
}

.metric-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.metric-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#A7FF8F var(--progress, 0%), #dbeafc var(--progress, 0%));
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.metric-circle::before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: #5D9DDE; /* Changed to the requested color */
  border-radius: 50%;
  z-index: 1;
}



.metric-value {
  color: #FFFFFF; /* Changed to white for better contrast against the new background */
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
}

.metric-label {
  color: #FFFFFF; /* Changed to white for consistency */
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}

/* Remove previous animation and complex border setup */
.metric-circle::after { /* Remove the animated border if it was ::after */
    content: none;
}

@keyframes rotate { /* Remove if unused */
  /* ... */
}

/* Remove completion pill styles */
.completion-pill {
    display: none;
}

/* Remove old responsive adjustments - add back if needed later */
@media (max-width: 768px) {
   /* Add responsive styles here if necessary */
   .class-card {
       flex-direction: column;
   }
    .class-metrics {
        border-left: none;
        border-top: 1px solid var(--border-color);
        flex-direction: row;
        justify-content: space-around; /* Space out metrics horizontally */
        padding: 15px;
    }
    .class-info {
        flex: auto; /* Reset flex grow */
    }
}

@media (max-width: 480px) {
   /* Add specific small screen adjustments */
    .class-header {
        flex-direction: column;
        align-items: flex-start;
    }
    .class-details {
        padding-top: 10px;
        width: 100%; /* Make details take full width */
        justify-content: flex-start; /* Align left */
    }
     .class-metrics {
        flex-direction: column; /* Stack metrics again on very small screens */
        gap: 20px;
     }
}

</style>
