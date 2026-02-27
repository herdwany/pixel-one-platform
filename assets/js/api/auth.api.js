/**
 * Auth API - Handles Login & Signup Logic safely
 * Fixed: Sends metadata properly to avoid 401/500 errors
 */

const AuthAPI = {
  
  // تسجيل الدخول
  async signIn(email, password) {
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  // تسجيل حساب جديد
  async signUp(email, password, fullName) {
    // إرسال الاسم ضمن الميتا داتا
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, 
        }
      }
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) throw error;
  }
};

// ── Event Listeners ──

document.addEventListener('DOMContentLoaded', () => {
  
  // Login Handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const msgDiv = document.getElementById('auth-message');
      
      try {
        const btn = loginForm.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        await AuthAPI.signIn(email, password);
        window.location.href = "dashboard.html"; 

      } catch (err) {
        msgDiv.textContent = "Email ou mot de passe incorrect.";
        msgDiv.className = "mt-4 text-center text-xs text-red-500 block p-3 rounded-lg bg-red-500/10 border border-red-500/20";
        msgDiv.classList.remove('hidden');
        loginForm.querySelector('button').innerHTML = "SE CONNECTER";
        loginForm.querySelector('button').disabled = false;
      }
    });
  }

  // Signup Handler
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const msgDiv = document.getElementById('auth-message');

      try {
        const btn = signupForm.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        const { user, session } = await AuthAPI.signUp(email, password, name);

        // نجاح التسجيل
        if (user && !session) {
          msgDiv.textContent = "Compte créé ! Veuillez vérifier votre email.";
          msgDiv.className = "mt-4 text-center text-xs text-green-500 block p-3 rounded-lg bg-green-500/10 border border-green-500/20";
          msgDiv.classList.remove('hidden');
          signupForm.reset();
          btn.innerHTML = "CRÉER UN COMPTE";
          btn.disabled = false;
        } else {
          window.location.href = "dashboard.html";
        }

      } catch (err) {
        console.error(err);
        // التعامل مع خطأ التكرار
        if (err.message.includes("rate limit")) {
          msgDiv.textContent = "Trop de tentatives. Veuillez attendre un peu.";
        } else {
          msgDiv.textContent = err.message || "Erreur lors de l'inscription.";
        }
        msgDiv.className = "mt-4 text-center text-xs text-red-500 block p-3 rounded-lg bg-red-500/10 border border-red-500/20";
        msgDiv.classList.remove('hidden');
        signupForm.querySelector('button').innerHTML = "CRÉER UN COMPTE";
        signupForm.querySelector('button').disabled = false;
      }
    });
  }
});