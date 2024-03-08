import fs from 'fs';
import accessEnv from '../accessEnv.js';
import constants from '../constants.js';

function setJwtTokens() {

  const envJwtPrivateKeyFile = accessEnv(
    'JWT_PRIVATE_KEY_FILE',
    constants.jwt.privateKeyFile,
  );

  const currentPath = process.cwd();
  const privateKeyFileName = `${currentPath}/src/helpers/jwt/${envJwtPrivateKeyFile}`;
  const jwtPrivateKey = fs.readFileSync(privateKeyFileName, 'utf8');
  global.jwtPrivateKey = jwtPrivateKey;
}

export default {
  setJwtTokens,
};
