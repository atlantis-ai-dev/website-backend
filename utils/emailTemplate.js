function getVerificationEmailHTML({ name, url }) {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #048dca;">Welcome to Atlantis AI 👋</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thanks for signing up. Please confirm your email address to activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" 
            style="background-color: #048dca; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If you didn't create this account, you can safely ignore this email.</p>
        <p style="color: #888; font-size: 12px;">— Atlantis AI Team</p>
      </div>
    `;
  }
  
  module.exports = { getVerificationEmailHTML };