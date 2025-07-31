console.log('[CarbonBuddy] Content script loaded!');

// Debug function to log errors
function debugLog(message, data = null) {
  console.log(`[CarbonBuddy Debug] ${message}`, data);
}

// --- CO2 Data ---
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

// --- Page Detection ---
function isAmazonProductPage() {
  return window.location.hostname.includes('amazon.') && !!document.querySelector('#productTitle');
}
function isAmazonCartPage() {
  return window.location.hostname.includes('amazon.') && window.location.pathname.includes('/cart');
}
function isFlipkartProductPage() {
  return window.location.hostname.includes('flipkart.') && !!document.querySelector('.VU-ZEz');
}
function isFlipkartCartPage() {
  return window.location.hostname.includes('flipkart.') && window.location.pathname.includes('/viewcart');
}

function extractAmazonProductName() {
  return document.querySelector('#productTitle')?.innerText.trim();
}
function extractFlipkartProductName() {
  return document.querySelector('.VU-ZEz')?.innerText.trim();
}
function extractAmazonCartItems() {
  // Only get product names inside actual product links in the cart
  return Array.from(document.querySelectorAll('a.sc-product-link .a-truncate-full.a-offscreen'))
    .map(e => e.innerText.trim())
    .filter(Boolean);
}
function extractFlipkartCartItems() {
  // Only include products that are in the cart (not 'Save for later')
  // Find all product links
  const productLinks = Array.from(document.querySelectorAll('a.T2CNXf.QqLTQ-'));
  return productLinks.filter(link => {
    // Find the closest product container
    const container = link.closest('.cPHDOP.col-12-12');
    if (!container) return false;
    // Get all action buttons/texts in this container
    const actions = Array.from(container.querySelectorAll('.sBxzFz')).map(e => e.textContent.trim().toLowerCase());
    // If it has 'move to cart', it's a save for later product (skip)
    // If it has 'save for later', it's a cart product (include)
    if (actions.includes('move to cart')) return false;
    if (actions.includes('save for later')) return true;
    // Fallback: if neither, include (to not miss anything)
    return true;
  }).map(link => link.textContent.trim()).filter(Boolean);
}

// --- CO2 Estimation ---
function estimateCO2(productName) {
  try {
    debugLog('Estimating CO2 for product:', productName);
    
    // Lowercase, simple match against keys in CO2_DATA
    const name = productName.toLowerCase();
    debugLog('Searching for:', name);
    
    for (const category in CO2_DATA.shopping_items) {
      for (const key in CO2_DATA.shopping_items[category]) {
        if (name.includes(key.replace(/_/g, ' '))) {
          const item = CO2_DATA.shopping_items[category][key];
          // Find the first co2_per_* property
          const co2Key = Object.keys(item).find(k => k.startsWith('co2_per_'));
          const result = { co2: item[co2Key], unit: item.unit, source: item.source, key };
          debugLog('Found match:', result);
          return result;
        }
      }
    }
    
    debugLog('No match found for:', productName);
    return null;
  } catch (error) {
    console.error('[CarbonBuddy] Error in estimateCO2:', error);
    return null;
  }
}

// --- CO2 Dataset Loading ---
let co2Dataset = null;

async function loadCO2Dataset() {
  if (co2Dataset) return co2Dataset;
  
  try {
    const response = await fetch(chrome.runtime.getURL('co2_data.json'));
    co2Dataset = await response.json();
    console.log('[CarbonBuddy] CO2 dataset loaded successfully');
    return co2Dataset;
  } catch (error) {
    console.error('[CarbonBuddy] Failed to load CO2 dataset:', error);
    return null;
  }
}

// --- AI Integration ---
async function getAIEstimation(productName) {
  console.log('[CarbonBuddy] AI Function called with:', productName);
  
  if (!productName) {
    console.log('[CarbonBuddy] No product name provided');
    return null;
  }

  try {
    // Load dataset first
    const dataset = await loadCO2Dataset();
    if (!dataset) {
      console.error('[CarbonBuddy] Dataset not available');
      return null;
    }
    
    // Call Gemini AI with dataset as reference
    const result = await callGeminiAIWithDataset(productName, dataset);
    console.log('[CarbonBuddy] Gemini AI result:', result);
    
    return result;
  } catch (error) {
    console.error('[CarbonBuddy] AI estimation failed:', error);
    return null;
  }
}

// Call Gemini AI with dataset reference
async function callGeminiAIWithDataset(productName, dataset) {
  const API_KEY = 'AIzaSyA83gnEatNdJbm3otgVvyNOvNqV9_I9bG8'; // Replace with your API key
  
  const prompt = `I am providing you with a comprehensive CO₂ emissions dataset for reference. Please analyze the product name and provide accurate CO₂ emission estimate.

**REFERENCE DATASET:**
${JSON.stringify(dataset, null, 2)}

**PRODUCT TO ANALYZE:** "${productName}"

**INSTRUCTIONS:**
1. Use the provided dataset as reference to find similar products
2. Match the product with the most appropriate category from the dataset
3. Provide accurate CO₂ emission estimate based on dataset patterns
4. If exact match not found, use similar products from dataset as reference
5. Provide confidence level based on how well the product matches dataset items

**REQUIRED JSON RESPONSE FORMAT:**
{
  "co2": [NUMBER],
  "unit": "kg",
  "key": "[category_from_dataset]",
  "source": "Gemini AI with Dataset Reference",
  "confidence": "high|medium|low",
  "reasoning": "Brief explanation of estimation method"
}

**RESPOND ONLY WITH VALID JSON - NO OTHER TEXT**`;

  console.log('[CarbonBuddy] Sending request to Gemini AI with dataset...');

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

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[CarbonBuddy] Gemini API response:', data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiText = data.candidates[0].content.parts[0].text;
      console.log('[CarbonBuddy] AI response text:', aiText);
      
      // Extract JSON from response
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const result = JSON.parse(jsonMatch[0]);
          console.log('[CarbonBuddy] Parsed AI result:', result);
          
          if (result.co2 && result.unit) {
            return {
              co2: result.co2,
              unit: result.unit || 'kg',
              key: result.key || 'ai_estimated',
              source: result.source || 'Gemini AI with Dataset',
              confidence: result.confidence || 'medium',
              reasoning: result.reasoning || 'AI analysis with dataset reference'
            };
          } else {
            console.log('[CarbonBuddy] Invalid AI result - missing co2 or unit:', result);
            throw new Error('Invalid AI result format');
          }
        } catch (parseError) {
          console.log('[CarbonBuddy] JSON parse error:', parseError);
          throw new Error('Failed to parse AI JSON response');
        }
      } else {
        console.log('[CarbonBuddy] No JSON found in AI response');
        throw new Error('No JSON in AI response');
      }
    } else {
      console.log('[CarbonBuddy] No content in AI response');
      throw new Error('No content in AI response');
    }
    
  } catch (error) {
    console.error('[CarbonBuddy] Gemini AI call failed:', error);
    throw error;
  }
}

// --- Batch AI Estimation for Cart Items ---
async function getBatchAIEstimation(productNames) {
  console.log('[CarbonBuddy] Batch AI Function called with:', productNames);
  
  if (!productNames || !Array.isArray(productNames) || productNames.length === 0) {
    console.log('[CarbonBuddy] No product names provided');
    return [];
  }
  
  try {
    // Load dataset first
    const dataset = await loadCO2Dataset();
    if (!dataset) {
      console.error('[CarbonBuddy] Dataset not available');
      return [];
    }
    
    // Call Gemini AI with all products in single batch
    const result = await callGeminiBatchAI(productNames, dataset);
    console.log('[CarbonBuddy] Batch AI result:', result);
    
    return result;
  } catch (error) {
    console.error('[CarbonBuddy] Batch AI estimation failed:', error);
    return [];
  }
}

// Call Gemini AI for batch processing of cart items
async function callGeminiBatchAI(productNames, dataset) {
  const API_KEY = 'AIzaSyA83gnEatNdJbm3otgVvyNOvNqV9_I9bG8'; // Replace with your API key
  
  const prompt = `I am providing you with a comprehensive CO₂ emissions dataset for reference. Please analyze ALL the products in the cart and provide accurate CO₂ emission estimates for each.

**REFERENCE DATASET:**
${JSON.stringify(dataset, null, 2)}

**CART PRODUCTS TO ANALYZE:**
${productNames.map((name, index) => `${index + 1}. "${name}"`).join('\n')}

**INSTRUCTIONS:**
1. Use the provided dataset as reference to find similar products for each item
2. Match each product with the most appropriate category from the dataset
3. Provide accurate CO₂ emission estimates based on dataset patterns
4. If exact match not found, use similar products from dataset as reference
5. Maintain the same order as input products
6. Provide confidence level for each estimate

**REQUIRED JSON RESPONSE FORMAT:**
[
  {
    "name": "product_name_1",
    "co2": [NUMBER],
    "unit": "kg",
    "key": "[category_from_dataset]",
    "source": "Gemini AI with Dataset Reference",
    "confidence": "high|medium|low"
  },
  {
    "name": "product_name_2",
    "co2": [NUMBER],
    "unit": "kg", 
    "key": "[category_from_dataset]",
    "source": "Gemini AI with Dataset Reference",
    "confidence": "high|medium|low"
  }
]

**RESPOND ONLY WITH VALID JSON ARRAY - NO OTHER TEXT**
**ENSURE ARRAY HAS ${productNames.length} ITEMS IN SAME ORDER**`;

  console.log('[CarbonBuddy] Sending batch request to Gemini AI...');

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

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[CarbonBuddy] Gemini batch API response:', data);

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiText = data.candidates[0].content.parts[0].text;
      console.log('[CarbonBuddy] AI batch response text:', aiText);
      
      // Extract JSON array from response
      const jsonMatch = aiText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          const results = JSON.parse(jsonMatch[0]);
          console.log('[CarbonBuddy] Parsed batch AI results:', results);
          
          if (Array.isArray(results) && results.length === productNames.length) {
            return results.map(result => ({
              name: result.name || 'Unknown Product',
              co2: result.co2 || 2.0,
              unit: result.unit || 'kg',
              key: result.key || 'ai_estimated',
              source: result.source || 'Gemini AI Batch',
              confidence: result.confidence || 'medium'
            }));
          } else {
            console.log('[CarbonBuddy] Invalid batch result - wrong array length:', results.length, 'expected:', productNames.length);
            throw new Error('Invalid batch result format');
          }
        } catch (parseError) {
          console.log('[CarbonBuddy] Batch JSON parse error:', parseError);
          throw new Error('Failed to parse batch AI JSON response');
        }
      } else {
        console.log('[CarbonBuddy] No JSON array found in batch AI response');
        throw new Error('No JSON array in batch AI response');
      }
    } else {
      console.log('[CarbonBuddy] No content in batch AI response');
      throw new Error('No content in batch AI response');
    }
    
  } catch (error) {
    console.error('[CarbonBuddy] Gemini batch AI call failed:', error);
    throw error;
  }
}

// Calculate match score between product name and dataset item
function calculateMatchScore(productName, itemKey, description, category) {
  let score = 0;
  const productWords = productName.split(/\s+/);
  const itemWords = itemKey.replace(/_/g, ' ').split(/\s+/);
  const descWords = description.toLowerCase().split(/\s+/);
  const categoryWords = category.split(/\s+/);
  
  // Direct keyword matches in item key (highest weight)
  for (const productWord of productWords) {
    for (const itemWord of itemWords) {
      if (productWord.includes(itemWord) || itemWord.includes(productWord)) {
        score += 0.4;
      }
    }
  }
  
  // Matches in description (medium weight)
  for (const productWord of productWords) {
    for (const descWord of descWords) {
      if (productWord.includes(descWord) || descWord.includes(productWord)) {
        score += 0.2;
      }
    }
  }
  
  // Category matches (lower weight)
  for (const productWord of productWords) {
    for (const categoryWord of categoryWords) {
      if (productWord.includes(categoryWord) || categoryWord.includes(productWord)) {
        score += 0.1;
      }
    }
  }
  
  return Math.min(score, 1.0); // Cap at 1.0
}

// Get category-based estimation when no specific item matches
function getCategoryEstimation(productName, dataset) {
  const categoryAverages = {
    electronics: 150,
    clothing: 15,
    books: 3,
    food: 8,
    furniture: 90,
    toys: 6,
    home_appliances: 200,
    beauty_personal_care: 3,
    sports_fitness: 25,
    automotive: 65
  };
  
  // Try to match to a category
  for (const [category, avgCO2] of Object.entries(categoryAverages)) {
    if (productName.includes(category.replace('_', ' ')) || 
        productName.includes(category) ||
        matchesCategoryKeywords(productName, category)) {
      return {
        co2: avgCO2,
        unit: 'kg',
        key: category,
        source: 'AI Category Estimation',
        confidence: 'medium'
      };
    }
  }
  
  // Default fallback
  return {
    co2: 5.0,
    unit: 'kg',
    key: 'general_product',
    source: 'AI Default Estimation',
    confidence: 'low'
  };
}

// Check if product matches category-specific keywords
function matchesCategoryKeywords(productName, category) {
  const keywords = {
    electronics: ['phone', 'laptop', 'computer', 'tablet', 'tv', 'camera', 'headphone', 'speaker', 'console', 'device'],
    clothing: ['shirt', 'pants', 'dress', 'jacket', 'shoes', 'hat', 'socks', 'underwear', 'jeans', 'sweater'],
    books: ['book', 'novel', 'textbook', 'magazine', 'journal', 'notebook', 'diary'],
    food: ['food', 'snack', 'drink', 'beverage', 'meal', 'ingredient', 'grocery'],
    furniture: ['chair', 'table', 'sofa', 'bed', 'desk', 'shelf', 'cabinet', 'wardrobe'],
    toys: ['toy', 'game', 'puzzle', 'doll', 'action figure', 'board game', 'lego'],
    home_appliances: ['refrigerator', 'washing machine', 'microwave', 'vacuum', 'blender', 'toaster'],
    beauty_personal_care: ['shampoo', 'soap', 'perfume', 'makeup', 'cosmetic', 'skincare'],
    sports_fitness: ['fitness', 'exercise', 'sport', 'gym', 'yoga', 'running', 'workout'],
    automotive: ['car', 'auto', 'vehicle', 'tire', 'battery', 'oil', 'parts']
  };
  
  const categoryKeywords = keywords[category] || [];
  return categoryKeywords.some(keyword => productName.includes(keyword));
}

// Fallback function when dataset loading fails
function getFallbackEstimation(productName) {
  const lowerName = productName.toLowerCase();
  
  if (lowerName.includes('electronics') || lowerName.includes('phone') || lowerName.includes('laptop')) {
    return { co2: 150, unit: 'kg', key: 'electronics', source: 'Fallback Estimation', confidence: 'medium' };
  } else if (lowerName.includes('clothing') || lowerName.includes('shirt') || lowerName.includes('dress')) {
    return { co2: 15, unit: 'kg', key: 'clothing', source: 'Fallback Estimation', confidence: 'medium' };
  } else if (lowerName.includes('book')) {
    return { co2: 3, unit: 'kg', key: 'books', source: 'Fallback Estimation', confidence: 'medium' };
  } else if (lowerName.includes('food') || lowerName.includes('snack')) {
    return { co2: 8, unit: 'kg', key: 'food', source: 'Fallback Estimation', confidence: 'medium' };
  } else {
    return { co2: 5, unit: 'kg', key: 'general_product', source: 'Fallback Estimation', confidence: 'low' };
  }
}

// --- Badge UI ---
let badgeTimeout = null;
function showFloatingBadge(text, autoHide = true, hasAIValue = false) {
  let badge = document.getElementById('carbonbuddy-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'carbonbuddy-badge';
    badge.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(76, 175, 80, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      font-weight: 600;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 320px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    // Add CSS animation keyframes
    if (!document.getElementById('carbonbuddy-styles')) {
      const style = document.createElement('style');
      style.id = 'carbonbuddy-styles';
      style.textContent = `
        @keyframes slideInUp {
          from {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        #carbonbuddy-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(76, 175, 80, 0.4), 0 4px 16px rgba(0, 0, 0, 0.15);
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(badge);
  }
  
  // Always clear and rebuild badge content
  badge.innerHTML = '';
  
  // Add icon
  const icon = document.createElement('span');
  icon.innerHTML = '🌱';
  icon.style.fontSize = '18px';
  badge.appendChild(icon);
  
  // Add text
  const textNode = document.createElement('span');
  textNode.innerHTML = text;
  textNode.style.flex = '1';
  textNode.style.lineHeight = '1.4';
  badge.appendChild(textNode);
  
  // Add close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    margin-left: 8px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    opacity: 0.8;
    transition: all 0.2s ease;
    padding: 2px 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  `;
  closeBtn.onmouseover = () => {
    closeBtn.style.opacity = '1';
    closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.style.transform = 'scale(1.1)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.opacity = '0.8';
    closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    closeBtn.style.transform = 'scale(1)';
  };
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    badge.style.animation = 'slideInUp 0.3s reverse';
    setTimeout(() => {
      badge.remove();
    }, 300);
    if (badgeTimeout) clearTimeout(badgeTimeout);
  };
  badge.appendChild(closeBtn);
  
  // Auto-hide functionality
  if (badgeTimeout) clearTimeout(badgeTimeout);
  if (autoHide && !hasAIValue) {
    badgeTimeout = setTimeout(() => {
      badge.style.animation = 'slideInUp 0.3s reverse';
      setTimeout(() => {
        badge.remove();
      }, 300);
    }, 6000);
  }
}

// --- Cart Popup UI ---
function showCartPopup(items, platform) {
  try {
    console.log('[CarbonBuddy] showCartPopup called for platform:', platform, 'items:', items.length);
    
    // Remove existing popup and backdrop if any
    let existingPopup = document.getElementById('carbonbuddy-cart-popup');
    let existingBackdrop = document.getElementById('carbonbuddy-cart-backdrop');
    let existingLoading = document.getElementById('carbonbuddy-cart-loading');
    let existingLoadingBackdrop = document.getElementById('carbonbuddy-cart-loading-backdrop');
    
    if (existingPopup) existingPopup.remove();
    if (existingBackdrop) existingBackdrop.remove();
    if (existingLoading) existingLoading.remove();
    if (existingLoadingBackdrop) existingLoadingBackdrop.remove();

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items array:', items);
      isProcessingCart = false; // Reset flag on error
      return;
    }

    // Get AI estimates for ALL items in a SINGLE batch call (no loading popup)
    console.log('[CarbonBuddy] Getting batch AI estimates for cart items:', items);
    getBatchAIEstimation(items)
      .then(aiResults => {
        console.log('[CarbonBuddy] Batch AI results for cart:', aiResults);
        
        // Create breakdown with AI results
        const breakdown = items.map((name, index) => {
          const aiResult = aiResults[index];
          return {
            name: name || 'Unknown Product',
            co2: aiResult && aiResult.co2 ? aiResult.co2 : 2.0, // default if AI fails
            unit: 'kg',
            source: aiResult ? (aiResult.source || 'AI Batch Estimation') : 'Default',
            key: aiResult ? aiResult.key : 'general_product'
          };
        });
        
        const totalCO2 = breakdown.reduce((sum, item) => sum + (item.co2 ? Number(item.co2) : 0), 0);
        
        // Show cart popup directly with AI results
        showActualCartPopup(breakdown, totalCO2, items, platform);
        
        // Reset processing flag after successful completion
        setTimeout(() => {
          isProcessingCart = false;
          console.log('[CarbonBuddy] Cart processing completed successfully');
        }, 500);
      })
      .catch(error => {
        console.error('[CarbonBuddy] Error getting batch AI estimates:', error);
        // Remove loading popup
        const loadingPopup = document.getElementById('carbonbuddy-cart-loading');
        const loadingBackdrop = document.getElementById('carbonbuddy-cart-loading-backdrop');
        if (loadingPopup) loadingPopup.remove();
        if (loadingBackdrop) loadingBackdrop.remove();
        
        // Reset processing flag on error
        isProcessingCart = false;
        
        // Show error message
        alert('Failed to analyze cart items with AI. Please try again.');
      });
  } catch (error) {
    console.error('[CarbonBuddy] showCartPopup error:', error);
  }
  
  // Show loading popup while AI processes
  function showCartLoadingPopup(items, platform) {
    const backdrop = document.createElement('div');
    backdrop.id = 'carbonbuddy-cart-loading-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999998;
      animation: fadeIn 0.2s ease;
    `;
    
    const popup = document.createElement('div');
    popup.id = 'carbonbuddy-cart-loading';
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      color: #333;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      z-index: 999999;
      padding: 40px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    popup.innerHTML = `
      <div style="font-size: 1.5em; margin-bottom: 16px;">🤖</div>
      <h3 style="margin: 0 0 12px 0; color: #4CAF50;">Analyzing Cart with AI</h3>
      <p style="margin: 0; color: #666; font-size: 0.9em;">Single batch call for ${items.length} items...</p>
      <div style="margin-top: 20px; width: 200px; height: 4px; background: #eee; border-radius: 2px; overflow: hidden;">
        <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #4CAF50, #45a049); animation: loading 1.5s infinite;"></div>
      </div>
    `;
    
    // Add loading animation
    if (!document.getElementById('loading-animation')) {
      const style = document.createElement('style');
      style.id = 'loading-animation';
      style.textContent = `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `;
      document.head.appendChild(style);
    }
    
    backdrop.appendChild(popup);
    document.body.appendChild(backdrop);
  }
  
  // Show actual cart popup with results
  function showActualCartPopup(breakdown, totalCO2, items, platform) {

    // Create popup backdrop (lighter for better performance)
    const backdrop = document.createElement('div');
    backdrop.id = 'carbonbuddy-cart-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999998;
      animation: fadeIn 0.2s ease;
    `;
    
    // Create popup
    popup = document.createElement('div');
    popup.id = 'carbonbuddy-cart-popup';
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
      color: #333;
      border: none;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);
      z-index: 999999;
      min-width: 420px;
      max-width: 90vw;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-height: 90vh;
      overflow: hidden;
      animation: slideInScale 0.3s ease-out;
    `;
    
    // Add lightweight animation styles
    if (!document.getElementById('carbonbuddy-cart-styles')) {
      const style = document.createElement('style');
      style.id = 'carbonbuddy-cart-styles';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInScale {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        .carbonbuddy-item-card {
          will-change: transform;
        }
        .carbonbuddy-item-card:hover {
          transform: translateY(-1px);
        }
      `;
      document.head.appendChild(style);
    }

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      padding: 24px;
      border-radius: 24px 24px 0 0;
      position: relative;
      overflow: hidden;
    `;
    
    const title = document.createElement('h2');
    title.innerHTML = '🛒 Cart CO₂ Impact Analysis';
    title.style.cssText = `
      margin: 0;
      font-size: 1.4em;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    
    const subtitle = document.createElement('p');
    subtitle.innerHTML = `Environmental impact of ${items.length} item${items.length > 1 ? 's' : ''} in your cart`;
    subtitle.style.cssText = `
      margin: 8px 0 16px 0;
      opacity: 0.9;
      font-size: 0.9em;
      font-weight: 400;
    `;
    
    // Total Environmental Impact in header
    const headerTotal = document.createElement('div');
    headerTotal.style.cssText = `
      background: rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 16px;
      margin-top: 16px;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const headerTotalLabel = document.createElement('div');
    headerTotalLabel.innerHTML = 'Total Environmental Impact';
    headerTotalLabel.style.cssText = `
      font-size: 0.85em;
      opacity: 0.9;
      margin-bottom: 8px;
      font-weight: 500;
    `;
    
    const headerTotalValue = document.createElement('div');
    headerTotalValue.innerHTML = `${totalCO2.toFixed(2)} kg CO₂`;
    headerTotalValue.style.cssText = `
      font-size: 1.8em;
      font-weight: 700;
      margin-bottom: 6px;
      color: #ff6b6b;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    
    const headerTreesEquivalent = (totalCO2 * 0.039).toFixed(1);
    const headerComparison = document.createElement('div');
    headerComparison.innerHTML = `≈ ${headerTreesEquivalent} trees needed for 1 year to offset`;
    headerComparison.style.cssText = `
      font-size: 0.75em;
      opacity: 0.8;
      font-style: italic;
    `;
    
    headerTotal.appendChild(headerTotalLabel);
    headerTotal.appendChild(headerTotalValue);
    headerTotal.appendChild(headerComparison);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    `;
    
    closeBtn.onmouseover = () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
      closeBtn.style.transform = 'scale(1.1)';
    };
    closeBtn.onmouseout = () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
      closeBtn.style.transform = 'scale(1)';
    };
    
    const closePopup = () => {
      if (backdrop && backdrop.parentNode) {
        backdrop.style.animation = 'fadeIn 0.2s reverse';
      }
      if (popup && popup.parentNode) {
        popup.style.animation = 'slideInScale 0.2s reverse';
      }
      setTimeout(() => {
        if (backdrop && backdrop.parentNode) backdrop.remove();
        if (popup && popup.parentNode) popup.remove();
      }, 200);
    };
    
    closeBtn.onclick = closePopup;
    
    header.appendChild(title);
    header.appendChild(subtitle);
    header.appendChild(headerTotal);
    header.appendChild(closeBtn);
    popup.appendChild(header);

    // Content container
    const content = document.createElement('div');
    content.style.cssText = `
      padding: 20px 24px;
      max-height: 35vh;
      overflow-y: auto;
    `;
    
    // Custom scrollbar for content
    content.style.scrollbarWidth = 'thin';
    content.style.scrollbarColor = '#45a049 #f0f0f0';
    
    // Breakdown list
    const list = document.createElement('div');
    list.style.cssText = `
      margin-bottom: 20px;
    `;
    
    breakdown.forEach((item, index) => {
      try {
        const itemCard = document.createElement('div');
        itemCard.className = 'carbonbuddy-item-card';
        itemCard.style.cssText = `
          background: rgba(255, 255, 255, 0.9);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 10px;
          border-left: 4px solid ${item.co2 ? '#45a049' : '#FF5722'};
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        `;
        
        const itemName = item.name || 'Unknown Product';
        const nameEl = document.createElement('div');
        nameEl.innerHTML = itemName;
        nameEl.style.cssText = `
          font-weight: 600;
          font-size: 0.95em;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.4;
        `;
        
        const co2El = document.createElement('div');
        if (item.co2) {
          co2El.innerHTML = `
            <span style="color: #d32f2f; font-weight: 600; font-size: 1.1em;">${item.co2} kg CO₂</span>
            <span style="color: #666; font-size: 0.85em; margin-left: 8px;">(${item.key ? item.key.replace(/_/g,' ') : 'estimated'})</span>
          `;
        } else {
          co2El.innerHTML = '<span style="color: #FF5722; font-weight: 500;">⚠️ CO₂ data not available</span>';
        }
        
        itemCard.appendChild(nameEl);
        itemCard.appendChild(co2El);
        list.appendChild(itemCard);
      } catch (error) {
        console.error('Error creating list item:', error, item);
      }
    });
    
    content.appendChild(list);

    popup.appendChild(content);

    // Footer with question and buttons
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: 20px 24px;
      background: rgba(248, 249, 250, 0.9);
      border-radius: 0 0 24px 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    `;
    
    // Question (moved to footer)
    const question = document.createElement('div');
    question.innerHTML = '🤔 Are you purchasing these items?';
    question.style.cssText = `
      font-size: 1.1em;
      font-weight: 600;
      color: #333;
      text-align: center;
      margin-bottom: 16px;
    `;
    footer.appendChild(question);
    
    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 12px;
      justify-content: center;
    `;
    
    const btnYes = document.createElement('button');
    btnYes.innerHTML = '✅ Yes, I\'m buying these';
    btnYes.style.cssText = `
      background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      font-weight: 600;
      font-size: 0.95em;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      flex: 1;
      max-width: 180px;
    `;
    
    btnYes.onmouseover = () => {
      btnYes.style.transform = 'translateY(-2px)';
      btnYes.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
    };
    btnYes.onmouseout = () => {
      btnYes.style.transform = 'translateY(0)';
      btnYes.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
    };

    const btnNo = document.createElement('button');
    btnNo.innerHTML = '❌ Just browsing';
    btnNo.style.cssText = `
      background: rgba(255, 255, 255, 0.9);
      color: #666;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 14px 24px;
      font-weight: 600;
      font-size: 0.95em;
      cursor: pointer;
      transition: all 0.3s ease;
      flex: 1;
      max-width: 180px;
    `;
    
    btnNo.onmouseover = () => {
      btnNo.style.background = 'rgba(255, 255, 255, 1)';
      btnNo.style.borderColor = 'rgba(0, 0, 0, 0.2)';
      btnNo.style.transform = 'translateY(-1px)';
    };
    btnNo.onmouseout = () => {
      btnNo.style.background = 'rgba(255, 255, 255, 0.9)';
      btnNo.style.borderColor = 'rgba(0, 0, 0, 0.1)';
      btnNo.style.transform = 'translateY(0)';
    };

    // Button actions
    btnYes.onclick = () => {
      // Save to chrome.storage.local
      const timestamp = Date.now();
      const purchase = breakdown.map(item => ({
        name: item.name,
        co2: item.co2,
        unit: item.unit,
        source: item.source,
        key: item.key,
        timestamp,
        platform
      }));
      chrome.storage.local.get(['purchase_history'], data => {
        const prev = data.purchase_history || [];
        chrome.storage.local.set({ purchase_history: prev.concat(purchase) });
      });
      
      closePopup();
    };
    
    btnNo.onclick = closePopup;
    
    // Close on backdrop click
    backdrop.onclick = closePopup;
    
    popup.onclick = (e) => e.stopPropagation();

    buttonContainer.appendChild(btnYes);
    buttonContainer.appendChild(btnNo);
    footer.appendChild(buttonContainer);
    popup.appendChild(footer);

    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
  }
}

// --- State to prevent infinite loop ---
let lastProduct = '';
let lastCart = '';
let lastPageType = '';
let isProcessingCart = false; // Prevent duplicate cart processing
let cartProcessingTimeout = null;

// --- Main Logic ---
function handlePage() {
  try {
    let pageType = '';
    if (isAmazonProductPage()) pageType = 'amazonProduct';
    else if (isFlipkartProductPage()) pageType = 'flipkartProduct';
    else if (isAmazonCartPage()) pageType = 'amazonCart';
    else if (isFlipkartCartPage()) pageType = 'flipkartCart';
    else pageType = '';

    console.log('[CarbonBuddy] handlePage running, pageType:', pageType);

    if (pageType === 'amazonProduct') {
      const name = extractAmazonProductName();
      if (!name) return; // Only show badge if product name found
      if (lastPageType === pageType && lastProduct === name) return;
      lastPageType = pageType; lastProduct = name; lastCart = '';
      observer.disconnect();
      
      // Direct AI estimation for all products (no loading message)
console.log('[CarbonBuddy] Getting AI estimate for:', name);
getAIEstimation(name).then(result => {
  console.log('[CarbonBuddy] AI returned:', result);
  if (result && result.co2) {
    showFloatingBadge(`<span style="color: #d32f2f; font-weight: 700;">${result.co2} kg CO₂</span> emitted by this product`, false, true);
  } else {
    showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">CO₂ data not available</span>');
  }
}).catch(err => {
  console.error('[CarbonBuddy] AI promise failed:', err);
  showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">CO₂ data not available</span>');
});

      observer.observe(document.body, { childList: true, subtree: true });
    } else if (pageType === 'flipkartProduct') {
      const name = extractFlipkartProductName();
      if (!name) return;
      if (lastPageType === pageType && lastProduct === name) return;
      lastPageType = pageType; lastProduct = name; lastCart = '';
      observer.disconnect();
      
      // Direct AI estimation for all products (no loading message)
console.log('[CarbonBuddy] Getting AI estimate for:', name);
getAIEstimation(name).then(result => {
  console.log('[CarbonBuddy] AI returned:', result);
  if (result && result.co2) {
    showFloatingBadge(`<span style="color: #d32f2f; font-weight: 700;">${result.co2} kg CO₂</span> emitted by this product`, false, true);
  } else {
    showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">CO₂ data not available</span>');
  }
}).catch(err => {
  console.error('[CarbonBuddy] AI promise failed:', err);
  showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">CO₂ data not available</span>');
});

      observer.observe(document.body, { childList: true, subtree: true });
    } else if (pageType === 'amazonCart') {
      const items = extractAmazonCartItems();
      console.log('[CarbonBuddy] Amazon cart items:', items);
      const cartKey = items.join('|');
      
      // Prevent duplicate processing
      if (lastPageType === pageType && lastCart === cartKey) return;
      if (isProcessingCart) {
        console.log('[CarbonBuddy] Cart already being processed, skipping...');
        return;
      }
      
      lastPageType = pageType; lastProduct = ''; lastCart = cartKey;
      observer.disconnect();
      
      if (items.length) {
        // Clear any existing timeout
        if (cartProcessingTimeout) {
          clearTimeout(cartProcessingTimeout);
        }
        
        // Set processing flag and timeout
        isProcessingCart = true;
        console.log('[CarbonBuddy] showCartPopup called', items);
        
        // Remove any existing popups first
        const existingPopup = document.getElementById('carbonbuddy-cart-popup');
        const existingBackdrop = document.getElementById('carbonbuddy-cart-backdrop');
        const existingLoading = document.getElementById('carbonbuddy-cart-loading');
        const existingLoadingBackdrop = document.getElementById('carbonbuddy-cart-loading-backdrop');
        
        if (existingPopup) existingPopup.remove();
        if (existingBackdrop) existingBackdrop.remove();
        if (existingLoading) existingLoading.remove();
        if (existingLoadingBackdrop) existingLoadingBackdrop.remove();
        
        showCartPopup(items, 'amazon');
        
        // Reset processing flag after a delay
        cartProcessingTimeout = setTimeout(() => {
          isProcessingCart = false;
          console.log('[CarbonBuddy] Cart processing flag reset');
        }, 3000); // 3 second cooldown
      }
      observer.observe(document.body, { childList: true, subtree: true });
    } else if (pageType === 'flipkartCart') {
      const items = extractFlipkartCartItems();
      console.log('[CarbonBuddy] Flipkart cart items:', items);
      const cartKey = items.join('|');
      
      // Prevent duplicate processing
      if (lastPageType === pageType && lastCart === cartKey) return;
      if (isProcessingCart) {
        console.log('[CarbonBuddy] Cart already being processed, skipping...');
        return;
      }
      
      lastPageType = pageType; lastProduct = ''; lastCart = cartKey;
      observer.disconnect();
      
      if (items.length) {
        // Clear any existing timeout
        if (cartProcessingTimeout) {
          clearTimeout(cartProcessingTimeout);
        }
        
        // Set processing flag
        isProcessingCart = true;
        console.log('[CarbonBuddy] showCartPopup called for Flipkart', items);
        
        // Remove any existing popups first
        const existingPopup = document.getElementById('carbonbuddy-cart-popup');
        const existingBackdrop = document.getElementById('carbonbuddy-cart-backdrop');
        const existingLoading = document.getElementById('carbonbuddy-cart-loading');
        const existingLoadingBackdrop = document.getElementById('carbonbuddy-cart-loading-backdrop');
        
        if (existingPopup) existingPopup.remove();
        if (existingBackdrop) existingBackdrop.remove();
        if (existingLoading) existingLoading.remove();
        if (existingLoadingBackdrop) existingLoadingBackdrop.remove();
        
        showCartPopup(items, 'flipkart');
        
        // Reset processing flag after a delay
        cartProcessingTimeout = setTimeout(() => {
          isProcessingCart = false;
          console.log('[CarbonBuddy] Flipkart cart processing flag reset');
        }, 3000); // 3 second cooldown
      }
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      lastPageType = ''; lastProduct = ''; lastCart = '';
      // Remove badge if present
      const badge = document.getElementById('carbonbuddy-badge');
      if (badge) badge.remove();
    }
  } catch (error) {
    console.error('[CarbonBuddy] Error in handlePage:', error);
  }
}

// --- Observe DOM changes for SPA support ---
let observerTimeout = null;
const observer = new MutationObserver((mutations) => {
  try {
    // Debounce the handlePage calls to prevent excessive triggering
    if (observerTimeout) {
      clearTimeout(observerTimeout);
    }
    
    observerTimeout = setTimeout(() => {
      // Only process if there are meaningful changes
      const hasRelevantChanges = mutations.some(mutation => {
        return mutation.type === 'childList' && 
               (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0);
      });
      
      if (hasRelevantChanges) {
        handlePage();
      }
    }, 300); // 300ms debounce
  } catch (error) {
    console.error('[CarbonBuddy] Error in MutationObserver:', error);
  }
});
observer.observe(document.body, { 
  childList: true, 
  subtree: true,
  attributes: false, // Don't watch attribute changes
  characterData: false // Don't watch text changes
});

// Initial run
try {
  handlePage();
} catch (error) {
  console.error('[CarbonBuddy] Error in initial handlePage:', error);
} 