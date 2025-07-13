const fetch = require('node-fetch');

// 辅助函数
function getRandomLocationInCountry(country) {
  const countryCoordinates = {
    "US": [{ lat: 37.7749, lng: -122.4194 }, { lat: 34.0522, lng: -118.2437 }],
    "UK": [{ lat: 51.5074, lng: -0.1278 }, { lat: 53.4808, lng: -2.2426 }],
    "FR": [{ lat: 48.8566, lng: 2.3522 }, { lat: 45.7640, lng: 4.8357 }],
    "DE": [{ lat: 52.5200, lng: 13.4050 }, { lat: 48.1351, lng: 11.5820 }],
    "CN": [{ lat: 39.9042, lng: 116.4074 }, { lat: 31.2304, lng: 121.4737 }],
    "TW": [{ lat: 25.0330, lng: 121.5654 }, { lat: 22.6273, lng: 120.3014 }],
    "HK": [{ lat: 22.3193, lng: 114.1694 },{ lat: 22.3964, lng: 114.1095 }],
    "JP": [{ lat: 35.6895, lng: 139.6917 }, { lat: 34.6937, lng: 135.5023 }],
    "IN": [{ lat: 28.6139, lng: 77.2090 }, { lat: 19.0760, lng: 72.8777 }],
    "AU": [{ lat: -33.8688, lng: 151.2093 }, { lat: -37.8136, lng: 144.9631 }], 
    "BR": [{ lat: -23.5505, lng: -46.6333 }, { lat: -22.9068, lng: -43.1729 }], 
    "CA": [{ lat: 43.651070, lng: -79.347015 }, { lat: 45.501690, lng: -73.567253 }], 
    "RU": [{ lat: 55.7558, lng: 37.6173 }, { lat: 59.9343, lng: 30.3351 }], 
    "ZA": [{ lat: -33.9249, lng: 18.4241 }, { lat: -26.2041, lng: 28.0473 }], 
    "MX": [{ lat: 19.4326, lng: -99.1332 }, { lat: 20.6597, lng: -103.3496 }], 
    "KR": [{ lat: 37.5665, lng: 126.9780 }, { lat: 35.1796, lng: 129.0756 }], 
    "IT": [{ lat: 41.9028, lng: 12.4964 }, { lat: 45.4642, lng: 9.1900 }], 
    "ES": [{ lat: 40.4168, lng: -3.7038 }, { lat: 41.3851, lng: 2.1734 }], 
    "TR": [{ lat: 41.0082, lng: 28.9784 }, { lat: 39.9334, lng: 32.8597 }], 
    "SA": [{ lat: 24.7136, lng: 46.6753 }, { lat: 21.3891, lng: 39.8579 }], 
    "AR": [{ lat: -34.6037, lng: -58.3816 }, { lat: -31.4201, lng: -64.1888 }], 
    "EG": [{ lat: 30.0444, lng: 31.2357 }, { lat: 31.2156, lng: 29.9553 }], 
    "NG": [{ lat: 6.5244, lng: 3.3792 }, { lat: 9.0579, lng: 7.4951 }], 
    "ID": [{ lat: -6.2088, lng: 106.8456 }, { lat: -7.7956, lng: 110.3695 }] 
  };
  
  const coordsArray = countryCoordinates[country];
  if (!coordsArray || coordsArray.length === 0) {
    // 默认返回美国坐标
    return { lat: 37.7749 + (Math.random() - 0.5) * 0.1, lng: -122.4194 + (Math.random() - 0.5) * 0.1 };
  }
  
  const randomCity = coordsArray[Math.floor(Math.random() * coordsArray.length)];
  const lat = randomCity.lat + (Math.random() - 0.5) * 0.1;
  const lng = randomCity.lng + (Math.random() - 0.5) * 0.1;
  return { lat, lng };
}

function formatAddress(address, country) {
  let formatted = "";
  if (address.house_number) formatted += address.house_number + " ";
  if (address.road) formatted += address.road + ", ";
  if (address.city) formatted += address.city + ", ";
  else if (address.town) formatted += address.town + ", ";
  else if (address.village) formatted += address.village + ", ";
  
  if (address.postcode) formatted += address.postcode + ", ";
  return formatted + country;
}

function getRandomPhoneNumber(country) {
  const phoneFormats = {
    "US": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchangeCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const lineNumber = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    },
    "UK": () => {
      const areaCode = Math.floor(1000 + Math.random() * 9000).toString();
      const lineNumber = Math.floor(100000 + Math.random() * 900000).toString();
      return `+44 ${areaCode} ${lineNumber}`;
    },
    "FR": () => {
      const digit = Math.floor(1 + Math.random() * 8);
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+33 ${digit} ${number}`;
    },
    "DE": () => {
      const areaCode = Math.floor(100 + Math.random() * 900).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+49 ${areaCode} ${number}`;
    },
    "CN": () => {
      const prefix = Math.floor(130 + Math.random() * 60).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+86 ${prefix} ${number}`;
    },
    "TW": () => {
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+886 9${number}`;
    },
    "HK": () => {
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+852 ${number}`;
    },
    "JP": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+81 ${areaCode} ${number}`;
    },
    "IN": () => {
      const prefix = Math.floor(700 + Math.random() * 100).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+91 ${prefix} ${number}`;
    },
    "AU": () => {
      const areaCode = Math.floor(2 + Math.random() * 8).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+61 ${areaCode} ${number}`;
    },
    "BR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+55 ${areaCode} ${number}`;
    },
    "CA": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const exchangeCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const lineNumber = Math.floor(1000 + Math.random() * 9000).toString().padStart(4, '0');
      return `+1 (${areaCode}) ${exchangeCode}-${lineNumber}`;
    },
    "RU": () => {
      const areaCode = Math.floor(100 + Math.random() * 900).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+7 ${areaCode} ${number}`;
    },
    "ZA": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+27 ${areaCode} ${number}`;
    },
    "MX": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+52 ${areaCode} ${number}`;
    },
    "KR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+82 ${areaCode} ${number}`;
    },
    "IT": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+39 ${areaCode} ${number}`;
    },
    "ES": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+34 ${areaCode} ${number}`;
    },
    "TR": () => {
      const areaCode = Math.floor(200 + Math.random() * 800).toString().padStart(3, '0');
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+90 ${areaCode} ${number}`;
    },
    "SA": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
      return `+966 ${areaCode} ${number}`;
    },
    "AR": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+54 ${areaCode} ${number}`;
    },
    "EG": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+20 ${areaCode} ${number}`;
    },
    "NG": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+234 ${areaCode} ${number}`;
    },
    "ID": () => {
      const areaCode = Math.floor(10 + Math.random() * 90).toString();
      const number = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
      return `+62 ${areaCode} ${number}`;
    }
  };
  
  const formatFunc = phoneFormats[country] || phoneFormats.US;
  return formatFunc();
}

function getRandomCountry() {
  const countries = ["US", "UK", "FR", "DE", "CN", "TW", "HK", "JP", "IN", "AU", "BR", "CA", "RU", "ZA", "MX", "KR", "IT", "ES", "TR", "SA", "AR", "EG", "NG", "ID"];
  return countries[Math.floor(Math.random() * countries.length)];
}

function getCountryOptions(selectedCountry) {
  const countries = [
    { name: "United States 美国", code: "US" },
    { name: "United Kingdom 英国", code: "UK" },
    { name: "France 法国", code: "FR" },
    { name: "Germany 德国", code: "DE" },
    { name: "China 中国", code: "CN" },
    { name: "Taiwan 中国台湾", code: "TW" },
    { name: "Hong Kong 中国香港", code: "HK" }, 
    { name: "Japan 日本", code: "JP" },
    { name: "India 印度", code: "IN" },
    { name: "Australia 澳大利亚", code: "AU" },
    { name: "Brazil 巴西", code: "BR" },
    { name: "Canada 加拿大", code: "CA" },
    { name: "Russia 俄罗斯", code: "RU" },
    { name: "South Africa 南非", code: "ZA" },
    { name: "Mexico 墨西哥", code: "MX" },
    { name: "South Korea 韩国", code: "KR" },
    { name: "Italy 意大利", code: "IT" },
    { name: "Spain 西班牙", code: "ES" },
    { name: "Turkey 土耳其", code: "TR" },
    { name: "Saudi Arabia 沙特阿拉伯", code: "SA" },
    { name: "Argentina 阿根廷", code: "AR" },
    { name: "Egypt 埃及", code: "EG" },
    { name: "Nigeria 尼日利亚", code: "NG" },
    { name: "Indonesia 印度尼西亚", code: "ID" }
  ];
  
  return countries.map(({ name, code }) => 
    `<option value="${code}" ${code === selectedCountry ? 'selected' : ''}>${name}</option>`
  ).join('');
}

function getRandomName() {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", 
                     "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", 
                     "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Lisa", 
                     "Daniel", "Nancy", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"];
  
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", 
                    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", 
                    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", 
                    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

// 主处理函数
module.exports = async (req, res) => {
  try {
    const { country } = req.query;
    const selectedCountry = country || getRandomCountry();
    
    // 获取详细地址
    let address;
    for (let i = 0; i < 50; i++) {
      const location = getRandomLocationInCountry(selectedCountry);
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`;
      
      const response = await fetch(apiUrl, {
        headers: { 'User-Agent': 'Vercel Serverless Function' }
      });
      
      if (!response.ok) {
        console.error(`Nominatim API error: ${response.status} ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      
      if (data && data.address && data.address.house_number && data.address.road && 
          (data.address.city || data.address.town || data.address.village)) {
        address = formatAddress(data.address, selectedCountry);
        break;
      }
    }
    
    if (!address) {
      return res.status(500).send('Failed to retrieve detailed address, please refresh the interface （检索详细地址失败，请刷新界面）');
    }
    
    // 获取用户数据
    let name, gender, phone;
    try {
      const userResponse = await fetch('https://randomuser.me/api/');
      if (!userResponse.ok) throw new Error('RandomUser API failed');
      
      const userJson = await userResponse.json();
      if (userJson?.results?.length > 0) {
        const user = userJson.results[0];
        name = `${user.name.first} ${user.name.last}`;
        gender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
        phone = getRandomPhoneNumber(selectedCountry);
      } else {
        throw new Error('No results from RandomUser API');
      }
    } catch (error) {
      console.error(`RandomUser API error: ${error.message}`);
      name = getRandomName();
      gender = "Unknown";
      phone = getRandomPhoneNumber(selectedCountry);
    }
    
    // 生成HTML响应
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Real Address Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            margin: 0;
            padding: 20px;
            color: #333;
          }
          
          .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 800px;
            margin: 20px 0;
            box-sizing: border-box;
            position: relative;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          
          .title {
            font-size: 2.8rem;
            margin: 15px 0;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            font-weight: 700;
          }
          
          .subtitle {
            font-size: 1.8rem;
            margin-bottom: 25px;
            color: white;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            font-weight: 500;
          }
          
          .subtitle-small {
            font-size: 1.2rem; 
            margin-bottom: 25px;
            color: rgba(255, 255, 255, 0.9);
          }
          
          .info-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border-left: 5px solid #4a7bff;
          }
          
          .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }
          
          .info-label {
            font-size: 1rem;
            color: #666;
            margin-bottom: 5px;
            font-weight: 600;
          }
          
          .info-value {
            font-size: 1.6rem;
            font-weight: 600;
            margin: 0;
            cursor: pointer;
            padding: 10px;
            border-radius: 8px;
            transition: background 0.2s;
          }
          
          .info-value:hover {
            background-color: #f0f5ff;
          }
          
          .btn-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin: 25px 0;
            flex-wrap: wrap;
          }
          
          .btn {
            padding: 14px 28px;
            background: linear-gradient(to right, #4a7bff, #6a11cb);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(106, 17, 203, 0.3);
            min-width: 220px;
          }
          
          .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(106, 17, 203, 0.4);
          }
          
          .btn:active {
            transform: translateY(1px);
          }
          
          .btn-outline {
            background: transparent;
            border: 2px solid #4a7bff;
            color: #4a7bff;
          }
          
          .country-select {
            margin: 25px 0;
            text-align: center;
          }
          
          .country-select label {
            display: block;
            font-size: 1.2rem;
            margin-bottom: 12px;
            color: #444;
            font-weight: 600;
          }
          
          .country-select span {
            display: block;
            font-size: 0.95rem;
            color: #666;
            margin-bottom: 15px;
          }
          
          .country-select select {
            width: 100%;
            max-width: 400px;
            padding: 14px;
            border-radius: 10px;
            border: 2px solid #ddd;
            font-size: 1.1rem;
            background: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.3s;
          }
          
          .country-select select:focus {
            border-color: #4a7bff;
            outline: none;
            box-shadow: 0 0 0 3px rgba(74, 123, 255, 0.2);
          }
          
          .map-container {
            width: 100%;
            height: 400px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            margin-top: 25px;
            border: 1px solid #eee;
          }
          
          .map {
            width: 100%;
            height: 100%;
            border: 0;
          }
          
          .copied {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 25px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            display: none;
          }
          
          .footer {
            margin-top: 30px;
            padding: 20px 0;
            width: 100%;
            text-align: center;
            color: rgba(255, 255, 255, 0.85);
            font-size: 1rem;
          }
          
          .footer a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          .github-icon {
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-left: 8px;
            filter: invert(1);
          }
          
          .saved-title {
            font-size: 1.8rem;
            margin: 35px 0 20px;
            color: #333;
            text-align: center;
          }
          
          .saved-addresses {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          }
          
          .saved-addresses th {
            background: linear-gradient(to right, #4a7bff, #6a11cb);
            color: white;
            padding: 15px;
            text-align: center;
          }
          
          .saved-addresses td {
            padding: 14px;
            border-bottom: 1px solid #eee;
            text-align: center;
          }
          
          .saved-addresses tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          
          .saved-addresses tr:hover {
            background-color: #f0f5ff;
          }
          
          .delete-btn {
            padding: 8px 16px;
            background: #ff4757;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
          }
          
          .delete-btn:hover {
            background: #ff2e43;
            transform: scale(1.05);
          }
          
          @media (max-width: 768px) {
            .title {
              font-size: 2.2rem;
            }
            
            .subtitle {
              font-size: 1.4rem;
            }
            
            .info-value {
              font-size: 1.3rem;
            }
            
            .btn-group {
              flex-direction: column;
              align-items: center;
            }
            
            .btn {
              width: 100%;
              max-width: 300px;
            }
            
            .saved-addresses {
              display: block;
              overflow-x: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="title">Real Address Generator</div>
        <div class="subtitle">真实地址生成器</div>
        <div class="subtitle-small">Click to copy information（点击即可复制信息）</div>
        
        <div class="container">
          <div class="copied" id="copied">Copied!</div>
          
          <div class="info-card">
            <div class="info-label">Name 姓名</div>
            <div class="info-value" onclick="copyToClipboard('${name}')">${name}</div>
          </div>
          
          <div class="info-card">
            <div class="info-label">Gender 性别</div>
            <div class="info-value" onclick="copyToClipboard('${gender}')">${gender}</div>
          </div>
          
          <div class="info-card">
            <div class="info-label">Phone 电话</div>
            <div class="info-value" onclick="copyToClipboard('${phone.replace(/[()\s-]/g, '')}')">${phone}</div>
          </div>
          
          <div class="info-card">
            <div class="info-label">Address 地址</div>
            <div class="info-value" onclick="copyToClipboard('${address}')">${address}</div>
          </div>
          
          <div class="btn-group">
            <button class="btn" onclick="window.location.reload();">Get Another Address 获取新地址</button>
            <button class="btn btn-outline" onclick="saveAddress();">Save Address 保存地址</button>
          </div>
          
          <div class="country-select">
            <label for="country">Select country, new address will be generated automatically after checking the box</label>
            <span>选择国家，在勾选后将自动生成新地址</span>
            <select id="country" onchange="changeCountry(this.value)">
              ${getCountryOptions(selectedCountry)}
            </select>
          </div>
          
          <div class="map-container">
            <iframe class="map" src="https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed"></iframe>
          </div>
          
          <h2 class="saved-title">Saved Addresses 已保存地址</h2>
          <table class="saved-addresses" id="savedAddressesTable">
            <thead>
              <tr>
                <th>操作 Operation</th>
                <th>备注 Notes</th>
                <th>姓名 Name</th>
                <th>性别 Gender</th>
                <th>电话号码 Phone number</th>
                <th>地址 Address</th>
              </tr>
            </thead>
            <tbody>
              <!-- 动态生成的内容 -->
            </tbody>
          </table>
        </div>
        
        <div class="footer">
          Original version by chatgpt.org.uk, modified by Adonis142857 ｜ 
          <a href="https://github.com/Adonis142857/Real-Address-Generator" target="_blank">
            GitHub <img src="/github-icon.png" alt="GitHub" class="github-icon">
          </a>
        </div>
        
        <script>
          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
              const copied = document.getElementById('copied');
              copied.style.display = 'block';
              setTimeout(() => {
                copied.style.display = 'none';
              }, 2000);
            });
          }
          
          function changeCountry(country) {
            window.location.href = \`?country=\${country}\`;
          }
          
          function saveAddress() {
            const note = prompt('请输入备注（可以留空）｜ Please enter a note (can be left blank)') || '';
            const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
            const newEntry = {
              note: note,
              name: '${name}',
              gender: '${gender}',
              phone: '${phone.replace(/[()\\s-]/g, '')}',
              address: '${address}'
            };
            savedAddresses.push(newEntry);
            localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
            renderSavedAddresses();
            alert('Address saved successfully! 地址保存成功！');
          }
          
          function renderSavedAddresses() {
            const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
            const tbody = document.getElementById('savedAddressesTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';
            
            if (savedAddresses.length === 0) {
              const row = tbody.insertRow();
              const cell = row.insertCell();
              cell.colSpan = 6;
              cell.textContent = 'No saved addresses 没有保存的地址';
              cell.style.textAlign = 'center';
              cell.style.padding = '30px';
              cell.style.color = '#666';
              return;
            }
            
            savedAddresses.forEach((entry, index) => {
              const row = tbody.insertRow();
              
              // 删除按钮
              const deleteCell = row.insertCell();
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = '删除 Delete';
              deleteBtn.className = 'delete-btn';
              deleteBtn.onclick = () => {
                if (confirm('Are you sure you want to delete this address? 确定要删除这个地址吗？')) {
                  savedAddresses.splice(index, 1);
                  localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
                  renderSavedAddresses();
                }
              };
              deleteCell.appendChild(deleteBtn);
              
              // 备注
              const noteCell = row.insertCell();
              noteCell.textContent = entry.note;
              
              // 姓名
              const nameCell = row.insertCell();
              nameCell.textContent = entry.name;
              
              // 性别
              const genderCell = row.insertCell();
              genderCell.textContent = entry.gender;
              
              // 电话
              const phoneCell = row.insertCell();
              phoneCell.textContent = entry.phone;
              
              // 地址
              const addressCell = row.insertCell();
              addressCell.textContent = entry.address;
            });
          }
          
          // 页面加载时渲染已保存的地址
          window.onload = function() {
            renderSavedAddresses();
          };
        </script>
      </body>
      </html>
    `;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send(`
      <div style="text-align:center; padding:50px; font-family:Arial;">
        <h2>Server Error 服务器错误</h2>
        <p>Please try again later. 请稍后再试。</p>
        <button onclick="window.location.reload()" style="padding:10px 20px; background:#4a7bff; color:white; border:none; border-radius:5px; cursor:pointer;">
          Refresh 刷新
        </button>
      </div>
    `);
  }
};