export const emailRecoveryTemplate = (recoveryCode: string, email: string) => `
<div style="display: flex">
  <p style="margin: 0; margin-right: 4px">
    Para recuperar la contraseña dar
  </p>
  <a href="${process.env.NODE_NEST_API_WEBSITE}/restore-password/${recoveryCode}:::${email}">
    click aqui
  </a>
</div>`;
