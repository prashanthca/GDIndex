import getTokenFromGCPServiceAccount from './sas'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request).catch(err => {
    console.error(err);
    return new Response(JSON.stringify(err.stack), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }));
});

const service_account_json = {
    private_key_id: "eed302d94c74856540d827f47e52716fbe58100d",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDP8khUzBxUINFV\nzSGLQFlkMQdV5FqbdITNbLVmUcKbNl0qhwAvr1iA5AyQi4TuwX7X77PtIo9h00YO\nDSfDYI4JmoZcBp3saBxcX2ystxq2JN++cicxP+jQYALuk82ThD5giEtkbSzkZZth\nj5SeACAe7m925DPWxBXLcuQLLUpWIOIjFlP3WWZp1075XBS1vMjKsTR0yWISX4Oh\nDVTc3CL0zeBVNV4B3lgb2rqx2QbzD1uKCQ3QrJf+YttBNMG6egGjKABsNlGu+0Dz\nz2rQZo0GHZ0wNXCOskezLY/D9Y3J58pCifu3jcBtdSSteDCYILdjpC4spxhEl5sZ\nijkQClqlAgMBAAECggEAAabAD5mIW9wTDxsGk9HFjY/Jg5N0hPM44iqL46P6FBv4\nKbzyBPu5cidj3ydjsJ0aQ58JPxsANJifxlkXfzJ02YHGSxRLxd0X/pBmb0lL91ui\nTqOe71uKOIXOq1p11NPrxkrGy7JSdTGsxhDrFZJU+8UZq87JOs2KiirsWzD3bzXA\nRh2wD8v0F+Fg187SJRLjUfqlr5V/hYyrFz1t2/TQDmuCUork4AN/2u53BWRmxUnD\nexeL93ZWnMMWMxXQjtPKB5fqvEzCI+sT3gDBLWF1HrwK79KgVa6C/YrCu6XXphUI\nHQ+iT9voSYj+HiUMEAW16JpmSSTteilM0j6QQLFaAQKBgQDxRkKD9yNvPw5kb0rv\n5chOz87O9bul4SYRxUSUaxsw4AdUjbbI7Eyaxj5raoTV6a10KkJdL9LKGSP90PFz\n9dzN+M4lphpr9te7sFZ9OMikeoL77I1Z1ieY/QX/ArkUqCd6oX4EUcMBRM3I7izZ\n0SF7NmaTFs5fiGxcXMqpWbLwpQKBgQDco0vLI4uIhrT7wxG7k6ihl7ypaO1EpDs4\nZxNL/5oIE6lIZADS9Y9xa/s3kQBxO30Fkqwfw79UNCTWtqs3nNjKNuhv2uTcT63F\nah+i+yHOYZEAzgQ9OzZDv/3duu16hYoCaDxOnJpMVSeETyNL0spw4Akm7jG94XCu\nym4bbaOiAQKBgDJu0EqLZ0HCuXxu8wgQTP2EXKNQJEg5Nt7yEDLB7K4btgyLjtCS\n7DRSCgwj+N5J+TLV/odCDtqlxKsyeLYXh28aeeTOwqkcsN2Pr5R/QRl4blbAjI9h\nv2cwRIeYhx11RMNSbGf0u0FRo35DouZo24nIxkoqszqu5o+r6cTadhftAoGANNNY\nE0PoZYCzFlAnD70Ts9TLk9gObs/Pafqr0RdafrKOZkmjNN8cP/C1jiFGdNXkYhAy\n68wHJBbz9wB3T/JaqVeqIRXMk770AP8eofv0pSARAptQwoRJwsDV/F+D+kC8wUTJ\no5y1CK+erXvxHHdUht/s8Qg4mpi+TOskn6aJdgECgYEAp8iwW+BsxlNh483eAOmH\niD2zuX3W35ASRxTuSEa3xn02hn5UFv4hvUadxwVMie3U05gIIjG59cTTlKShzNBi\nyZy/nUeZ+7m49gs/hQAxuY/K5JxPMbuIric5bWsfliT89Z8x7fAfTZ5W+WIpREBt\n/aqVsVAby1ErqIOaUKrK/ak=\n-----END PRIVATE KEY-----\n",
    client_email: "addic7ed-subs@appspot.gserviceaccount.com",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/addic7ed-subs%40appspot.gserviceaccount.com",
    scope: "https://www.googleapis.com/auth/drive.read_only"
};
async function handleRequest(request) {
  var _authURL = service_account_json.token_uri;
  var _sa_json = service_account_json;  
  const token = await getTokenFromGCPServiceAccount(_sa_json,_authURL);
  return new Response(token, {status:'200'});
};