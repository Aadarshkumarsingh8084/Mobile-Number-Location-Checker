document.addEventListener('DOMContentLoaded', function() {
    const mobileNumberInput = document.getElementById('mobileNumber');
    const searchBtn = document.getElementById('searchBtn');
    const resultContainer = document.getElementById('resultContainer');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    
    // Format phone number as user types (only allow digits)
    mobileNumberInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
    });
    
    searchBtn.addEventListener('click', function() {
        const mobileNumber = mobileNumberInput.value;
        
        // Validate input for Indian numbers
        if (!mobileNumber) {
            showError('Please enter a mobile number');
            return;
        }
        
        if (mobileNumber.length !== 10) {
            showError('Indian mobile numbers must be 10 digits');
            return;
        }
        
        const firstDigit = mobileNumber.charAt(0);
        if (!['6', '7', '8', '9'].includes(firstDigit)) {
            showError('Indian mobile numbers start with 6, 7, 8, or 9');
            return;
        }
        
        // Show loading and hide previous results/errors
        loading.style.display = 'block';
        result.style.display = 'none';
        error.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            checkIndianMobileLocation(mobileNumber);
        }, 1500);
    });
    
    function checkIndianMobileLocation(number) {
        loading.style.display = 'none';
        
        // Simulate success 80% of the time
        if (Math.random() < 0.8) {
            const mockData = generateIndianMockLocationData(number);
            displayIndianResult(mockData);
        } else {
            showError('Could not retrieve location information for this number. Please try again later.');
        }
    }
    
    function generateIndianMockLocationData(number) {
        // Indian telecom circles
        const circles = {
            'DEL': 'Delhi',
            'MU': 'Mumbai',
            'KA': 'Karnataka',
            'TN': 'Tamil Nadu',
            'AP': 'Andhra Pradesh',
            'TS': 'Telangana',
            'MH': 'Maharashtra',
            'UP': 'Uttar Pradesh',
            'WB': 'West Bengal',
            'GJ': 'Gujarat',
            'RJ': 'Rajasthan',
            'PB': 'Punjab',
            'HR': 'Haryana',
            'MP': 'Madhya Pradesh'
        };
        
        // Indian telecom operators with their number series
        const operators = [
            { name: 'Airtel', codes: ['98', '99', '96', '97'], logo: 'airtel.png' },
            { name: 'Jio', codes: ['70', '96', '97', '98'], logo: 'jio.png' },
            { name: 'Vodafone Idea', codes: ['95', '96', '97'], logo: 'vi.png' },
            { name: 'BSNL', codes: ['94', '95'], logo: 'bsnl.png' },
            { name: 'MTNL', codes: ['98', '99'], logo: 'mtnl.png' }
        ];
        
        // Determine operator based on first digits
        const firstTwoDigits = number.substring(0, 2);
        let operator = operators.find(op => op.codes.includes(firstTwoDigits)) || 
                      operators[Math.floor(Math.random() * operators.length)];
        
        // Determine circle randomly (or you could map first digits to circles)
        const circleCodes = Object.keys(circles);
        const circleCode = circleCodes[Math.floor(Math.random() * circleCodes.length)];
        const circle = circles[circleCode];
        
        // Major cities in each circle
        const cityMap = {
            'DEL': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad'],
            'MU': ['Mumbai', 'Thane', 'Navi Mumbai', 'Kalyan'],
            'KA': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
            'TN': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
            'AP': ['Hyderabad', 'Vishakapatnam', 'Vijayawada', 'Guntur'],
            'TS': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
            'MH': ['Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
            'UP': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
            'WB': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol'],
            'GJ': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
            'RJ': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
            'PB': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar'],
            'HR': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala'],
            'MP': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior']
        };
        
        const cities = cityMap[circleCode] || ['Unknown City'];
        const city = cities[Math.floor(Math.random() * cities.length)];
        
        return {
            number: number,
            operator: operator.name,
            operatorLogo: operator.logo,
            circle: circle,
            city: city,
            numberSeries: firstTwoDigits,
            isActive: Math.random() > 0.1,
            isPortable: Math.random() > 0.3
        };
    }
    
    function displayIndianResult(data) {
        result.innerHTML = `
            <h2><i class="fas fa-map-marker-alt"></i> Indian Mobile Number Details</h2>
            
            <div class="result-item">
                <div class="result-label">Mobile Number:</div>
                <div class="result-value">+91 ${data.number.substring(0, 5)} ${data.number.substring(5)}</div>
            </div>
            
            <div class="result-item">
                <div class="result-label">Operator:</div>
                <div class="result-value">
                    <img src="https://logo.clearbit.com/${data.operator.toLowerCase().replace(' ', '')}.com" 
                         class="operator-logo" alt="${data.operator} logo" onerror="this.style.display='none'">
                    ${data.operator}
                </div>
            </div>
            
            <div class="result-item">
                <div class="result-label">Telecom Circle:</div>
                <div class="result-value">${data.circle}</div>
            </div>
            
            <div class="result-item">
                <div class="result-label">City/Location:</div>
                <div class="result-value">${data.city}</div>
            </div>
            
            <div class="result-item">
                <div class="result-label">Number Series:</div>
                <div class="result-value">${data.numberSeries} series</div>
            </div>
            
            <div class="result-item">
                <div class="result-label">Number Status:</div>
                <div class="result-value">
                    ${data.isActive ? '<span style="color:green">Active</span>' : '<span style="color:red">Inactive</span>'}
                    ${data.isPortable ? ' (MNP Portable)' : ''}
                </div>
            </div>
            
            <div class="disclaimer" style="margin-top:15px; font-size:12px;">
                <i class="fas fa-exclamation-triangle"></i> This is simulated data for demonstration purposes only.
                <br>Real mobile number tracking requires access to telecom operator databases.
            </div>
        `;
        
        result.style.display = 'block';
    }
    
    function showError(message) {
        error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        error.style.display = 'block';
        resultContainer.style.display = 'block';
        loading.style.display = 'none';
    }
});
