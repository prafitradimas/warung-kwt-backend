
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

type FirebaseServiceAccount = {
  type: string,
  project_id: string,
  private_key_id: string,
  private_key: string,
  client_email: string,
  client_id: string,
  auth_uri: string,
  token_uri: string,
  auth_provider_x509_cert_url: string,
  client_x509_cert_url: string,
  universe_domain: string,
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToSdk = path.normalize(__dirname.concat("../../../firebase-sdk.json"));

console.log(`path to sdk: ${pathToSdk}`);

function parseJsonFile(path: string): FirebaseServiceAccount {
  try {
    const file_data = fs.readFileSync(path, 'utf-8');
    const json_obj = JSON.parse(file_data);
    return json_obj;

  } catch (err) {
    console.error(err);
  }
}

export const firebaseServiceAccount: FirebaseServiceAccount = parseJsonFile(pathToSdk);
