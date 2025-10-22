
const supabaseUrl = 'https://vulblhgjfzgnkidkxzle.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bGJsaGdqZnpnbmtpZGt4emxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODM4MDUsImV4cCI6MjA3NjY1OTgwNX0.u0Jbwcfw1R3Dz4rcsHtPc4rP6Inmp0fdJjorLKdjKew'

const client = supabase.createClient(supabaseUrl, supabaseKey)

const planDateInput = document.getElementById('planDate');
const carouselContainer = document.getElementById('carouselContainer');
const messageParagraph = document.getElementById('message');
const prevDayButton = document.getElementById('prevDay');
const nextDayButton = document.getElementById('nextDay');

async function getDailyPlan(date) {
    const { data, error } = await client
        .from('daily_plans')
        .select('*')
        .eq('date', date)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error fetching daily plan:', error.message);
        messageParagraph.textContent = 'Error fetching plan.';
        return null;
    }
    return data;
}

function displayPlan(plan, dateString) {
    carouselContainer.innerHTML = ''; // Clear previous cards
    messageParagraph.textContent = ''; // Clear previous messages

    const card = document.createElement('div');
    card.classList.add('card');

    if (plan) {
        card.innerHTML = `
            <h2>${plan.song_title}</h2>
            <p><strong>Artist:</strong> ${plan.artist_name}</p>
            <p><strong>Comment:</strong> ${plan.comment}</p>
            <p><strong>Link:</strong> <a href="${plan.link}" target="_blank">Watch Tutorial</a></p>
        `;
    } else {
        card.innerHTML = `
            <h2>No plan for ${dateString}</h2>
            <p>Check back later or add a plan for this date!</p>
        `;
    }
    carouselContainer.appendChild(card);
}

async function loadPlanForDate(dateString) {
    const plan = await getDailyPlan(dateString);
    displayPlan(plan, dateString);
}

// Set initial date to today
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const dd = String(today.getDate()).padStart(2, '0');
const todayString = `${yyyy}-${mm}-${dd}`;
planDateInput.value = todayString;

// Load plan for today on initial load
loadPlanForDate(todayString);

// Add event listener for date changes
planDateInput.addEventListener('change', (event) => {
    loadPlanForDate(event.target.value);
});

// Add event listeners for carousel navigation
prevDayButton.addEventListener('click', () => {
    const currentDate = new Date(planDateInput.value);
    currentDate.setDate(currentDate.getDate() - 1);
    const newDateString = currentDate.toISOString().split('T')[0];
    planDateInput.value = newDateString;
    loadPlanForDate(newDateString);
});

nextDayButton.addEventListener('click', () => {
    const currentDate = new Date(planDateInput.value);
    currentDate.setDate(currentDate.getDate() + 1);
    const newDateString = currentDate.toISOString().split('T')[0];
    planDateInput.value = newDateString;
    loadPlanForDate(newDateString);
});