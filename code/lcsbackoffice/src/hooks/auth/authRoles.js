export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  editor: ['SA', 'ADMIN', 'EDITOR'], 
  guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'] 
};
