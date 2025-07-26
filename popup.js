// Update header total emissions
function updateHeaderTotal() {
  chrome.storage.local.get(['purchase_history'], function(data) {
    const history = data.purchase_history || [];
    let grandTotalCO2 = 0;
    
    history.forEach(item => {
      grandTotalCO2 += item.co2 ? Number(item.co2) : 0;
    });
    
    const headerTotalEl = document.getElementById('headerTotalEmissions');
    if (headerTotalEl) {
      headerTotalEl.textContent = `${grandTotalCO2.toFixed(2)} kg CO₂`;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  
  // Update header total immediately
  updateHeaderTotal();
  
  // Load data immediately to prevent shaking
  loadPurchaseHistory();
  loadBrowsingLog();
  loadRecentChecks();
  
  // Product Checker functionality
  setupProductChecker();
  
  tabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
      // Remove active from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked tab and corresponding content
      tab.classList.add('active');
      contents[index].classList.add('active');
    });
  });
});

// Helper function to format date
function formatDate(ts) {
  try {
    console.log('Raw timestamp:', ts, 'Type:', typeof ts); // Debug log
    
    // Handle different timestamp formats
    let date;
    if (typeof ts === 'string') {
      // If it's a string, try to parse it
      if (ts.includes('-') || ts.includes('/')) {
        // Standard date string
        date = new Date(ts);
      } else {
        // Might be a timestamp string, try to convert to number
        const numTs = parseInt(ts);
        if (!isNaN(numTs)) {
          date = new Date(numTs);
        } else {
          date = new Date(ts);
        }
      }
    } else if (typeof ts === 'number') {
      // If it's a number, treat as timestamp
      date = new Date(ts);
    } else {
      // If it's already a Date object
      date = ts;
    }
    
    console.log('Parsed date:', date); // Debug log
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.log('Invalid date detected, returning Unknown Date'); // Debug log
      return 'Unknown Date';
    }
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  } catch (error) {
    console.error('Error formatting date:', error, 'Timestamp:', ts);
    return 'Unknown Date';
  }
}

// Load purchase history data
function loadPurchaseHistory() {
  chrome.storage.local.get(['purchase_history'], function(data) {
    const history = data.purchase_history || [];
    console.log('Purchase history data:', history); // Debug log
    
    // Calculate totals for stats cards
    let totalItems = history.length;
    let grandTotalCO2 = 0;
    
    history.forEach(item => {
      grandTotalCO2 += item.co2 ? Number(item.co2) : 0;
    });
    
    // Update stats cards
    const totalPurchasesEl = document.getElementById('totalPurchases');
    const totalCO2El = document.getElementById('totalCO2');
    const headerTotalEl = document.getElementById('headerTotalEmissions');
    
    if (totalPurchasesEl) totalPurchasesEl.textContent = totalItems;
    if (totalCO2El) totalCO2El.textContent = grandTotalCO2.toFixed(2);
    if (headerTotalEl) headerTotalEl.textContent = `${grandTotalCO2.toFixed(2)} kg CO₂`;
    
    // Generate purchase history HTML
    const historyContainer = document.getElementById('purchaseHistory');
    
    let html = '';
    if (!history.length) {
      html = '<p>No purchases logged yet.</p>';
    } else {
      // Group by timestamp (each purchase is an array)
      const grouped = {};
      history.forEach((item, index) => {
        console.log(`Item ${index}:`, item); // Debug log for each item
        // Use a fallback if timestamp is missing
        const timestamp = item.timestamp || Date.now();
        if (!grouped[timestamp]) grouped[timestamp] = [];
        grouped[timestamp].push(item);
      });
      
      Object.keys(grouped).sort((a,b)=>b-a).forEach(ts => {
        const items = grouped[ts];
        const date = formatDate(ts);
        console.log('Processing timestamp:', ts, 'Formatted date:', date); // Debug log
        
        // Capitalize platform name
        const platform = items[0].platform;
        const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
        
        html += `<div style="margin-bottom:15px;padding:10px;background:#f0f8f0;border-radius:8px;">`;
        html += `<div style="font-size:0.9em;color:#388e3c;font-weight:600;margin-bottom:5px;">${date} (${capitalizedPlatform})</div>`;
        html += '<ul style="margin:5px 0;padding-left:20px;">';
        let subtotal = 0;
        items.forEach(item => {
          html += `<li style="margin-bottom:3px;">${item.name} <span style="color:#d32f2f;font-weight:600;">${item.co2 ? item.co2 + ' kg' : 'N/A'}</span></li>`;
          subtotal += item.co2 ? Number(item.co2) : 0;
        });
        html += '</ul>';
        html += `<div style="font-size:0.9em;font-weight:600;margin-top:5px;">Subtotal: <span style="color:#d32f2f">${subtotal.toFixed(2)} kg CO₂</span></div>`;
        html += '</div>';
      });
    }
    
    if (historyContainer) {
      historyContainer.innerHTML = html;
    }
  });
}

// Load browsing log data
function loadBrowsingLog() {
  chrome.storage.local.get(null, function(data) {
    const container = document.querySelector('.tab-content:nth-child(3)');
    
    let html = '<h3>🌍 Browsing Emission Log</h3>';
    
    // Find all keys like browsing_domain_date
    const logs = Object.keys(data).filter(k => k.startsWith('browsing_')).map(k => {
      const [_, domain, date] = k.split('_');
      return { domain, date, ...data[k] };
    });
    
    if (!logs.length) {
      html += '<p>No browsing data yet.</p>';
    } else {
      // Group by date
      const byDate = {};
      logs.forEach(log => {
        if (!byDate[log.date]) byDate[log.date] = [];
        byDate[log.date].push(log);
      });
      
      Object.keys(byDate).sort((a,b)=>b.localeCompare(a)).forEach(date => {
        html += `<div style="margin-bottom:15px;padding:10px;background:#f0f8f0;border-radius:8px;">`;
        html += `<div style="font-size:0.9em;color:#388e3c;font-weight:600;margin-bottom:5px;">${date}</div>`;
        html += '<ul style="margin:5px 0;padding-left:20px;">';
        let total = 0;
        byDate[date].forEach(log => {
          html += `<li style="margin-bottom:3px;">${log.domain} <span style="color:#d32f2f;font-weight:600;">${log.co2} g</span> <span style="font-size:0.8em;color:#888">(${Math.round(log.seconds/60)} min)</span></li>`;
          total += log.co2 ? Number(log.co2) : 0;
        });
        html += '</ul>';
        html += `<div style="font-size:0.9em;font-weight:600;margin-top:5px;">Subtotal: <span style="color:#d32f2f">${total.toFixed(2)} g CO₂</span></div>`;
        html += '</div>';
      });
    }
    container.innerHTML = html;
  });
} 

// Setup Product Checker
function setupProductChecker() {
  const productInput = document.getElementById('productInput');
  const checkButton = document.getElementById('checkProduct');
  const resultDiv = document.getElementById('productResult');
  
  checkButton.addEventListener('click', async function() {
    const productName = productInput.value.trim();
    if (!productName) {
      alert('Please enter a product name');
      return;
    }
    
    // Show loading state
    checkButton.disabled = true;
    checkButton.textContent = 'Checking...';
    resultDiv.innerHTML = '<div style="text-align:center;color:#666;">Analyzing product...</div>';
    resultDiv.style.display = 'block';
    
    try {
      const result = await estimateCO2(productName);
      displayProductResult(productName, result);
      saveRecentCheck(productName, result);
    } catch (error) {
      console.error('Error estimating CO₂:', error);
      resultDiv.innerHTML = '<div style="color:#f44336;">Error: Could not estimate CO₂. Please try again.</div>';
    } finally {
      // Reset button state
      checkButton.disabled = false;
      checkButton.textContent = 'Check CO₂';
    }
  });
  
  // Allow Enter key to submit
  productInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !checkButton.disabled) {
      checkButton.click();
    }
  });
}

// CO₂ estimation function using Gemini AI directly
async function estimateCO2(productName) {
  // Directly use Gemini AI for all products
  try {
    console.log('Calling AI for product:', productName);
    const result = await callGeminiAI(productName);
    console.log('AI result:', result);
    return result;
  } catch (error) {
    console.error('Gemini AI error:', error);
    // If AI fails, return a better fallback based on the product name
    const searchTerm = productName.toLowerCase();
    let fallbackCo2 = 15.0;
    let fallbackReason = 'General product estimate';
    
    if (searchTerm.includes('cotton') && searchTerm.includes('shirt')) {
      fallbackCo2 = 8.5;
      fallbackReason = 'Based on cotton shirt data from database';
    } else if (searchTerm.includes('jeans')) {
      fallbackCo2 = 33.4;
      fallbackReason = 'Based on denim jeans data from database';
    } else if (searchTerm.includes('sweater') || searchTerm.includes('jumper')) {
      fallbackCo2 = 28.3;
      fallbackReason = 'Based on cotton sweater data from database';
    } else if (searchTerm.includes('dress')) {
      fallbackCo2 = 22.5;
      fallbackReason = 'Based on cotton dress data from database';
    } else if (searchTerm.includes('shoes') || searchTerm.includes('footwear')) {
      fallbackCo2 = 16.8;
      fallbackReason = 'Based on leather sneakers data from database';
    }
    
    return {
      found: false,
      co2: fallbackCo2,
      unit: 'item',
      source: 'Fallback (database match)',
      reasoning: fallbackReason,
      aiGenerated: false
    };
  }
}

// Find local match in our database
function findLocalMatch(productName) {
  const CO2_DATA = {
    "shopping_items": {
      "clothing_textiles": {
        "cotton_t_shirt": {"co2_per_item": 8.5, "unit": "item", "source": "Fashion LCA 2023"},
        "polyester_t_shirt": {"co2_per_item": 5.5, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_shirt_formal": {"co2_per_item": 12.3, "unit": "item", "source": "Fashion LCA 2023"},
        "silk_shirt": {"co2_per_item": 18.7, "unit": "item", "source": "Fashion LCA 2023"},
        "linen_shirt": {"co2_per_item": 9.2, "unit": "item", "source": "Fashion LCA 2023"},
        "wool_sweater": {"co2_per_item": 45.6, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_sweater": {"co2_per_item": 28.3, "unit": "item", "source": "Fashion LCA 2023"},
        "denim_jeans": {"co2_per_item": 33.4, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_trousers": {"co2_per_item": 15.8, "unit": "item", "source": "Fashion LCA 2023"},
        "polyester_trousers": {"co2_per_item": 12.1, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_dress": {"co2_per_item": 22.5, "unit": "item", "source": "Fashion LCA 2023"},
        "silk_saree": {"co2_per_item": 45.8, "unit": "item", "source": "Indian Textile 2023"},
        "cotton_saree": {"co2_per_item": 18.3, "unit": "item", "source": "Indian Textile 2023"},
        "synthetic_saree": {"co2_per_item": 12.7, "unit": "item", "source": "Indian Textile 2023"},
        "cotton_kurta": {"co2_per_item": 14.2, "unit": "item", "source": "Indian Textile 2023"},
        "silk_kurta": {"co2_per_item": 28.5, "unit": "item", "source": "Indian Textile 2023"},
        "cotton_salwar": {"co2_per_item": 11.8, "unit": "item", "source": "Indian Textile 2023"},
        "cotton_dupatta": {"co2_per_item": 6.5, "unit": "item", "source": "Indian Textile 2023"},
        "leather_jacket": {"co2_per_item": 89.5, "unit": "item", "source": "Fashion LCA 2023"},
        "denim_jacket": {"co2_per_item": 42.8, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_underwear": {"co2_per_item": 2.1, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_bra": {"co2_per_item": 3.8, "unit": "item", "source": "Fashion LCA 2023"},
        "cotton_socks": {"co2_per_pair": 1.9, "unit": "pair", "source": "Fashion LCA 2023"},
        "wool_socks": {"co2_per_pair": 4.2, "unit": "pair", "source": "Fashion LCA 2023"},
        "cotton_pajamas": {"co2_per_set": 8.9, "unit": "set", "source": "Fashion LCA 2023"},
        "silk_nightwear": {"co2_per_set": 18.5, "unit": "set", "source": "Fashion LCA 2023"}
      },
      "footwear": {
        "leather_formal_shoes": {"co2_per_pair": 19.2, "unit": "pair", "source": "Footwear LCA 2023"},
        "canvas_sneakers": {"co2_per_pair": 14.0, "unit": "pair", "source": "Footwear LCA 2023"},
        "leather_sneakers": {"co2_per_pair": 16.8, "unit": "pair", "source": "Footwear LCA 2023"},
        "running_shoes": {"co2_per_pair": 18.3, "unit": "pair", "source": "Footwear LCA 2023"},
        "sandals_leather": {"co2_per_pair": 12.5, "unit": "pair", "source": "Footwear LCA 2023"},
        "flip_flops_rubber": {"co2_per_pair": 3.8, "unit": "pair", "source": "Footwear LCA 2023"},
        "boots_leather": {"co2_per_pair": 28.4, "unit": "pair", "source": "Footwear LCA 2023"},
        "high_heels": {"co2_per_pair": 22.1, "unit": "pair", "source": "Footwear LCA 2023"},
        "flats_leather": {"co2_per_pair": 15.3, "unit": "pair", "source": "Footwear LCA 2023"},
        "sports_shoes": {"co2_per_pair": 19.8, "unit": "pair", "source": "Footwear LCA 2023"},
        "crocs": {"co2_per_pair": 5.2, "unit": "pair", "source": "Footwear LCA 2023"},
        "slippers_home": {"co2_per_pair": 2.1, "unit": "pair", "source": "Footwear LCA 2023"}
      },
      "electronics_appliances": {
        "smartphone_basic": {"co2_per_unit": 89.5, "unit": "unit", "source": "ICT LCA 2024"},
        "smartphone_premium": {"co2_per_unit": 156.8, "unit": "unit", "source": "ICT LCA 2024"},
        "tablet_7inch": {"co2_per_unit": 145.2, "unit": "unit", "source": "ICT LCA 2024"},
        "tablet_10inch": {"co2_per_unit": 189.7, "unit": "unit", "source": "ICT LCA 2024"},
        "laptop_basic": {"co2_per_unit": 450.2, "unit": "unit", "source": "ICT LCA 2024"},
        "laptop_gaming": {"co2_per_unit": 789.5, "unit": "unit", "source": "ICT LCA 2024"},
        "desktop_pc": {"co2_per_unit": 623.8, "unit": "unit", "source": "ICT LCA 2024"},
        "monitor_24inch": {"co2_per_unit": 234.5, "unit": "unit", "source": "ICT LCA 2024"},
        "monitor_32inch": {"co2_per_unit": 356.7, "unit": "unit", "source": "Electronics LCA 2024"},
        "led_tv_32inch": {"co2_per_unit": 320.5, "unit": "unit", "source": "Electronics LCA 2024"},
        "led_tv_43inch": {"co2_per_unit": 445.3, "unit": "unit", "source": "Electronics LCA 2024"},
        "led_tv_55inch": {"co2_per_unit": 612.8, "unit": "unit", "source": "Electronics LCA 2024"},
        "oled_tv_55inch": {"co2_per_unit": 798.4, "unit": "unit", "source": "Electronics LCA 2024"},
        "refrigerator_single_door": {"co2_per_unit": 892.3, "unit": "unit", "source": "Appliance LCA 2024"},
        "refrigerator_double_door": {"co2_per_unit": 1245.7, "unit": "unit", "source": "Appliance LCA 2024"},
        "washing_machine_semi": {"co2_per_unit": 456.2, "unit": "unit", "source": "Appliance LCA 2024"},
        "washing_machine_auto": {"co2_per_unit": 542.3, "unit": "unit", "source": "Appliance LCA 2024"},
        "microwave_oven": {"co2_per_unit": 234.8, "unit": "unit", "source": "Appliance LCA 2024"},
        "air_conditioner_1ton": {"co2_per_unit": 678.9, "unit": "unit", "source": "Appliance LCA 2024"},
        "air_conditioner_1_5ton": {"co2_per_unit": 823.4, "unit": "unit", "source": "Appliance LCA 2024"},
        "ceiling_fan": {"co2_per_unit": 45.6, "unit": "unit", "source": "Appliance LCA 2024"},
        "table_fan": {"co2_per_unit": 28.3, "unit": "unit", "source": "Appliance LCA 2024"},
        "mixer_grinder": {"co2_per_unit": 67.8, "unit": "unit", "source": "Appliance LCA 2024"},
        "electric_kettle": {"co2_per_unit": 23.4, "unit": "unit", "source": "Appliance LCA 2024"},
        "rice_cooker": {"co2_per_unit": 34.5, "unit": "unit", "source": "Appliance LCA 2024"},
        "iron": {"co2_per_unit": 18.7, "unit": "unit", "source": "Appliance LCA 2024"},
        "hair_dryer": {"co2_per_unit": 12.8, "unit": "unit", "source": "Appliance LCA 2024"},
        "vacuum_cleaner": {"co2_per_unit": 89.4, "unit": "unit", "source": "Appliance LCA 2024"}
      },
      "personal_care": {
        "shampoo_250ml": {"co2_per_bottle": 0.85, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "shampoo_500ml": {"co2_per_bottle": 1.42, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "conditioner_250ml": {"co2_per_bottle": 0.92, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "body_wash_250ml": {"co2_per_bottle": 0.78, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "soap_bar": {"co2_per_bar": 0.42, "unit": "bar", "source": "Cosmetics LCA 2023"},
        "face_wash_100ml": {"co2_per_tube": 0.65, "unit": "tube", "source": "Cosmetics LCA 2023"},
        "moisturizer_100ml": {"co2_per_bottle": 0.89, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "sunscreen_100ml": {"co2_per_bottle": 1.12, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "toothpaste_100g": {"co2_per_tube": 0.73, "unit": "tube", "source": "Cosmetics LCA 2023"},
        "toothbrush": {"co2_per_piece": 0.18, "unit": "piece", "source": "Cosmetics LCA 2023"},
        "mouthwash_250ml": {"co2_per_bottle": 0.54, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "deodorant_spray": {"co2_per_bottle": 1.25, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "deodorant_roll": {"co2_per_bottle": 0.98, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "perfume_50ml": {"co2_per_bottle": 2.34, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "cologne_100ml": {"co2_per_bottle": 3.45, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "lipstick": {"co2_per_piece": 0.67, "unit": "piece", "source": "Cosmetics LCA 2023"},
        "foundation": {"co2_per_bottle": 1.23, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "mascara": {"co2_per_tube": 0.89, "unit": "tube", "source": "Cosmetics LCA 2023"},
        "eyeliner": {"co2_per_piece": 0.45, "unit": "piece", "source": "Cosmetics LCA 2023"},
        "nail_polish": {"co2_per_bottle": 0.34, "unit": "bottle", "source": "Cosmetics LCA 2023"},
        "shaving_cream": {"co2_per_tube": 0.76, "unit": "tube", "source": "Cosmetics LCA 2023"},
        "razor_disposable": {"co2_per_piece": 0.12, "unit": "piece", "source": "Cosmetics LCA 2023"},
        "razor_electric": {"co2_per_unit": 23.4, "unit": "unit", "source": "Appliance LCA 2024"}
      },
      "household_items": {
        "detergent_powder_1kg": {"co2_per_kg": 2.1, "unit": "kg", "source": "Household LCA 2023"},
        "detergent_liquid_1l": {"co2_per_liter": 2.3, "unit": "liter", "source": "Household LCA 2023"},
        "fabric_softener_1l": {"co2_per_liter": 1.8, "unit": "liter", "source": "Household LCA 2023"},
        "dish_soap_500ml": {"co2_per_bottle": 0.89, "unit": "bottle", "source": "Household LCA 2023"},
        "floor_cleaner_1l": {"co2_per_bottle": 1.45, "unit": "bottle", "source": "Household LCA 2023"},
        "toilet_cleaner_500ml": {"co2_per_bottle": 1.23, "unit": "bottle", "source": "Household LCA 2023"},
        "glass_cleaner_500ml": {"co2_per_bottle": 0.98, "unit": "bottle", "source": "Household LCA 2023"},
        "air_freshener": {"co2_per_bottle": 1.56, "unit": "bottle", "source": "Household LCA 2023"},
        "toilet_paper_4roll": {"co2_per_pack": 3.8, "unit": "pack", "source": "Paper LCA 2024"},
        "tissue_paper_100sheet": {"co2_per_pack": 1.2, "unit": "pack", "source": "Paper LCA 2024"},
        "kitchen_towel": {"co2_per_roll": 0.95, "unit": "roll", "source": "Paper LCA 2024"},
        "aluminum_foil": {"co2_per_roll": 2.3, "unit": "roll", "source": "Packaging LCA 2024"},
        "cling_wrap": {"co2_per_roll": 1.8, "unit": "roll", "source": "Packaging LCA 2024"},
        "garbage_bags_30pc": {"co2_per_pack": 1.2, "unit": "pack", "source": "Packaging LCA 2024"},
        "plastic_containers_set": {"co2_per_set": 4.5, "unit": "set", "source": "Plastic LCA 2024"},
        "glass_containers_set": {"co2_per_set": 6.8, "unit": "set", "source": "Glass LCA 2024"},
        "steel_utensils_set": {"co2_per_set": 12.3, "unit": "set", "source": "Metal LCA 2024"},
        "non_stick_pan": {"co2_per_piece": 8.9, "unit": "piece", "source": "Cookware LCA 2024"},
        "pressure_cooker_3l": {"co2_per_unit": 15.4, "unit": "unit", "source": "Cookware LCA 2024"},
        "dinner_plates_set": {"co2_per_set": 7.6, "unit": "set", "source": "Ceramic LCA 2024"},
        "bed_sheets_cotton": {"co2_per_set": 12.8, "unit": "set", "source": "Home Textile 2023"},
        "pillow_cotton": {"co2_per_piece": 4.5, "unit": "piece", "source": "Home Textile 2023"},
        "blanket_cotton": {"co2_per_piece": 18.7, "unit": "piece", "source": "Home Textile 2023"},
        "curtains_cotton": {"co2_per_pair": 15.3, "unit": "pair", "source": "Home Textile 2023"}
      }
    }
  };

  const searchTerm = productName.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  // Search through all categories
  Object.keys(CO2_DATA.shopping_items).forEach(category => {
    Object.keys(CO2_DATA.shopping_items[category]).forEach(itemKey => {
      const itemName = itemKey.replace(/_/g, ' ');
      const itemData = CO2_DATA.shopping_items[category][itemKey];
      
      // Check if search term contains item keywords
      const keywords = itemName.split(' ');
      let score = 0;
      keywords.forEach(keyword => {
        if (searchTerm.includes(keyword) && keyword.length > 2) {
          score += keyword.length;
        }
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = { name: itemName, data: itemData, category: category };
      }
    });
  });

  if (bestMatch && bestScore > 3) {
    return {
      found: true,
      name: bestMatch.name,
      co2: bestMatch.data.co2_per_item || bestMatch.data.co2_per_pair || bestMatch.data.co2_per_unit || bestMatch.data.co2_per_bottle || bestMatch.data.co2_per_bar || bestMatch.data.co2_per_tube || bestMatch.data.co2_per_piece || bestMatch.data.co2_per_kg || bestMatch.data.co2_per_liter || bestMatch.data.co2_per_pack || bestMatch.data.co2_per_roll || bestMatch.data.co2_per_set,
      unit: bestMatch.data.unit,
      source: bestMatch.data.source,
      category: bestMatch.category
    };
  }
  
  return null; // No local match found
}

// Call Gemini AI for CO₂ estimation
async function callGeminiAI(productName) {
  const API_KEY = 'AIzaSyA83gnEatNdJbm3otgVvyNOvNqV9_I9bG8';
  
  const prompt = `Product: "${productName}"

Give me the CO2 emission for this product in this exact JSON format only:
{
  "co2": [NUMBER],
  "unit": "item",
  "confidence": "high|medium|low",
  "reasoning": "brief explanation",
  "source": "estimation method"
}`;

  console.log('Sending prompt to AI:', prompt);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.log('No candidates in response');
      throw new Error('No AI response candidates');
    }
    
    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log('AI Response text:', aiResponse);
    
    if (!aiResponse || typeof aiResponse !== 'string') {
      console.log('Invalid AI response text');
      throw new Error('Invalid AI response text');
    }
    
    // Try to extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const result = JSON.parse(jsonMatch[0]);
        console.log('Parsed JSON result:', result);
        
        // Validate the result
        if (result.co2 && typeof result.co2 === 'number' && result.unit) {
          return {
            found: false,
            co2: result.co2,
            unit: result.unit,
            source: `Gemini AI (${result.confidence || 'medium'} confidence)`,
            reasoning: result.reasoning || 'AI analysis',
            aiGenerated: true
          };
        } else {
          console.log('Invalid AI result - missing co2 or unit:', result);
          throw new Error('Invalid AI result format');
        }
      } catch (parseError) {
        console.log('JSON parse error:', parseError);
        throw new Error('Failed to parse AI JSON response');
      }
    } else {
      console.log('No JSON found in AI response');
      throw new Error('No JSON in AI response');
    }
    
  } catch (error) {
    console.error('Gemini AI call failed:', error);
    throw error;
  }
}

// Display product result
function displayProductResult(productName, result) {
  const resultDiv = document.getElementById('productResult');
  
  let html = `<div style="font-weight:600;margin-bottom:8px;">${productName}</div>`;
  
  if (result.aiGenerated) {
    // AI-generated result (primary)
    const co2Value = result.co2 || 'Unknown';
    html += `<div style="color:#d32f2f;font-weight:600;font-size:1.1em;">${co2Value} kg CO₂ per ${result.unit || 'item'}</div>`;
    html += `<div style="font-size:0.8em;color:#666;">Reasoning: ${result.reasoning || 'AI analysis'}</div>`;
  } else if (result.found) {
    // Local database match (fallback)
    const co2Value = result.co2 || 'Unknown';
    html += `<div style="color:#d32f2f;font-weight:600;font-size:1.1em;">${co2Value} kg CO₂ per ${result.unit || 'item'}</div>`;
    html += `<div style="font-size:0.8em;color:#666;">Category: ${result.category ? result.category.replace(/_/g, ' ') : 'Unknown'}</div>`;
  } else {
    // Basic fallback estimate
    const co2Value = result.co2 || result.estimated || 'Unknown';
    html += `<div style="color:#ff9800;font-weight:600;font-size:1.1em;">~${co2Value} kg CO₂ per ${result.unit || 'item'}</div>`;
    html += `<div style="font-size:0.8em;color:#666;">${result.reasoning || 'Fallback estimate'}</div>`;
  }
  
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
}

// Save recent check
function saveRecentCheck(productName, result) {
  chrome.storage.local.get(['recent_checks'], function(data) {
    const recentChecks = data.recent_checks || [];
    const co2Value = result.found ? result.co2 : (result.co2 || result.estimated || 0);
    const newCheck = {
      product: productName,
      co2: co2Value,
      unit: result.unit || 'item',
      timestamp: Date.now(),
      found: result.found || false
    };
    
    // Add to beginning and keep only last 10
    recentChecks.unshift(newCheck);
    if (recentChecks.length > 10) {
      recentChecks.pop();
    }
    
    chrome.storage.local.set({ recent_checks: recentChecks }, function() {
      loadRecentChecks();
    });
  });
}

// Load recent checks
function loadRecentChecks() {
  chrome.storage.local.get(['recent_checks'], function(data) {
    const recentChecks = data.recent_checks || [];
    const container = document.getElementById('recentChecksList');
    
    if (recentChecks.length === 0) {
      container.innerHTML = 'No recent searches';
      container.className = 'empty';
      return;
    }
    
    // Remove empty class if it exists
    container.className = '';
    
    let html = '';
    recentChecks.forEach((check, index) => {
      const date = formatDate(check.timestamp);
      const co2Value = check.co2 || 0;
      const co2Text = check.found ? `${co2Value} kg` : `~${co2Value} kg`;
      
      html += `<div class="recent-search-item" onclick="fillProductInput('${check.product.replace(/'/g, "\\'")}')">` ;
      html += `  <div class="search-query">${check.product || 'Unknown Product'}</div>`;
      html += `  <div class="search-result">${co2Text} CO₂ per ${check.unit || 'item'}</div>`;
      html += '</div>';
    });
    
    container.innerHTML = html;
  });
}

// Fill product input when clicking on recent search
function fillProductInput(productName) {
  const input = document.getElementById('productInput');
  if (input) {
    input.value = productName;
    input.focus();
  }
} 