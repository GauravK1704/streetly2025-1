import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
];

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.subscriptionKits': 'Subscription Kits',
    'nav.trackOrders': 'Track Orders',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Hero Section
    'hero.title': 'Empowering Street Food Vendors —',
    'hero.titleHighlight': 'One Smart Kit at a Time',
    'hero.subtitle': 'Daily ingredient kits. AI-powered suggestions. Delivered fresh. Revolutionize your street food business with smart inventory management.',
    'hero.subscribeNow': 'Subscribe Now',
    'hero.exploreKits': 'Explore Kits',
    'hero.deliveryStatus': 'Fresh delivery arriving in 15 mins',
    
    // Features
    'features.title': 'Why Choose',
    'features.subtitle': 'Discover the features that make us the preferred choice for thousands of street food vendors',
    'features.aiRecommendations': 'AI-Based Kit Recommendations',
    'features.aiRecommendationsDesc': 'Smart suggestions based on demand patterns and seasonal trends',
    'features.festivalKits': 'Festival & Regional Kits',
    'features.festivalKitsDesc': 'Special ingredients for festivals and regional specialties',
    'features.subscriptions': 'Daily & Weekly Subscriptions',
    'features.subscriptionsDesc': 'Flexible subscription plans that fit your business needs',
    'features.delivery': 'Real-time Delivery Tracking',
    'features.deliveryDesc': 'Track your orders from preparation to doorstep',
    'features.support': 'Vendor Chat Support',
    'features.supportDesc': '24/7 multilingual support in your preferred language',
    'features.topUp': 'Emergency Ingredient Top-Up',
    'features.topUpDesc': 'Quick refills when you run out of key ingredients',
    'features.multiLang': 'Multi-language UI',
    'features.multiLangDesc': 'Available in English, Hindi, Bengali, Marathi, and Tamil',
    'features.darkMode': 'Light/Dark Mode Toggle',
    'features.darkModeDesc': 'Comfortable viewing experience any time of day',
    
    // How It Works
    'howItWorks.title': 'How StreetLy Works',
    'howItWorks.subtitle': 'Simple steps to transform your street food business',
    'howItWorks.step1': 'Register with Your Stall Info',
    'howItWorks.step1Desc': 'Quick signup with your stall details and food category preferences',
    'howItWorks.step2': 'Choose Your Food Category',
    'howItWorks.step2Desc': 'Select from Chaat, Dosa, Tea, Paratha, and many more categories',
    'howItWorks.step3': 'Subscribe to a Smart Kit',
    'howItWorks.step3Desc': 'Pick daily, weekly, or custom subscription plans that work for you',
    'howItWorks.step4': 'Get Real-time Delivery',
    'howItWorks.step4Desc': 'Receive fresh ingredients with live tracking and SMS updates',
    'howItWorks.step5': 'Save Time, Serve Better, Earn More',
    'howItWorks.step5Desc': 'Focus on cooking while we handle your ingredient sourcing',
    
    // Testimonials
    'testimonials.title': 'What Our Vendors Say',
    'testimonials.subtitle': 'Real stories from street food vendors using StreetLy',
    
    // Subscription Kits
    'subscriptionKits.title': 'Popular Subscription Kits',
    'subscriptionKits.subtitle': 'Choose the perfect kit for your food category',
    'subscriptionKits.includes': 'Includes:',
    'subscriptionKits.mostPopular': 'Most Popular',
    'subscriptionKits.bestValue': 'Best Value',
    'subscriptionKits.new': 'New',
    
    // Kit Types
    'kit.chatori': 'Chatori Kit',
    'kit.chatoriDesc': 'Perfect for chaat and snack vendors',
    'kit.nashta': 'Nashta Kit',
    'kit.nashtaDesc': 'Morning breakfast essentials',
    'kit.chai': 'Garam Chai Kit',
    'kit.chaiDesc': 'Tea and beverage supplies',
    
    // CTA Section
    'cta.title': 'Join 10,000+ vendors using StreetLy to grow smarter',
    'cta.subtitle': 'Start your journey today and experience the difference smart kit ordering can make',
    'cta.getStarted': 'Get Started Now',
    'cta.registerFree': 'Register for Free',
    
    // Footer
    'footer.description': 'Empowering street food vendors across India with smart kit ordering solutions.',
    'footer.quickLinks': 'Quick Links',
    'footer.forVendors': 'For Vendors',
    'footer.connect': 'Connect',
    'footer.copyright': '© 2025 StreetLy. Empowering street food vendors across India.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back',
    'dashboard.cart': 'Cart',
    
    // Admin Panel
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Central command center for StreetLy platform management',
    'admin.overview': 'Overview',
    'admin.vendors': 'Vendors',
    'admin.suppliers': 'Suppliers',
    'admin.delivery': 'Delivery Partners',
    'admin.orders': 'Orders',
    'admin.analytics': 'Analytics',
    'admin.financial': 'Financial',
    'admin.settings': 'Settings',
    'admin.support': 'Support',
    'admin.campaigns': 'Campaigns',
    'admin.reports': 'Reports',
    'admin.help': 'Help Center',
    'admin.home': 'Home',
    'admin.export': 'Export Report',
    'admin.broadcast': 'Broadcast Message',
    
    // Common UI
    'ui.search': 'Search',
    'ui.filter': 'Filter',
    'ui.save': 'Save',
    'ui.cancel': 'Cancel',
    'ui.edit': 'Edit',
    'ui.delete': 'Delete',
    'ui.view': 'View',
    'ui.actions': 'Actions',
    'ui.status': 'Status',
    'ui.loading': 'Loading...',
    'ui.close': 'Close',
    
    // Auth Page
    'auth.welcomeTitle': 'Welcome to StreetLy',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.selectRole': 'Select Role',
    'auth.phoneNumber': 'Phone Number',
    'auth.enterOtp': 'Enter OTP',
    'auth.fullName': 'Full Name',
    'auth.location': 'Location',
    'auth.enterPhonePlaceholder': 'Enter 10-digit number',
    'auth.enterOtpPlaceholder': '4-digit code',
    'auth.enterNamePlaceholder': 'Enter your full name',
    'auth.enterLocationPlaceholder': 'Enter your city/area',
    'auth.demoPhones': 'Demo phones: 9876543210 (vendor), 9876543211 (supplier), 9876543212 (admin), 9876543213 (delivery)',
    'auth.invalidPhone': 'Invalid Phone Number',
    'auth.invalidPhoneDesc': 'Please enter a valid 10-digit phone number',
    'auth.otpSent': 'OTP Sent',
    'auth.otpSentDesc': 'Enter any 4-digit code to continue (demo mode)',
    'auth.loginSuccessful': 'Login Successful',
    'auth.welcomeBack': 'Welcome back',
    'auth.loginFailed': 'Login Failed',
    'auth.loginFailedDesc': 'Invalid phone number, OTP, or role combination',
    'auth.missingInfo': 'Missing Information',
    'auth.missingInfoDesc': 'Please fill in all required fields',
    'auth.registerSuccessful': 'Registration Successful',
    'auth.welcomeToApp': 'Welcome to StreetLy',
    'auth.registerFailed': 'Registration Failed',
    'auth.registerFailedDesc': 'Please try again',
    
    // Role Labels
    'roles.vendor': 'Street Food Vendor',
    'roles.supplier': 'Supplier',
    'roles.admin': 'Admin',
    'roles.delivery': 'Delivery Partner',
    
    // Dashboard - Supplier
    'supplier.title': 'Supplier Dashboard',
    'supplier.welcomeBack': 'Welcome back! Here\'s your business overview',
    
    // Dashboard - Delivery
    'delivery.title': 'Delivery Dashboard',
    'delivery.welcomeBack': 'Welcome back! Ready for deliveries',
    
    // Analytics
    'analytics.title': 'Analytics Dashboard',
    'analytics.insights': 'AI Insights Dashboard',
    
    // Payments
    'payments.title': 'Payments Dashboard',

    // Tamil dashboard translations missing above - adding here
  },
  hi: {
    // Header
    'nav.home': 'होम',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.subscriptionKits': 'सब्स्क्रिप्शन किट्स',
    'nav.trackOrders': 'ऑर्डर ट्रैक करें',
    'nav.contact': 'संपर्क',
    'nav.login': 'लॉगिन',
    'nav.register': 'रजिस्टर',
    
    // Hero Section
    'hero.title': 'स्ट्रीट फूड विक्रेताओं को सशक्त बनाना —',
    'hero.titleHighlight': 'एक समय में एक स्मार्ट किट',
    'hero.subtitle': 'दैनिक सामग्री किट्स। AI-संचालित सुझाव। ताज़ा डिलीवरी। स्मार्ट इन्वेंटरी प्रबंधन के साथ अपने स्ट्रीट फूड व्यवसाय में क्रांति लाएं।',
    'hero.subscribeNow': 'अभी सब्स्क्राइब करें',
    'hero.exploreKits': 'किट्स एक्सप्लोर करें',
    'hero.deliveryStatus': 'ताज़ी डिलीवरी 15 मिनट में आ रही है',
    
    // Features
    'features.title': 'क्यों चुनें',
    'features.subtitle': 'उन सुविधाओं को जानें जो हमें हजारों स्ट्रीट फूड विक्रेताओं की पसंदीदा पसंद बनाती हैं',
    'features.aiRecommendations': 'AI-आधारित किट सिफारिशें',
    'features.aiRecommendationsDesc': 'मांग पैटर्न और मौसमी रुझानों के आधार पर स्मार्ट सुझाव',
    'features.festivalKits': 'त्योहार और क्षेत्रीय किट्स',
    'features.festivalKitsDesc': 'त्योहारों और क्षेत्रीय विशेषताओं के लिए विशेष सामग्री',
    'features.subscriptions': 'दैनिक और साप्ताहिक सब्स्क्रिप्शन',
    'features.subscriptionsDesc': 'लचीली सब्स्क्रिप्शन योजनाएं जो आपके व्यवसाय की जरूरतों के अनुकूल हैं',
    'features.delivery': 'रियल-टाइम डिलीवरी ट्रैकिंग',
    'features.deliveryDesc': 'तैयारी से दरवाजे तक अपने ऑर्डर को ट्रैक करें',
    'features.support': 'विक्रेता चैट सहायता',
    'features.supportDesc': 'आपकी पसंदीदा भाषा में 24/7 बहुभाषी सहायता',
    'features.topUp': 'आपातकालीन सामग्री टॉप-अप',
    'features.topUpDesc': 'जब आप मुख्य सामग्री से बाहर हो जाते हैं तो त्वरित रिफिल',
    'features.multiLang': 'बहु-भाषा UI',
    'features.multiLangDesc': 'अंग्रेजी, हिंदी, बंगाली, मराठी और तमिल में उपलब्ध',
    'features.darkMode': 'लाइट/डार्क मोड टॉगल',
    'features.darkModeDesc': 'दिन के किसी भी समय आरामदायक देखने का अनुभव',
    
    // How It Works
    'howItWorks.title': 'आहारसेतु कैसे काम करता है',
    'howItWorks.subtitle': 'अपने स्ट्रीट फूड व्यवसाय को बदलने के लिए सरल कदम',
    'howItWorks.step1': 'अपनी स्टॉल जानकारी के साथ रजिस्टर करें',
    'howItWorks.step1Desc': 'अपने स्टॉल विवरण और खाद्य श्रेणी प्राथमिकताओं के साथ त्वरित साइनअप',
    'howItWorks.step2': 'अपनी फूड कैटेगरी चुनें',
    'howItWorks.step2Desc': 'चाट, डोसा, चाय, पराठा और कई अन्य श्रेणियों में से चुनें',
    'howItWorks.step3': 'स्मार्ट किट की सदस्यता लें',
    'howItWorks.step3Desc': 'दैनिक, साप्ताहिक या कस्टम सब्स्क्रिप्शन योजनाओं को चुनें जो आपके लिए काम करें',
    'howItWorks.step4': 'रियल-टाइम डिलीवरी प्राप्त करें',
    'howItWorks.step4Desc': 'लाइव ट्रैकिंग और SMS अपडेट के साथ ताज़ी सामग्री प्राप्त करें',
    'howItWorks.step5': 'समय बचाएं, बेहतर सेवा करें, अधिक कमाएं',
    'howItWorks.step5Desc': 'खाना पकाने पर ध्यान दें जबकि हम आपकी सामग्री की सोर्सिंग संभालते हैं',
    
    // Testimonials
    'testimonials.title': 'हमारे विक्रेता क्या कहते हैं',
    'testimonials.subtitle': 'आहारसेतु का उपयोग करने वाले स्ट्रीट फूड विक्रेताओं की वास्तविक कहानियां',
    
    // Subscription Kits
    'subscriptionKits.title': 'लोकप्रिय सब्स्क्रिप्शन किट्स',
    'subscriptionKits.subtitle': 'अपनी खाद्य श्रेणी के लिए सही किट चुनें',
    'subscriptionKits.includes': 'इसमें शामिल है:',
    'subscriptionKits.mostPopular': 'सबसे लोकप्रिय',
    'subscriptionKits.bestValue': 'सर्वोत्तम मूल्य',
    'subscriptionKits.new': 'नया',
    
    // Kit Types
    'kit.chatori': 'चटोरी किट',
    'kit.chatoriDesc': 'चाट और स्नैक विक्रेताओं के लिए परफेक्ट',
    'kit.nashta': 'नाश्ता किट',
    'kit.nashtaDesc': 'सुबह के नाश्ते की आवश्यक वस्तुएं',
    'kit.chai': 'गरम चाय किट',
    'kit.chaiDesc': 'चाय और पेय आपूर्ति',
    
    // CTA Section
    'cta.title': 'स्मार्ट तरीके से बढ़ने के लिए आहारसेतु का उपयोग करने वाले 10,000+ विक्रेताओं में शामिल हों',
    'cta.subtitle': 'आज ही अपनी यात्रा शुरू करें और स्मार्ट किट ऑर्डरिंग का अंतर अनुभव करें',
    'cta.getStarted': 'अभी शुरू करें',
    'cta.registerFree': 'मुफ्त में रजिस्टर करें',
    
    // Footer
    'footer.description': 'स्मार्ट किट ऑर्डरिंग समाधानों के साथ भारत भर के स्ट्रीट फूड विक्रेताओं को सशक्त बनाना।',
    'footer.quickLinks': 'त्वरित लिंक्स',
    'footer.forVendors': 'विक्रेताओं के लिए',
    'footer.connect': 'जुड़ें',
    'footer.copyright': '© 2025 आहारसेतु। भारत भर के स्ट्रीट फूड विक्रेताओं को सशक्त बनाना।',
    
    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.welcome': 'वापसी पर स्वागत',
    'dashboard.cart': 'कार्ट',
    
    // Admin Panel
    'admin.title': 'एडमिन डैशबोर्ड',
    'admin.subtitle': 'स्ट्रीटलाई प्लेटफॉर्म प्रबंधन के लिए केंद्रीय कमांड सेंटर',
    'admin.overview': 'अवलोकन',
    'admin.vendors': 'विक्रेता',
    'admin.suppliers': 'आपूर्तिकर्ता',
    'admin.delivery': 'डिलीवरी पार्टनर्स',
    'admin.orders': 'ऑर्डर',
    'admin.analytics': 'एनालिटिक्स',
    'admin.financial': 'वित्तीय',
    'admin.settings': 'सेटिंग्स',
    'admin.support': 'सपोर्ट',
    'admin.campaigns': 'अभियान',
    'admin.reports': 'रिपोर्ट्स',
    'admin.help': 'हेल्प सेंटर',
    'admin.home': 'होम',
    'admin.export': 'रिपोर्ट एक्सपोर्ट करें',
    'admin.broadcast': 'ब्रॉडकास्ट मैसेज',
    
    // Common UI
    'ui.search': 'खोजें',
    'ui.filter': 'फिल्टर',
    'ui.save': 'सेव करें',
    'ui.cancel': 'रद्द करें',
    'ui.edit': 'संपादित करें',
    'ui.delete': 'हटाएं',
    'ui.view': 'देखें',
    'ui.actions': 'कार्य',
    'ui.status': 'स्थिति',
    'ui.loading': 'लोड हो रहा है...',
    'ui.close': 'बंद करें',
    
    // Auth Page
    'auth.welcomeTitle': 'स्ट्रीटलाई में आपका स्वागत है',
    'auth.login': 'लॉगिन',
    'auth.register': 'रजिस्टर करें',
    'auth.selectRole': 'भूमिका चुनें',
    'auth.phoneNumber': 'फोन नंबर',
    'auth.enterOtp': 'OTP दर्ज करें',
    'auth.fullName': 'पूरा नाम',
    'auth.location': 'स्थान',
    'auth.enterPhonePlaceholder': '10-अंकीय नंबर दर्ज करें',
    'auth.enterOtpPlaceholder': '4-अंकीय कोड',
    'auth.enterNamePlaceholder': 'अपना पूरा नाम दर्ज करें',
    'auth.enterLocationPlaceholder': 'अपना शहर/क्षेत्र दर्ज करें',
    'auth.demoPhones': 'डेमो फोन: 9876543210 (विक्रेता), 9876543211 (आपूर्तिकर्ता), 9876543212 (एडमिन), 9876543213 (डिलीवरी)',
    'auth.invalidPhone': 'अमान्य फोन नंबर',
    'auth.invalidPhoneDesc': 'कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें',
    'auth.otpSent': 'OTP भेजा गया',
    'auth.otpSentDesc': 'जारी रखने के लिए कोई भी 4-अंकीय कोड दर्ज करें (डेमो मोड)',
    'auth.loginSuccessful': 'लॉगिन सफल',
    'auth.welcomeBack': 'वापसी पर स्वागत',
    'auth.loginFailed': 'लॉगिन असफल',
    'auth.loginFailedDesc': 'अमान्य फोन नंबर, OTP, या भूमिका संयोजन',
    'auth.missingInfo': 'जानकारी गुम',
    'auth.missingInfoDesc': 'कृपया सभी आवश्यक फ़ील्ड भरें',
    'auth.registerSuccessful': 'पंजीकरण सफल',
    'auth.welcomeToApp': 'स्ट्रीटलाई में आपका स्वागत है',
    'auth.registerFailed': 'पंजीकरण असफल',
    'auth.registerFailedDesc': 'कृपया पुनः प्रयास करें',
    
    // Role Labels
    'roles.vendor': 'स्ट्रीट फूड विक्रेता',
    'roles.supplier': 'आपूर्तिकर्ता',
    'roles.admin': 'एडमिन',
    'roles.delivery': 'डिलीवरी पार्टनर',
    
    // Dashboard - Supplier
    'supplier.title': 'आपूर्तिकर्ता डैशबोर्ड',
    'supplier.welcomeBack': 'वापसी पर स्वागत! यहाँ आपका व्यवसाय अवलोकन है',
    
    // Dashboard - Delivery
    'delivery.title': 'डिलीवरी डैशबोर्ड',
    'delivery.welcomeBack': 'वापसी पर स्वागत! डिलीवरी के लिए तैयार',
    
    // Analytics
    'analytics.title': 'एनालिटिक्स डैशबोर्ड',
    'analytics.insights': 'AI इनसाइट्स डैशबोर्ड',
    
    // Payments
    'payments.title': 'पेमेंट्स डैशबोर्ड',
  },
  bn: {
    // Header
    'nav.home': 'হোম',
    'nav.howItWorks': 'এটি কীভাবে কাজ করে',
    'nav.subscriptionKits': 'সাবস্ক্রিপশন কিট',
    'nav.trackOrders': 'অর্ডার ট্র্যাক করুন',
    'nav.contact': 'যোগাযোগ',
    'nav.login': 'লগইন',
    'nav.register': 'নিবন্ধন',
    
    // Hero Section
    'hero.title': 'স্ট্রিট ফুড বিক্রেতাদের ক্ষমতায়ন —',
    'hero.titleHighlight': 'একটি সময়ে একটি স্মার্ট কিট',
    'hero.subtitle': 'দৈনিক উপাদান কিট। AI-চালিত পরামর্শ। তাজা ডেলিভারি। স্মার্ট ইনভেন্টরি ব্যবস্থাপনার সাথে আপনার স্ট্রিট ফুড ব্যবসায় বিপ্লব আনুন।',
    'hero.subscribeNow': 'এখনই সাবস্ক্রাইব করুন',
    'hero.exploreKits': 'কিট অন্বেষণ করুন',
    'hero.deliveryStatus': 'তাজা ডেলিভারি ১৫ মিনিটে আসছে',
    
    // Features
    'features.title': 'কেন বেছে নিন',
    'features.subtitle': 'হাজার হাজার স্ট্রিট ফুড বিক্রেতাদের পছন্দের পছন্দ যে বৈশিষ্ট্যগুলি আবিষ্কার করুন',
    'features.aiRecommendations': 'AI-ভিত্তিক কিট সুপারিশ',
    'features.aiRecommendationsDesc': 'চাহিদার প্যাটার্ন এবং ঋতুভিত্তিক ট্রেন্ডের উপর ভিত্তি করে স্মার্ট পরামর্শ',
    'features.festivalKits': 'উৎসব ও আঞ্চলিক কিট',
    'features.festivalKitsDesc': 'উৎসব এবং আঞ্চলিক বিশেষত্বের জন্য বিশেষ উপাদান',
    'features.subscriptions': 'দৈনিক ও সাপ্তাহিক সাবস্ক্রিপশন',
    'features.subscriptionsDesc': 'নমনীয় সাবস্ক্রিপশন পরিকল্পনা যা আপনার ব্যবসায়িক প্রয়োজনের সাথে মানানসই',
    'features.delivery': 'রিয়েল-টাইম ডেলিভারি ট্র্যাকিং',
    'features.deliveryDesc': 'প্রস্তুতি থেকে দোরগোড়া পর্যন্ত আপনার অর্ডার ট্র্যাক করুন',
    'features.support': 'বিক্রেতা চ্যাট সাপোর্ট',
    'features.supportDesc': 'আপনার পছন্দের ভাষায় ২৪/৭ বহুভাষিক সহায়তা',
    'features.topUp': 'জরুরি উপাদান টপ-আপ',
    'features.topUpDesc': 'মূল উপাদান শেষ হয়ে গেলে দ্রুত রিফিল',
    'features.multiLang': 'বহু-ভাষা UI',
    'features.multiLangDesc': 'ইংরেজি, হিন্দি, বাংলা, মারাঠি এবং তামিলে উপলব্ধ',
    'features.darkMode': 'লাইট/ডার্ক মোড টগল',
    'features.darkModeDesc': 'দিনের যেকোনো সময় আরামদায়ক দেখার অভিজ্ঞতা',
    
    // How It Works
    'howItWorks.title': 'আহারসেতু কীভাবে কাজ করে',
    'howItWorks.subtitle': 'আপনার স্ট্রিট ফুড ব্যবসা রূপান্তরিত করার সহজ পদক্ষেপ',
    'howItWorks.step1': 'আপনার স্টলের তথ্য দিয়ে নিবন্ধন করুন',
    'howItWorks.step1Desc': 'আপনার স্টলের বিবরণ এবং খাদ্য বিভাগের পছন্দের সাথে দ্রুত সাইনআপ',
    'howItWorks.step2': 'আপনার খাদ্য বিভাগ বেছে নিন',
    'howItWorks.step2Desc': 'চাট, দোসা, চা, পরোটা এবং আরও অনেক বিভাগ থেকে নির্বাচন করুন',
    'howItWorks.step3': 'একটি স্মার্ট কিটের সাবস্ক্রিপশন নিন',
    'howItWorks.step3Desc': 'দৈনিক, সাপ্তাহিক বা কাস্টম সাবস্ক্রিপশন পরিকল্পনা বেছে নিন যা আপনার জন্য কাজ করে',
    'howItWorks.step4': 'রিয়েল-টাইম ডেলিভারি পান',
    'howItWorks.step4Desc': 'লাইভ ট্র্যাকিং এবং SMS আপডেটের সাথে তাজা উপাদান পান',
    'howItWorks.step5': 'সময় বাঁচান, ভাল পরিবেশন করুন, আরও আয় করুন',
    'howItWorks.step5Desc': 'রান্নার উপর ফোকাস করুন যখন আমরা আপনার উপাদান সোর্সিং হ্যান্ডেল করি',
    
    // Testimonials
    'testimonials.title': 'আমাদের বিক্রেতারা কী বলেন',
    'testimonials.subtitle': 'আহারসেতু ব্যবহারকারী স্ট্রিট ফুড বিক্রেতাদের প্রকৃত গল্প',
    
    // Subscription Kits
    'subscriptionKits.title': 'জনপ্রিয় সাবস্ক্রিপশন কিট',
    'subscriptionKits.subtitle': 'আপনার খাদ্য বিভাগের জন্য নিখুঁত কিট বেছে নিন',
    'subscriptionKits.includes': 'অন্তর্ভুক্ত:',
    'subscriptionKits.mostPopular': 'সবচেয়ে জনপ্রিয়',
    'subscriptionKits.bestValue': 'সেরা মূল্য',
    'subscriptionKits.new': 'নতুন',
    
    // Kit Types
    'kit.chatori': 'চটোরি কিট',
    'kit.chatoriDesc': 'চাট এবং স্ন্যাক বিক্রেতাদের জন্য নিখুঁত',
    'kit.nashta': 'নাশতা কিট',
    'kit.nashtaDesc': 'সকালের নাশতার প্রয়োজনীয় জিনিস',
    'kit.chai': 'গরম চা কিট',
    'kit.chaiDesc': 'চা এবং পানীয় সরবরাহ',
    
    // CTA Section
    'cta.title': 'স্মার্টভাবে বৃদ্ধির জন্য আহারসেতু ব্যবহারকারী ১০,০০০+ বিক্রেতাদের সাথে যোগ দিন',
    'cta.subtitle': 'আজই আপনার যাত্রা শুরু করুন এবং স্মার্ট কিট অর্ডারিংয়ের পার্থক্য অনুভব করুন',
    'cta.getStarted': 'এখনই শুরু করুন',
    'cta.registerFree': 'বিনামূল্যে নিবন্ধন করুন',
    
    // Footer
    'footer.description': 'স্মার্ট কিট অর্ডারিং সমাধানের সাথে ভারত জুড়ে স্ট্রিট ফুড বিক্রেতাদের ক্ষমতায়ন।',
    'footer.quickLinks': 'দ্রুত লিঙ্ক',
    'footer.forVendors': 'বিক্রেতাদের জন্য',
    'footer.connect': 'সংযোগ',
    'footer.copyright': '© ২০২৫ আহারসেতু। ভারত জুড়ে স্ট্রিট ফুড বিক্রেতাদের ক্ষমতায়ন।',
    
    // Dashboard
    'dashboard.title': 'ড্যাশবোর্ড',
    'dashboard.welcome': 'ফিরে আসার জন্য স্বাগতম',
    'dashboard.cart': 'কার্ট',
    
    // Admin Panel
    'admin.title': 'অ্যাডমিন ড্যাশবোর্ড',
    'admin.subtitle': 'স্ট্রিটলাই প্ল্যাটফর্ম পরিচালনার জন্য কেন্দ্রীয় কমান্ড সেন্টার',
    'admin.overview': 'সংক্ষিপ্ত বিবরণ',
    'admin.vendors': 'বিক্রেতারা',
    'admin.suppliers': 'সরবরাহকারীরা',
    'admin.delivery': 'ডেলিভারি পার্টনারস',
    'admin.orders': 'অর্ডার',
    'admin.analytics': 'অ্যানালিটিক্স',
    'admin.financial': 'আর্থিক',
    'admin.settings': 'সেটিংস',
    'admin.support': 'সাপোর্ট',
    'admin.campaigns': 'প্রচারাভিযান',
    'admin.reports': 'রিপোর্ট',
    'admin.help': 'হেল্প সেন্টার',
    'admin.home': 'হোম',
    'admin.export': 'রিপোর্ট এক্সপোর্ট করুন',
    'admin.broadcast': 'ব্রডকাস্ট মেসেজ',
    
    // Common UI
    'ui.search': 'অনুসন্ধান',
    'ui.filter': 'ফিল্টার',
    'ui.save': 'সেভ করুন',
    'ui.cancel': 'বাতিল',
    'ui.edit': 'সম্পাদনা',
    'ui.delete': 'মুছুন',
    'ui.view': 'দেখুন',
    'ui.actions': 'কার্যক্রম',
    'ui.status': 'অবস্থা',
    'ui.loading': 'লোড হচ্ছে...',
    'ui.close': 'বন্ধ করুন',
    
    // Auth Page
    'auth.welcomeTitle': 'স্ট্রিটলাইতে স্বাগতম',
    'auth.login': 'লগইন',
    'auth.register': 'নিবন্ধন',
    'auth.selectRole': 'ভূমিকা নির্বাচন করুন',
    'auth.phoneNumber': 'ফোন নম্বর',
    'auth.enterOtp': 'OTP প্রবেশ করুন',
    'auth.fullName': 'পূর্ণ নাম',
    'auth.location': 'অবস্থান',
    'auth.enterPhonePlaceholder': '১০-সংখ্যার নম্বর প্রবেশ করুন',
    'auth.enterOtpPlaceholder': '৪-সংখ্যার কোড',
    'auth.enterNamePlaceholder': 'আপনার পূর্ণ নাম প্রবেশ করুন',
    'auth.enterLocationPlaceholder': 'আপনার শহর/এলাকা প্রবেশ করুন',
    'auth.demoPhones': 'ডেমো ফোন: 9876543210 (বিক্রেতা), 9876543211 (সরবরাহকারী), 9876543212 (অ্যাডমিন), 9876543213 (ডেলিভারি)',
    'auth.invalidPhone': 'অবৈধ ফোন নম্বর',
    'auth.invalidPhoneDesc': 'দয়া করে একটি বৈধ ১০-সংখ্যার ফোন নম্বর প্রবেশ করুন',
    'auth.otpSent': 'OTP পাঠানো হয়েছে',
    'auth.otpSentDesc': 'চালিয়ে যেতে যেকোনো ৪-সংখ্যার কোড প্রবেশ করুন (ডেমো মোড)',
    'auth.loginSuccessful': 'লগইন সফল',
    'auth.welcomeBack': 'ফিরে আসার জন্য স্বাগতম',
    'auth.loginFailed': 'লগইন ব্যর্থ',
    'auth.loginFailedDesc': 'অবৈধ ফোন নম্বর, OTP, বা ভূমিকা সংমিশ্রণ',
    'auth.missingInfo': 'তথ্য অনুপস্থিত',
    'auth.missingInfoDesc': 'দয়া করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন',
    'auth.registerSuccessful': 'নিবন্ধন সফল',
    'auth.welcomeToApp': 'স্ট্রিটলাইতে স্বাগতম',
    'auth.registerFailed': 'নিবন্ধন ব্যর্থ',
    'auth.registerFailedDesc': 'দয়া করে আবার চেষ্টা করুন',
    
    // Role Labels
    'roles.vendor': 'স্ট্রিট ফুড বিক্রেতা',
    'roles.supplier': 'সরবরাহকারী',
    'roles.admin': 'অ্যাডমিন',
    'roles.delivery': 'ডেলিভারি পার্টনার',
    
    // Dashboard - Supplier
    'supplier.title': 'সরবরাহকারী ড্যাশবোর্ড',
    'supplier.welcomeBack': 'ফিরে আসার জন্য স্বাগতম! এখানে আপনার ব্যবসার ওভারভিউ',
    
    // Dashboard - Delivery
    'delivery.title': 'ডেলিভারি ড্যাশবোর্ড',
    'delivery.welcomeBack': 'ফিরে আসার জন্য স্বাগতম! ডেলিভারির জন্য প্রস্তুত',
    
    // Analytics
    'analytics.title': 'অ্যানালিটিক্স ড্যাশবোর্ড',
    'analytics.insights': 'AI ইনসাইটস ড্যাশবোর্ড',
    
    // Payments
    'payments.title': 'পেমেন্টস ড্যাশবোর্ড',
  },
  ta: {
    // Header
    'nav.home': 'முகப்பு',
    'nav.howItWorks': 'இது எவ்வாறு செயல்படுகிறது',
    'nav.subscriptionKits': 'சந்தா கிட்கள்',
    'nav.trackOrders': 'ஆர்டர்களை கண்காணிக்கவும்',
    'nav.contact': 'தொடர்பு',
    'nav.login': 'உள்நுழைய',
    'nav.register': 'பதிவு',
    
    // Hero Section
    'hero.title': 'தெரு உணவு விற்பனையாளர்களுக்கு அதிகாரம் —',
    'hero.titleHighlight': 'ஒரு நேரத்தில் ஒரு ஸ்மார்ட் கிட்',
    'hero.subtitle': 'தினசரி மூலப்பொருள் கிட்கள். AI-இயங்கும் பரிந்துரைகள். புதிய விநியோகம். ஸ்மார்ட் சரக்கு மேலாண்மையுடன் உங்கள் தெரு உணவு வணிகத்தில் புரட்சி செய்யுங்கள்.',
    'hero.subscribeNow': 'இப்போது சந்தா செலுத்துங்கள்',
    'hero.exploreKits': 'கிட்களை ஆராயுங்கள்',
    'hero.deliveryStatus': 'புதிய விநியோகம் 15 நிமிடங்களில் வருகிறது',
    
    // Features
    'features.title': 'ஏன் தேர்வு செய்க',
    'features.subtitle': 'ஆயிரக்கணக்கான தெரு உணவு விற்பனையாளர்களின் விருப்பமான தேர்வாக அமையும் அம்சங்களைக் கண்டறியுங்கள்',
    'features.aiRecommendations': 'AI-அடிப்படையிலான கிட் பரிந்துரைகள்',
    'features.aiRecommendationsDesc': 'தேவை முறைகள் மற்றும் பருவகால போக்குகளின் அடிப்படையில் ஸ்மார்ட் பரிந்துரைகள்',
    'features.festivalKits': 'திருவிழா மற்றும் பிராந்திய கிட்கள்',
    'features.festivalKitsDesc': 'திருவிழாகள் மற்றும் பிராந்திய சிறப்புகளுக்கான சிறப்பு மூலப்பொருட்கள்',
    'features.subscriptions': 'தினசரி மற்றும் வாராந்திர சந்தாக்கள்',
    'features.subscriptionsDesc': 'உங்கள் வணிக தேவைகளுக்கு ஏற்ற நெகிழ்வான சந்தா திட்டங்கள்',
    'features.delivery': 'நிகழ்நேர விநியோக கண்காணிப்பு',
    'features.deliveryDesc': 'தயாரிப்பு முதல் வீட்டு வாசல் வரை உங்கள் ஆர்டர்களைக் கண்காணிக்கவும்',
    'features.support': 'விற்பனையாளர் அரட்டை ஆதரவு',
    'features.supportDesc': 'உங்கள் விருப்பமான மொழியில் 24/7 பன்மொழி ஆதரவு',
    'features.topUp': 'அவசர மூலப்பொருள் டாப்-அப்',
    'features.topUpDesc': 'முக்கிய மூலப்பொருட்கள் தீர்ந்துவிட்டால் விரைவான நிரப்புதல்',
    'features.multiLang': 'பன்மொழி UI',
    'features.multiLangDesc': 'ஆங்கிலம், இந்தி, வங்காளம், மராத்தி மற்றும் தமிழில் கிடைக்கிறது',
    'features.darkMode': 'ஒளி/இருண்ட முறை மாற்றம்',
    'features.darkModeDesc': 'நாளின் எந்த நேரத்திலும் வசதியான பார்வை அனுபவம்',
    
    // How It Works
    'howItWorks.title': 'ஆஹார்சேது எவ்வாறு செயல்படுகிறது',
    'howItWorks.subtitle': 'உங்கள் தெரு உணவு வணிகத்தை மாற்ற எளிய படிகள்',
    'howItWorks.step1': 'உங்கள் கடை தகவலுடன் பதிவு செய்யுங்கள்',
    'howItWorks.step1Desc': 'உங்கள் கடை விவரங்கள் மற்றும் உணவு வகை விருப்பத்தேர்வுகளுடன் விரைவான பதிவு',
    'howItWorks.step2': 'உங்கள் உணவு வகையைத் தேர்வு செய்யுங்கள்',
    'howItWorks.step2Desc': 'சாட், தோசை, தேநீர், பராத்தா மற்றும் பல வகைகளில் இருந்து தேர்வு செய்யுங்கள்',
    'howItWorks.step3': 'ஸ்மார்ட் கிட்டுக்கு சந்தா செலுத்துங்கள்',
    'howItWorks.step3Desc': 'உங்களுக்காக வேலை செய்யும் தினசரி, வாராந்திர அல்லது தனிப்பயன் சந்தா திட்டங்களைத் தேர்வு செய்யுங்கள்',
    'howItWorks.step4': 'நிகழ்நேர விநியோகம் பெறுங்கள்',
    'howItWorks.step4Desc': 'நேரடி கண்காணிப்பு மற்றும் SMS புதுப்பிப்புகளுடன் புதிய மூலப்பொருட்களைப் பெறுங்கள்',
    'howItWorks.step5': 'நேரத்தை மிச்சப்படுத்துங்கள், சிறப்பாக சேவை செய்யுங்கள், அதிகம் சம்பாதியுங்கள்',
    'howItWorks.step5Desc': 'நாங்கள் உங்கள் மூலப்பொருள் ஆதாரத்தை கையாளும்போது சமையலில் கவனம் செலுத்துங்கள்',
    
    // Testimonials
    'testimonials.title': 'எங்கள் விற்பனையாளர்கள் என்ன சொல்கிறார்கள்',
    'testimonials.subtitle': 'ஆஹார்சேதுவைப் பயன்படுத்தும் தெரு உணவு விற்பனையாளர்களின் உண்மையான கதைகள்',
    
    // Subscription Kits
    'subscriptionKits.title': 'பிரபலமான சந்தா கிட்கள்',
    'subscriptionKits.subtitle': 'உங்கள் உணவு வகைக்கு சரியான கிட்டைத் தேர்வு செய்யுங்கள்',
    'subscriptionKits.includes': 'உள்ளடக்கியது:',
    'subscriptionKits.mostPopular': 'மிகவும் பிரபலமான',
    'subscriptionKits.bestValue': 'சிறந்த மதிப்பு',
    'subscriptionKits.new': 'புதிய',
    
    // Kit Types
    'kit.chatori': 'சட்டோரி கிட்',
    'kit.chatoriDesc': 'சாட் மற்றும் சிற்றுண்டி விற்பனையாளர்களுக்கு சரியானது',
    'kit.nashta': 'நாஷ்டா கிட்',
    'kit.nashtaDesc': 'காலை உணவின் அத்தியாவசிய பொருட்கள்',
    'kit.chai': 'கரம் சாய் கிட்',
    'kit.chaiDesc': 'தேநீர் மற்றும் பானம் விநியோகம்',
    
    // CTA Section
    'cta.title': 'ஸ்மார்ட்டாக வளர ஆஹார்சேதுவைப் பயன்படுத்தும் 10,000+ விற்பனையாளர்களுடன் சேருங்கள்',
    'cta.subtitle': 'இன்றே உங்கள் பயணத்தைத் தொடங்குங்கள் மற்றும் ஸ்மார்ட் கிட் ஆர்டரிங் செய்யும் வித்தியாசத்தை அனுபவிக்கவும்',
    'cta.getStarted': 'இப்போது தொடங்குங்கள்',
    'cta.registerFree': 'இலவசமாக பதிவு செய்யுங்கள்',
    
    // Footer
    'footer.description': 'ஸ்மார்ட் கிட் ஆர்டரிங் தீர்வுகளுடன் இந்தியா முழுவதும் தெரு உணவு விற்பனையாளர்களுக்கு அதிகாரம் அளித்தல்.',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.forVendors': 'விற்பனையாளர்களுக்கு',
    'footer.connect': 'இணைக்கவும்',
    'footer.copyright': '© 2025 ஆஹார்சேது. இந்தியா முழுவதும் தெரு உணவு விற்பனையாளர்களுக்கு அதிகாரம் அளித்தல்.',
    
    // Dashboard
    'dashboard.title': 'டாஷ்போர்டு',
    'dashboard.welcome': 'மீண்டும் வருக',
    'dashboard.cart': 'கார்ட்',
    
    // Admin Panel
    'admin.title': 'அட்மின் டாஷ்போர்டு',
    'admin.subtitle': 'ஸ்ட்ரீட்லை தளம் நிர்வாகத்திற்கான மத்திய கட்டளை மையம்',
    'admin.overview': 'மேலோட்டம்',
    'admin.vendors': 'விற்பனையாளர்கள்',
    'admin.suppliers': 'சப்ளையர்கள்',
    'admin.delivery': 'டெலிவரி பார்ட்னர்கள்',
    'admin.orders': 'ஆர்டர்கள்',
    'admin.analytics': 'அனலிட்டிக்ஸ்',
    'admin.financial': 'நிதி',
    'admin.settings': 'அமைப்புகள்',
    'admin.support': 'ஆதரவு',
    'admin.campaigns': 'பிரச்சாரங்கள்',
    'admin.reports': 'அறிக்கைகள்',
    'admin.help': 'உதவி மையம்',
    'admin.home': 'முகப்பு',
    'admin.export': 'அறிக்கை ஏற்றுமதி',
    'admin.broadcast': 'ஒளிபரப்பு செய்தி',
    
    // Common UI
    'ui.search': 'தேடு',
    'ui.filter': 'வடிகட்டி',
    'ui.save': 'சேமி',
    'ui.cancel': 'ரத்து',
    'ui.edit': 'திருத்து',
    'ui.delete': 'நீக்கு',
    'ui.view': 'பார்',
    'ui.actions': 'செயல்கள்',
    'ui.status': 'நிலை',
    'ui.loading': 'ஏற்றுகிறது...',
    'ui.close': 'மூடு',
    
    // Auth Page
    'auth.welcomeTitle': 'ஸ்ட்ரீட்லைக்கு வருக',
    'auth.login': 'உள்நுழைய',
    'auth.register': 'பதிவு',
    'auth.selectRole': 'பங்கு தேர்வு செய்க',
    'auth.phoneNumber': 'ஃபோன் எண்',
    'auth.enterOtp': 'OTP உள்ளிடுக',
    'auth.fullName': 'முழு பெயர்',
    'auth.location': 'இடம்',
    'auth.enterPhonePlaceholder': '10-இலக்க எண்ணை உள்ளிடுக',
    'auth.enterOtpPlaceholder': '4-இலக்க குறியீடு',
    'auth.enterNamePlaceholder': 'உங்கள் முழு பெயரை உள்ளிடுக',
    'auth.enterLocationPlaceholder': 'உங்கள் நகரம்/பகுதியை உள்ளிடுக',
    'auth.demoPhones': 'டெமோ ஃபோன்கள்: 9876543210 (விற்பனையாளர்), 9876543211 (சப்ளையர்), 9876543212 (அட்மின்), 9876543213 (டெலிவரி)',
    'auth.invalidPhone': 'தவறான ஃபோன் எண்',
    'auth.invalidPhoneDesc': 'தயவுசெய்து சரியான 10-இலக்க ஃபோன் எண்ணை உள்ளிடுக',
    'auth.otpSent': 'OTP அனுப்பப்பட்டது',
    'auth.otpSentDesc': 'தொடர எந்த 4-இலக்க குறியீட்டையும் உள்ளிடுக (டெமோ மோட்)',
    'auth.loginSuccessful': 'உள்நுழைவு வெற்றிகரமாக',
    'auth.welcomeBack': 'மீண்டும் வருக',
    'auth.loginFailed': 'உள்நுழைவு தோல்வி',
    'auth.loginFailedDesc': 'தவறான ஃபோன் எண், OTP, அல்லது பங்கு சேர்க்கை',
    'auth.missingInfo': 'தகவல் விடுபட்டுள்ளது',
    'auth.missingInfoDesc': 'தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்புக',
    'auth.registerSuccessful': 'பதிவு வெற்றிகரமாக',
    'auth.welcomeToApp': 'ஸ்ட்ரீட்லைக்கு வருக',
    'auth.registerFailed': 'பதிவு தோல்வி',
    'auth.registerFailedDesc': 'தயவுசெய்து மீண்டும் முயற்சிக்கவும்',
    
    // Role Labels
    'roles.vendor': 'தெரு உணவு விற்பனையாளர்',
    'roles.supplier': 'சப்ளையர்',
    'roles.admin': 'அட்மின்',
    'roles.delivery': 'டெலிவரி பார்ட்னர்',
    
    // Dashboard - Supplier
    'supplier.title': 'சப்ளையர் டாஷ்போர்ட்',
    'supplier.welcomeBack': 'மீண்டும் வருக! இங்கே உங்கள் வணிக மேலோட்டம்',
    
    // Dashboard - Delivery
    'delivery.title': 'டெலிவரி டாஷ்போர்ட்',
    'delivery.welcomeBack': 'மீண்டும் வருக! டெலிவரிகளுக்கு தயார்',
    
    // Analytics
    'analytics.title': 'அனலிட்டிக்ஸ் டாஷ்போர்ட்',
    'analytics.insights': 'AI இன்சைட்ஸ் டாஷ்போர்ட்',
    
    // Payments
    'payments.title': 'பேமென்ட்ஸ் டாஷ்போர்ட்',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage) {
      const found = languages.find(lang => lang.code === savedLanguage);
      if (found) setCurrentLanguage(found);
    }
  }, []);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("preferred-language", language.code);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};