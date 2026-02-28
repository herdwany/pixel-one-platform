/**
 * Auth API - Handles Login, Signup & Password Reset
 * Updated: Shows clear on-screen SPAM warnings
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

  // استعادة كلمة المرور
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

  // دالة عرض الرسائل (محدثة لتقبل HTML)
  const showMsg = (htmlContent, type = 'error') => {
    msgDiv.innerHTML = htmlContent;
    
    // تنسيق الصندوق حسب النوع
    if (type === 'success') {
      msgDiv.className = "mt-4 text-center text-xs block p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400";
    } else {
      msgDiv.className = "mt-4 text-center text-xs block p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400";
    }
    
    msgDiv.classList.remove('hidden');
  };

  // 1. معالجة تسجيل الدخول
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

  // 2. معالجة إنشاء الحساب (مع التنبيه الجديد)
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
          // 🛑 الرسالة الجديدة: تظهر للمستخدم فوراً على الشاشة 🛑
          showMsg(`
            <div class="space-y-3">
              <p class="font-bold text-sm text-white">Compte créé avec succès ! ✅</p>
              <p>Un email de confirmation a été envoyé.</p>
              
              <div class="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg text-left flex gap-3 items-start">
                <i class="fa-solid fa-triangle-exclamation text-yellow-500 mt-0.5"></i>
                <div class="text-yellow-200/80 leading-relaxed">
                  <strong class="text-yellow-500 block mb-1">Attention :</strong>
                  Si vous ne trouvez pas l'email dans votre boîte de réception, vérifiez impérativement votre dossier <strong>SPAM</strong> ou <strong>Courriers indésirables</strong>.
                </div>
              </div>
            </div>
          `, 'success');
          
          signupForm.reset();
          btn.innerHTML = "CRÉER UN COMPTE";
          btn.disabled = false;
        } else {
          window.location.href = "dashboard.html";
        }

      } catch (err) {
        if (err.message.includes("rate limit")) {
          showMsg("Trop de tentatives. Veuillez attendre quelques minutes.");
        } else {
          showMsg(err.message || "Erreur lors de l'inscription.");
        }
        signupForm.querySelector('button').innerHTML = "CRÉER UN COMPTE";
        signupForm.querySelector('button').disabled = false;
      }
    });
  }

  // 3. معالجة استعادة كلمة المرور (مع التنبيه الجديد)
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
        
        // 🛑 الرسالة الجديدة للاستعادة 🛑
        showMsg(`
          <div class="space-y-3">
            <p class="font-bold text-sm text-white">Lien envoyé ! 📩</p>
            
            <div class="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg text-left flex gap-3 items-start">
              <i class="fa-solid fa-circle-info text-yellow-500 mt-0.5"></i>
              <div class="text-yellow-200/80 leading-relaxed">
                Veuillez vérifier votre boîte mail. Si rien n'apparaît, regardez dans vos <strong>SPAM</strong>.
              </div>
            </div>
          </div>
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