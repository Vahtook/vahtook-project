const http = require('http');

// Test if backend API endpoints are working
async function testBackendAPI() {
  console.log('🧪 Testing Vahtook Backend API Endpoints...\n');

  // Test 1: Health check
  await testEndpoint('GET', '/health', null, 'Health Check');
  
  // Test 2: Login (to get auth token)
  const loginResult = await testEndpoint('POST', '/api/admin/login', {
    email: 'admin@vahtook.com',
    password: 'admin123'
  }, 'Admin Login');

  // Extract token from login response
  let authToken = null;
  if (loginResult && loginResult.success && loginResult.data && loginResult.data.token) {
    authToken = loginResult.data.token;
    console.log('✅ Got auth token for API tests\n');
  } else {
    console.log('❌ Could not get auth token, skipping authenticated endpoints\n');
    return;
  }

  // Test 3: Get all orders (authenticated)
  await testEndpoint('GET', '/api/orders', null, 'Get All Orders', authToken);
  
  // Test 4: Get order statistics (authenticated)
  await testEndpoint('GET', '/api/orders/statistics', null, 'Order Statistics', authToken);
  
  // Test 5: Get recent orders (authenticated)
  await testEndpoint('GET', '/api/orders/recent', null, 'Recent Orders', authToken);
}

function testEndpoint(method, path, data, testName, authToken = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    console.log(`🔍 Testing: ${testName}`);
    console.log(`   ${method} http://localhost:5000${path}`);

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          console.log(`   Status: ${res.statusCode}`);
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`   ✅ SUCCESS`);
            if (result.data && Array.isArray(result.data)) {
              console.log(`   📊 Found ${result.data.length} items`);
            } else if (result.data) {
              console.log(`   📊 Response data available`);
            }
          } else {
            console.log(`   ❌ ERROR: ${result.message || 'Unknown error'}`);
          }
          
          console.log(''); // Empty line for readability
          resolve(result);
        } catch (error) {
          console.log(`   ❌ JSON Parse Error: ${error.message}`);
          console.log(`   Raw response: ${responseData}`);
          console.log('');
          resolve(null);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`   ❌ Connection Error: ${error.message}`);
      console.log('');
      resolve(null);
    });

    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

testBackendAPI();