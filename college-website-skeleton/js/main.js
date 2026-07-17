// ===== Main JS =====
// Shared scripts across all pages go here.

document.addEventListener("DOMContentLoaded", () => {
  console.log("College website loaded.");

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // TODO: Backend team — wire this up to Firebase / API endpoint
      alert("Form submitted! (Backend integration pending)");
      form.reset();
    });
  }
});
