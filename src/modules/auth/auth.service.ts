import bcrypt from "bcrypt";

function hashPassword(plainPassword: string) {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
}

function validatePassword(plainPassowrd: string, hashedPassword: string) {
  return bcrypt.compareSync(plainPassowrd, hashedPassword);
}

const authService = {
  hashPassword,
  validatePassword,
};

export default authService;