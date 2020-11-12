export function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
export function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
export function convertPem (pem) {
  return str2ab(atob(pem.split('\n').map(s => s.trim()).filter(l => l.length && !l.startsWith('---')).join('')));
}

export function getEncodedMessage(header, payload) {
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));  
  const encodedMessage = `${encodedHeader}.${encodedPayload}`;
  return encodedMessage;
};