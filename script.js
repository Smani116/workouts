const workouts = {
    day1: {
        title: "Day 1 – Full Body Fat Burn",
        exercises: [
            "Jumping jacks — 30 sec × 3",
            "Squats — 15 × 3",
            "Push-ups — 8–15 × 3",
            "Mountain climbers — 30 sec × 3",
            "Plank — 30–45 sec × 3"
        ]
    },
    day2: {
        title: "Day 2 – Cardio + Core",
        exercises: [
            "High knees — 30 sec × 4",
            "Burpees — 10 × 3",
            "Bicycle crunches — 20 × 3",
            "Leg raises — 15 × 3",
            "Fast walking — 20–30 min"
        ]
    },
    day3: {
        title: "Day 3 – Lower Body",
        exercises: [
            "Squats — 20 × 4",
            "Lunges — 12 each leg × 3",
            "Glute bridge — 20 × 3",
            "Wall sit — 45 sec × 3",
            "Calf raises — 25 × 3"
        ]
    },
    day4: {
        title: "Day 4 – Upper Body",
        exercises: [
            "Push-ups — 3 sets",
            "Incline push-ups (bed/chair) — 3 sets",
            "Chair dips — 12 × 3",
            "Shoulder taps — 20 × 3",
            "Plank — 1 min × 3"
        ]
    },
    day5: {
        title: "Day 5 – HIIT Fat Burn",
        note: "Repeat 4 rounds:",
        exercises: [
            "Jump squats — 15",
            "Mountain climbers — 30 sec",
            "Burpees — 10",
            "High knees — 30 sec",
            "Rest — 1 min"
        ]
    },
    day6: {
        title: "Day 6 – Walking + Stretching",
        exercises: [
            "45–60 min walk",
            "Light stretching"
        ]
    },
    day7: {
        title: "Day 7 – Rest",
        exercises: [
            "Enjoy your rest day! Active recovery is optional."
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const daySelect = document.getElementById('day-select');
    const workoutContent = document.getElementById('workout-content');

    function renderWorkout(dayKey) {
        const data = workouts[dayKey];
        if (!data) return;

        // Remove animation class to restart it
        workoutContent.classList.remove('fade-in');
        
        // Force reflow
        void workoutContent.offsetWidth;
        
        let html = `<h2>${data.title}</h2>`;
        
        if (data.note) {
            html += `<p class="workout-note">${data.note}</p>`;
        }
        
        if (data.exercises && data.exercises.length > 0) {
            html += `<ul class="exercise-list">`;
            data.exercises.forEach(ex => {
                html += `
                    <li class="exercise-item">
                        <span class="exercise-bullet"></span>
                        <span class="exercise-text">${ex}</span>
                    </li>
                `;
            });
            html += `</ul>`;
        }

        workoutContent.innerHTML = html;
        workoutContent.classList.add('fade-in');
    }

    daySelect.addEventListener('change', (e) => {
        renderWorkout(e.target.value);
    });

    // Initial render
    renderWorkout(daySelect.value);
});
