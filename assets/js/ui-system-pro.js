/* UI SYSTEM PRO – SAFE INTERACTION LAYER */

(function(){

  if(!document.body.hasAttribute("data-ui")) return;

  /* Reveal on Scroll */

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.15});

  elements.forEach(el=>observer.observe(el));

})();