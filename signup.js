const supabaseUrl = 'https://vulblhgjfzgnkidkxzle.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bGJsaGdqZnpnbmtpZGt4emxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODM4MDUsImV4cCI6MjA3NjY1OTgwNX0.u0Jbwcfw1R3Dz4rcsHtPc4rP6Inmp0fdJjorLKdjKew'

const client = supabase.createClient(supabaseUrl, supabaseKey)

const signUpButton = document.getElementById('signup-button');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

async function signUpWithEmail() {
    const { error } = await client.auth.signUp({
        email: emailInput.value,
        password: passwordInput.value,
    });
    if (error) {
        alert(error.message);
    } else {
        alert('Check your email for a confirmation link.');
        window.location.href = 'index.html';
    }
}

signUpButton.addEventListener('click', signUpWithEmail);
