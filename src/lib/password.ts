// Function to hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const keyBuffer = await crypto.subtle.exportKey('raw', key);
  const keyHex = Array.from(new Uint8Array(keyBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');

  return `${saltHex}:${keyHex}`;
}


// Function to compare password
export async function comparePassword(inputPassword: string, storedHash: string): Promise<boolean> {
  const [saltHex, keyHex] = storedHash.split(':');
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const enc = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(inputPassword),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const keyBuffer = await crypto.subtle.exportKey('raw', key);
  const keyDerivedHex = Array.from(new Uint8Array(keyBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  return keyHex === keyDerivedHex;
}
