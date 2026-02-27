/**
 * Auth API - Handles Login, Signup & Password Reset
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

  // 🛑 دالة استعادة كلمة المرور الجديدة 🛑
  async resetPassword(email) {
    // سيقوم Supabase بإرسال رابط لتغيير كلمة المرور إلى هذا الإيميل
    const { data, error } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password.html', // (اختياري) صفحة تغيير الباسورد
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
  
  const msgDiv = document.getElementById('auth-message');

  // Helper to show messages
  const showMsg = (text, type = 'error') => {
    msgDiv.textContent = text;
    msgDiv.className = type === 'success' 
      ? "mt-4 text-center text-xs text-green-500 block p-3 rounded-lg bg-green-500/10 border border-green-500/20"
      : "mt-4 text-center text-xs text-red-500 block p-3 rounded-lg bg-red-500/10 border border-red-500/20";
    msgDiv.classList.remove('hidden');
  };

  // 1. Login Handler
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      try {
        const btn = loginForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        await AuthAPI.signIn(email, password);
        window.location.href = "dashboard.html"; 

      } catch (err) {
        showMsg("Email ou mot de passe incorrect.");
        loginForm.querySelector('button').innerHTML = "SE CONNECTER";
        loginForm.querySelector('button').disabled = false;
      }
    });
  }

  // 2. Signup Handler
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        const btn = signupForm.querySelector('button');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        const { user, session } = await AuthAPI.signUp(email, password, name);

        if (user && !session) {
          showMsg("Compte créé ! Veuillez vérifier votre email.", 'success');
          signupForm.reset();
          btn.innerHTML = "CRÉER UN COMPTE";
          btn.disabled = false;
        } else {
          window.location.href = "dashboard.html";
        }

      } catch (err) {
        if (err.message.includes("rate limit")) {
          showMsg("Trop de tentatives. Veuillez attendre.");
        } else {
          showMsg(err.message || "Erreur lors de l'inscription.");
        }
        signupForm.querySelector('button').innerHTML = "CRÉER UN COMPTE";
        signupForm.querySelector('button').disabled = false;
      }
    });
  }

  // 3. 🛑 Reset Password Handler 🛑
  const resetForm = document.getElementById('reset-form');
  if (resetForm) {
    resetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('reset-email').value;
      
      try {
        const btn = resetForm.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        btn.disabled = true;

        await AuthAPI.resetPassword(email);
        
        showMsg("Lien de réinitialisation envoyé ! Vérifiez votre boîte mail.", 'success');
        // resetForm.reset(); // يمكن تفعيل هذا إذا أردت مسح الحقل
        btn.innerHTML = "ENVOYER LE LIEN";
        btn.disabled = false;

      } catch (err) {
        showMsg(err.message || "Erreur lors de l'envoi.");
        resetForm.querySelector('button[type="submit"]').innerHTML = "ENVOYER LE LIEN";
        resetForm.querySelector('button[type="submit"]').disabled = false;
      }
    });
  }
});