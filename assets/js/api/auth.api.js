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
    const { data, error } = await getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password.html',
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
    // 🛑 تغيير مهم: استخدام innerHTML بدلاً من textContent للسماح بالتنسيق
    msgDiv.innerHTML = text;
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
          // 🛑 هنا وضعنا التنبيه الخاص بالسبام 🛑
          showMsg(`
            Compte créé avec succès !<br>
            Veuillez vérifier votre email pour l'activer.<br><br>
            <span class="font-bold text-yellow-500">⚠️ Important :</span> 
            Si vous ne trouvez pas l'email, vérifiez votre dossier <strong>SPAM</strong> (Courriers indésirables).
          `, 'success');
          
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

  // 3. Reset Password Handler
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
        
        // 🛑 هنا وضعنا التنبيه الخاص بالسبام أيضاً 🛑
        showMsg(`
          Lien envoyé !<br>
          <span class="font-bold text-yellow-500">⚠️ Note :</span> 
          Vérifiez aussi vos <strong>SPAM</strong> si l'email n'apparait pas dans la boîte de réception.
        `, 'success');

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