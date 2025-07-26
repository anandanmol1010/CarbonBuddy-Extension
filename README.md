# 🌱 CarbonBuddy - AI-Powered Carbon Footprint Tracker

**CarbonBuddy** is a powerful Chrome extension that helps you track and understand the carbon footprint of your online shopping activities. Get real-time CO₂ emission estimates for products on Amazon and Flipkart, and make more environmentally conscious purchasing decisions.

![CarbonBuddy Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge)
![License MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## ✨ Features

### 🛒 **Smart Cart Analysis**
- **Batch AI Processing**: Analyzes all cart items in a single API call for efficiency
- **Real-time Estimates**: Instant CO₂ calculations as you shop
- **Duplicate Prevention**: Advanced state management prevents popup overlaps
- **Smart Popup**: Clean, modern cart popup with environmental impact breakdown

### 📱 **Product Page Integration**
- **Floating Badges**: Non-intrusive CO₂ badges on product pages
- **AI-Powered Estimation**: Uses advanced AI when local data isn't available
- **Persistent Display**: AI-generated results stay visible until manually closed
- **Platform Support**: Works seamlessly on Amazon India and Flipkart

### 📊 **Comprehensive Tracking**
- **Purchase History**: Track all your shopping emissions over time
- **Total Impact**: See your cumulative environmental footprint
- **Recent Searches**: Quick access to previously checked products
- **Detailed Breakdown**: Item-by-item CO₂ analysis with confidence levels

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful, modern interface with gradient backgrounds
- **Smooth Animations**: Polished interactions and transitions
- **Responsive Layout**: Optimized for different screen sizes
- **Color-Coded Results**: Red for emissions (environmental harm), green for UI accents

### 🔧 **Advanced Features**
- **Local Dataset**: Comprehensive CO₂ database for instant lookups
- **AI Fallback**: Gemini AI integration for unknown products
- **Performance Optimized**: Debounced observers and efficient DOM manipulation
- **Error Handling**: Robust error management and user feedback

## 🚀 Installation

### Method 1: Developer Mode (Recommended)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/CarbonBuddy.git
   cd CarbonBuddy
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Enable **"Developer mode"** (toggle in top-right corner)

3. **Load the Extension**
   - Click **"Load unpacked"**
   - Select the `CarbonBuddy` folder
   - Extension will appear in your toolbar

4. **Verify Installation**
   - Look for the 🌱 CarbonBuddy icon in Chrome toolbar
   - Visit Amazon/Flipkart to test functionality

### Method 2: Chrome Web Store
*Coming soon - extension will be published to Chrome Web Store*

## 📖 How to Use

### 🛍️ **Shopping on Supported Sites**

1. **Product Pages**
   - Visit any product on Amazon India or Flipkart
   - CO₂ badge automatically appears with emission estimate
   - Click ❌ to close the badge

2. **Cart Analysis**
   - Go to your shopping cart on Amazon/Flipkart
   - Extension automatically detects cart items
   - Popup shows CO₂ breakdown for all items
   - Choose "Yes" to log purchase or "No" to dismiss

### 📊 **Extension Popup**

1. **Click the CarbonBuddy icon** in Chrome toolbar

2. **Three Main Tabs:**
   - **🛒 Cart**: View purchase history and total emissions
   - **📦 Product**: Check individual product CO₂ emissions
   - **🌍 Browsing**: Track website browsing emissions

3. **Product Checker:**
   - Enter any product name
   - Get AI-powered CO₂ estimate
   - View recent searches for quick access

## 🏗️ Technical Architecture

### **File Structure**
```
CarbonBuddy/
├── manifest.json          # Extension configuration
├── content.js            # Main content script (52KB)
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality (29KB)
├── popup.css            # Modern UI styling (9KB)
├── background.js        # Service worker
├── co2_data.json        # Local CO₂ database (7KB)
├── icons/               # Extension icons (16, 32, 48, 128px)
└── README.md           # This file
```

### **Core Technologies**
- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: No external dependencies
- **Modern CSS**: Glassmorphism, gradients, animations
- **Chrome APIs**: Storage, Tabs, Scripting
- **AI Integration**: Gemini AI for advanced estimation

### **Key Components**

#### **Content Script (`content.js`)**
- Page detection (Amazon/Flipkart product/cart pages)
- Product name extraction with specific selectors
- CO₂ estimation using local dataset + AI fallback
- Dynamic UI injection (badges, popups)
- MutationObserver for real-time page monitoring
- State management to prevent duplicate processing

#### **Popup Interface (`popup.js` + `popup.html`)**
- Three-tab interface (Cart, Product, Browsing)
- Purchase history with grand totals
- Product checker with AI integration
- Recent searches with click-to-fill
- Local storage management

#### **AI Integration**
- Local dataset matching with keyword scoring
- Gemini AI API for unknown products
- Batch processing for cart analysis
- Confidence levels and reasoning

## 🔧 Configuration

### **AI API Setup (Optional)**

To enable real AI estimation:

1. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate API key

2. **Update Configuration**
   ```javascript
   // In popup.js, line ~580
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```

3. **Test AI Integration**
   - Use Product Checker in extension popup
   - Enter product name and click "Check CO₂"

### **Supported Websites**
- **Amazon India** (`amazon.in`)
- **Flipkart** (`flipkart.com`)

*More platforms coming soon!*

## 🎯 Usage Examples

### **Example 1: Product Page**
```
1. Visit: https://www.amazon.in/dp/B08N5WRWNW
2. Badge appears: "⚡ This product emits ~8.5 kg CO₂ (clothing)"
3. Click ❌ to close or let it auto-hide
```

### **Example 2: Cart Analysis**
```
1. Add items to Amazon cart
2. Visit cart page
3. Popup shows:
   - iPhone 13: 15.0 kg CO₂
   - Cotton T-Shirt: 8.5 kg CO₂
   - Total: 23.5 kg CO₂
4. Click "Yes" to log purchase
```

### **Example 3: Product Checker**
```
1. Open extension popup
2. Go to "📦 Product" tab
3. Enter: "Samsung Galaxy S23"
4. Result: "15.2 kg CO₂ per item"
```

## 🐛 Troubleshooting

### **Common Issues**

**Badge not appearing on product pages:**
- Ensure you're on Amazon India or Flipkart
- Check if product title element exists
- Refresh the page

**Cart popup not showing:**
- Make sure you're on the cart page (not wishlist)
- Check browser console for errors
- Verify extension permissions

**AI estimation failing:**
- Check API key configuration
- Verify internet connection
- Check browser console for API errors

### **Debug Mode**
Enable detailed logging:
```javascript
// In content.js, uncomment debug lines
console.log('[CarbonBuddy] Debug mode enabled');
```

## 🔒 Privacy & Security

- **No Personal Data Collection**: Extension only processes product names
- **Local Storage**: All data stored locally in browser
- **Minimal Permissions**: Only required permissions requested
- **Secure API Calls**: HTTPS-only communication
- **No Tracking**: No analytics or user tracking

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Setup**
```bash
# Clone repository
git clone https://github.com/yourusername/CarbonBuddy.git
cd CarbonBuddy

# Load in Chrome for testing
# No build process required - pure vanilla JS
```

### **Contribution Guidelines**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Areas for Contribution**
- 🌐 **New Platform Support** (eBay, Myntra, etc.)
- 🤖 **AI Model Integration** (OpenAI, Claude, etc.)
- 🎨 **UI/UX Improvements**
- 📊 **Data Visualization**
- 🔧 **Performance Optimization**
- 🧪 **Testing & Quality Assurance**

## 📈 Roadmap

### **Version 1.1** (Coming Soon)
- [ ] Support for more e-commerce platforms
- [ ] Enhanced AI model integration
- [ ] Data export functionality
- [ ] Carbon offset suggestions

### **Version 1.2** (Future)
- [ ] Social sharing features
- [ ] Gamification elements
- [ ] Browser sync across devices
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 CarbonBuddy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent CO₂ estimation
- **Material Design** for UI inspiration
- **Chrome Extension Community** for best practices
- **Environmental Data Sources** for CO₂ emission data

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/CarbonBuddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/CarbonBuddy/discussions)
- **Email**: carbonbuddy@example.com

---

**Made with 💚 for a sustainable future**

*Help reduce your carbon footprint, one purchase at a time!*
