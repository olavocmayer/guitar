const supabaseUrl = 'https://vulblhgjfzgnkidkxzle.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bGJsaGdqZnpnbmtpZGt4emxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODM4MDUsImV4cCI6MjA3NjY1OTgwNX0.u0Jbwcfw1R3Dz4rcsHtPc4rP6Inmp0fdJjorLKdjKew'

const client = supabase.createClient(supabaseUrl, supabaseKey)

const carouselContainer = document.getElementById('carouselContainer');
const prevDayButton = document.getElementById('prevDay');
const nextDayButton = document.getElementById('nextDay');
const loginForm = document.getElementById('login-form');
const mainContent = document.getElementById('main-content');
const signInButton = document.getElementById('sign-in-button');
const signUpButton = document.getElementById('sign-up-button');
const signOutButton = document.getElementById('sign-out-button');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function getDailyPlans(startDate, endDate) {
    const { data, error } = await client
        .from('daily_plans')
        .select('*, artist_name')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching daily plans:', error.message);
        return [];
    }
    return data;
}

function displayPlans(plans, startDate, numDays) {
    carouselContainer.innerHTML = ''; // Clear previous cards

    const date = new Date(startDate);

    for (let i = 0; i < numDays; i++) {
        const dateString = date.toISOString().split('T')[0];
        const plan = plans.find(p => p.date === dateString);

        const card = document.createElement('div');
        card.className = "flex h-full flex-1 flex-col gap-4 rounded-xl bg-gray-50 border border-gray-200/80 shadow-sm min-w-60 w-60 hover:shadow-lg transition-shadow";

        if (plan) {
            card.innerHTML = `
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlfzX9hDEKoEgzCid_2ZW5je7oDGNWKo6xrdcCCA6SkIDexNvdztiFZo3pAxKYOo9YMrd1P02ELFdS8xPSyeH2G88VSzcQKpQldjXoWRR7lFThVMQX9ypRKWtzsi0ZE25z3t6CHw7GD9PYXl4gDbX8AQUvd-LqS6SHKFaoFSCHTde0i_olviReLILaEwP8xfrwq7jZyFPNY5zHAvKFrR2mphxgc4MAlbIQgqbLSFagvX-kzsYa6ehZop-zk1rD1hZaXiyh-wF5fg");'></div>
                <div class="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                        <p class="text-gray-900 text-base font-medium leading-normal">${plan.song_title}</p>
                        <p class="text-gray-500 text-sm font-normal leading-normal italic">${plan.artist_name}</p>
                        <p class="text-gray-500 text-sm font-normal leading-normal">${plan.comment}</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: 25%"></div>
                    </div>
                    <p class="text-gray-400 text-xs font-normal leading-normal mt-2">${new Date(plan.date).toLocaleDateString()}</p>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl flex items-center justify-center bg-gray-50">
                    <span class="material-symbols-outlined text-gray-500 text-6xl">calendar_today</span>
                </div>
                <div class="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                    <div>
                        <p class="text-gray-900 text-base font-medium leading-normal">No plan for ${date.toLocaleDateString()}</p>
                        <p class="text-gray-500 text-sm font-normal leading-normal">Check back later or add a plan for this date!</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-gray-400 h-2.5 rounded-full" style="width: 0%"></div>
                    </div>
                    <p class="text-gray-400 text-xs font-normal leading-normal mt-2">${date.toLocaleDateString()}</p>
                </div>
            `;
        }
        carouselContainer.appendChild(card);
        date.setDate(date.getDate() + 1);
    }
}

async function loadPlans(startDate, numDays) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + numDays - 1);
    const endDateString = endDate.toISOString().split('T')[0];
    const plans = await getDailyPlans(startDate.toISOString().split('T')[0], endDateString);
    displayPlans(plans, startDate, numDays);
}

async function signInWithEmail() {
    const { error } = await client.auth.signInWithPassword({
        email: emailInput.value,
        password: passwordInput.value,
    });
    if (error) {
        alert(error.message);
    }
}

async function signUpWithEmail() {
    const { error } = await client.auth.signUp({
        email: emailInput.value,
        password: passwordInput.value,
    });
    if (error) {
        alert(error.message);
    } else {
        alert('Check your email for a confirmation link.');
    }
}

async function signOut() {
    const { error } = await client.auth.signOut();
    if (error) {
        alert(error.message);
    }
}

// Event Listeners
signInButton.addEventListener('click', signInWithEmail);
signUpButton.addEventListener('click', signUpWithEmail);
signOutButton.addEventListener('click', signOut);
const guestModeButton = document.getElementById('guest-mode-button');

guestModeButton.addEventListener('click', () => {
    mainContent.classList.remove('hidden');
    loginForm.classList.add('hidden');
    const today = new Date();
    let currentStartDate = new Date(today);
    loadPlans(currentStartDate, 4);
});

client.auth.onAuthStateChange((event, session) => {
    if (session) {
        mainContent.classList.remove('hidden');
        loginForm.classList.add('hidden');
        const today = new Date();
        let currentStartDate = new Date(today);
        loadPlans(currentStartDate, 4);
    } else {
        mainContent.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
});

// Add event listeners for carousel navigation
prevDayButton.addEventListener('click', () => {
    const today = new Date();
    let currentStartDate = new Date(today);
    currentStartDate.setDate(currentStartDate.getDate() - 1);
    loadPlans(currentStartDate, 4);
});

nextDayButton.addEventListener('click', () => {
    const today = new Date();
    let currentStartDate = new Date(today);
    currentStartDate.setDate(currentStartDate.getDate() + 1);
    loadPlans(currentStartDate, 4);
});