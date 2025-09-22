const http = require('http');

// Test health endpoint
function testHealth() {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Backend health check successful:');
      console.log(JSON.parse(data));
      testLogin();
    });
  });

  req.on('error', (error) => {
    console.error('❌ Backend health check failed:', error.message);
    console.log('🔧 Make sure the backend is running: npm run dev');
  });

  req.end();
}

// Test login endpoint
function testLogin() {
  const postData = JSON.stringify({
    email: 'admin@vahtook.com',
    password: 'admin123'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Login API test successful:');
      console.log(JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    console.error('❌ Login API test failed:', error.message);
  });

  req.write(postData);
  req.end();
}

console.log('🧪 Testing Vahtook Admin Panel Backend...');
console.log('📡 Checking http://localhost:5000');
testHealth();