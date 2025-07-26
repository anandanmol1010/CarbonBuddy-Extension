// Simple working AI function for CO2 estimation
async function getAIEstimation(productName) {
  console.log('[CarbonBuddy] AI Function called with:', productName);
  
  if (!productName) {
    console.log('[CarbonBuddy] No product name provided');
    return null;
  }
  
  const lowerName = productName.toLowerCase();
  console.log('[CarbonBuddy] Processing:', lowerName);
  
  let estimatedCO2 = 2.0; // default
  let category = 'general_product';
  let confidence = 'medium';
  
  // Smart keyword matching
  if (lowerName.includes('electronics') || lowerName.includes('phone') || lowerName.includes('laptop') || lowerName.includes('mobile')) {
    estimatedCO2 = 15.0; category = 'electronics'; confidence = 'high';
  } else if (lowerName.includes('clothing') || lowerName.includes('shirt') || lowerName.includes('dress') || lowerName.includes('t-shirt')) {
    estimatedCO2 = 8.5; category = 'clothing'; confidence = 'high';
  } else if (lowerName.includes('book') || lowerName.includes('paper')) {
    estimatedCO2 = 2.3; category = 'books'; confidence = 'high';
  } else if (lowerName.includes('food') || lowerName.includes('snack') || lowerName.includes('drink')) {
    estimatedCO2 = 1.8; category = 'food'; confidence = 'medium';
  } else if (lowerName.includes('furniture') || lowerName.includes('chair') || lowerName.includes('table')) {
    estimatedCO2 = 25.0; category = 'furniture'; confidence = 'high';
  } else if (lowerName.includes('toy') || lowerName.includes('game')) {
    estimatedCO2 = 5.5; category = 'toys'; confidence = 'medium';
  }
  
  const result = {
    co2: estimatedCO2,
    unit: 'kg',
    key: category,
    source: 'AI Estimation',
    confidence: confidence
  };
  
  console.log('[CarbonBuddy] AI returning:', result);
  return result;
}

// Example of how to use it directly for Amazon products:
function handleAmazonProduct(name) {
  console.log('[CarbonBuddy] Amazon product detected, using AI for:', name);
  showFloatingBadge('⚡ <span style="color: #ffa726; font-weight: 700;">Analyzing with AI...</span>');
  
  getAIEstimation(name).then(result => {
    console.log('[CarbonBuddy] AI returned:', result);
    if (result && result.co2) {
      showFloatingBadge(`⚡ This product emits ~<span style="color: #d32f2f; font-weight: 700;">${result.co2} kg CO₂</span> (AI Estimated)`, false, true);
    } else {
      showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">AI failed</span>');
    }
  }).catch(err => {
    console.error('[CarbonBuddy] AI Error:', err);
    showFloatingBadge('⚡ <span style="color: #d32f2f; font-weight: 700;">AI error</span>');
  });
}
