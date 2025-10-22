const SUPABASE_URL = 'https://vulblhgjfzgnkidkxzle.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bGJsaGdqZnpnbmtpZGt4emxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODM4MDUsImV4cCI6MjA3NjY1OTgwNX0.u0Jbwcfw1R3Dz4rcsHtPc4rP6Inmp0fdJjorLKdjKew';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const planDateInput = document.getElementById('planDate');
const songTitleSpan = document.getElementById('songTitle');
const artistNameSpan = document.getElementById('artistName');
const commentSpan = document.getElementById('comment');
const songLinkAnchor = document.getElementById('songLink');
const messageParagraph = document.getElementById('message');

async function getDailyPlan(date) {
    const { data, error } = await supabase
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

function displayPlan(plan) {
    if (plan) {
        songTitleSpan.textContent = plan.song_title;
        artistNameSpan.textContent = plan.artist_name;
        commentSpan.textContent = plan.comment;
        songLinkAnchor.href = plan.link;
        songLinkAnchor.style.display = 'inline';
        messageParagraph.textContent = '';
    } else {
        songTitleSpan.textContent = 'No plan for this date.';
        artistNameSpan.textContent = '';
        commentSpan.textContent = '';
        songLinkAnchor.href = '#';
        songLinkAnchor.style.display = 'none';
        messageParagraph.textContent = 'No plan found for this date.';
    }
}

async function loadPlanForDate(dateString) {
    const plan = await getDailyPlan(dateString);
    displayPlan(plan);
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