// Translation system for MONA BEAUTY
// Brand name "MONA BEAUTY" is never translated

export type Lang = "en" | "ar";

export const translations = {
  en: {
    // Navbar
    nav_wishlist: "Wishlist",
    nav_cart: "Cart",

    // Hero
    hero_est: "Est. 2019 — Al-Gharbia",
    hero_tagline: "Beauty, quietly\nreimagined.",
    hero_sub:
      "A salon obsession turned edit — hair care, cosmetics and the daily rituals worth keeping.",
    hero_scroll: "Scroll to explore",
    hero_shop: "Shop Now",

    // News Ticker
    ticker_1: "Premium hair care — quality you can feel, results you can see",
    ticker_2: "Every product is tested, curated, and chosen with intention",
    ticker_3: "Salon-grade formulas made for everyday rituals",
    ticker_4: "No compromises — only the best makes it to our shelves",

    // Best Sellers
    best_label: "Featured",
    best_title: "Best sellers",

    // Categories
    cat_label: "Explore",
    cat_title: "Categories",
    cat_view_all: "View all →",

    // About
    about_label: "Our Story",
    about_title: "A quiet obsession with craft.",
    about_p1:
      "Mona Beauty specialises in premium hair care — products chosen for real results, tested in real hands, and built for everyday use.",
    about_p2:
      "From nourishing shampoos to finishing serums, every item in our collection is selected with one goal: hair that looks and feels its best.",
    about_founded: "Founded",
    about_products: "Products",
    about_clients: "Clients",

    // Why Us
    why_label: "Why choose us",
    why_title: "Built on trust.",
    perk_delivery_title: "Fast Delivery",
    perk_delivery_desc:
      "Al-Gharbia & nationwide shipping within 2–5 business days.",
    perk_authentic_title: "100% Authentic",
    perk_authentic_desc:
      "Every product is sourced directly from verified suppliers.",
    perk_returns_title: "Easy Returns",
    perk_returns_desc: "Not happy? Return within 14 days, no questions asked.",
    perk_support_title: "Expert Support",
    perk_support_desc: "Our beauty team is here to help — Monday to Saturday.",

    // Testimonials
    reviews_label: "Reviews",
    reviews_title: "What our clients say.",

    // Footer
    footer_desc:
      "Curated hair & beauty essentials, crafted with intention. A quiet obsession with quality since 2019.",
    footer_shop: "Shop",
    footer_contact: "Contact",
    footer_all_products: "All Products",
    footer_hair_care: "Hair Care",
    footer_makeup: "Makeup",
    footer_skincare: "Skincare",
    footer_location: "Al-Gharbia, Egypt",
    footer_rights: "ALL RIGHTS RESERVED",

    // Products Grid
    grid_shop_label: "Shop",
    grid_search: "Search products...",
    grid_sort: "Sort by",
    grid_sort_featured: "Featured",
    grid_sort_price_asc: "Price: Low to High",
    grid_sort_price_desc: "Price: High to Low",
    grid_sort_name: "Name: A–Z",
    grid_category: "Category",
    grid_all_cats: "All categories",
    grid_max_price: "Max Price",
    grid_filters: "Filters",
    grid_no_products: "No products found.",
    grid_products_count: "products",

    // Product Card
    product_sold_out: "Sold Out",
    product_view: "View Product",

    // Product Detail
    detail_home: "Home",
    detail_products: "Products",
    detail_description: "Description",
    detail_quantity: "Quantity",
    detail_add_cart: "Add to cart",
    detail_checkout: "Proceed to checkout",
    detail_how_to_use: "How to use",
    detail_you_may: "You may also like",
    detail_not_found: "Product not found",
    detail_back: "Back to shop",

    // Cart
    cart_title: "Cart",
    cart_empty: "Your cart is empty.",
    cart_continue: "Continue shopping",
    cart_summary: "Summary",
    cart_subtotal: "Subtotal",
    cart_delivery: "Delivery",
    cart_total: "Total",
    cart_checkout: "Proceed to checkout",

    // Wishlist
    wishlist_title: "Wishlist",
    wishlist_empty: "Your wishlist is empty.",
    wishlist_explore: "Explore products",
    wishlist_saved: "saved items",

    // Checkout
    checkout_title: "Checkout",
    checkout_your_info: "1. Your Info",
    checkout_payment: "2. Payment",
    checkout_order_summary: "Order Summary",
    checkout_full_name: "Full Name *",
    checkout_address: "Address *",
    checkout_governorate: "Governorate *",
    checkout_select_gov: "Select governorate",
    checkout_phone1: "Phone 1 *",
    checkout_phone2: "Phone 2",
    checkout_optional: "(optional)",
    checkout_continue: "Continue to Payment",
    checkout_method: "Payment Method",
    checkout_transfer_to: "Transfer to",
    checkout_copy: "Copy",
    checkout_transfer_exact: "Transfer exactly",
    checkout_then_fill: "then fill the details below.",
    checkout_sender_phone: "Sender Phone *",
    checkout_amount: "Amount Transferred *",
    checkout_receipt: "Transfer Screenshot *",
    checkout_click_upload: "Click to upload",
    checkout_file_types: "PNG, JPG up to 5MB",
    checkout_back: "Back",
    checkout_order_now: "Order Now",
    checkout_placing: "Placing...",
    checkout_10digits: "10 digits",
    checkout_street: "Street, building, floor...",
    checkout_your_name: "Your full name",

    // Quick Order
    quick_title: "Quick Order",
    quick_quantity: "Quantity",
    quick_add: "Add to cart",
    quick_checkout: "Proceed to checkout",

    // Admin — not translated (admin stays English)

    // Services
    services_label: "What We Offer",
    services_title: "Our Services.",
    services_sub:
      "Beyond products — we bring expertise, care, and real results to every visit.",
    svc_manicure_title: "Manicure & Nail Care",
    svc_manicure_desc:
      "Professional nail shaping, cuticle care, and polish application for hands that look and feel refined.",
    svc_pedicure_title: "Pedicure",
    svc_pedicure_desc:
      "A full foot treatment — exfoliation, softening soak, nail care, and finishing polish for smooth, healthy feet.",
    svc_hair_title: "Hair Care Treatments",
    svc_hair_desc:
      "Deep conditioning, keratin, and repair treatments using salon-grade formulas tailored to your hair type.",
    svc_skin_title: "Skincare & Facials",
    svc_skin_desc:
      "Personalised facial treatments including deep cleansing, brightening masks, and hydration therapy for glowing skin.",
    svc_blowdry_title: "Blow-Dry & Styling",
    svc_blowdry_desc:
      "Expert blow-drying and heat styling for a polished finish — straight, wavy, or voluminous.",
    svc_scalp_title: "Scalp Treatments",
    svc_scalp_desc:
      "Targeted scalp care to address dryness, oiliness, and hair loss — the foundation of healthy hair.",
    svc_protein_title: "Protein & Keratin",
    svc_protein_desc:
      "Intensive protein and keratin treatments that rebuild damaged hair structure and eliminate frizz for weeks.",
    svc_iron_title: "Hair Straightening & Ironing",
    svc_iron_desc:
      "Professional flat iron and permanent straightening treatments for silky, frizz-free hair that lasts.",
    svc_color_title: "Hair Colouring",
    svc_color_desc:
      "Full colour, highlights, balayage, and toning in any shade — from natural hues to bold, vibrant transformations.",
    svc_bride_title: "Bridal Make-up & Styling",
    svc_bride_desc:
      "Complete bridal packages — make-up, hair styling, and all finishing touches to make your special day truly unforgettable.",
    svc_makeup_title: "Make-up Application",
    svc_makeup_desc:
      "Professional make-up for all occasions — from everyday fresh looks to full glam for events and celebrations.",
    svc_cta:
      "Visit us at our branch, send us a message, or give us a call — we're always here to help you look and feel your absolute best.",
    svc_contact_btn: "Get in Touch",

    // 404
    not_found_title: "Page not found",
    not_found_desc: "The page you're looking for doesn't exist.",
    not_found_home: "Return home",
  },
  ar: {
    // Navbar
    nav_wishlist: "المفضلة",
    nav_cart: "السلة",

    // Hero
    hero_est: "منذ 2019 — الغربية",
    hero_tagline: "جمال، أُعيد\nتصوّره بهدوء.",
    hero_sub:
      "شغف صالون تحوّل إلى مجموعة مختارة — عناية بالشعر، مستحضرات تجميل، وطقوس يومية تستحق الاستمرار.",
    hero_scroll: "تصفح للاستكشاف",
    hero_shop: "تسوّق الآن",

    // News Ticker
    ticker_1: "عناية بالشعر بمستوى احترافي — جودة تحسّها ونتائج تراها",
    ticker_2: "كل منتج مختبر ومختار بعناية ونيّة",
    ticker_3: "تركيبات بمستوى الصالون لطقوسك اليومية",
    ticker_4: "بلا تنازلات — الأفضل فقط يصل إلى رفوفنا",

    // Best Sellers
    best_label: "مميز",
    best_title: "الأكثر مبيعاً",

    // Categories
    cat_label: "استكشف",
    cat_title: "الفئات",
    cat_view_all: "← عرض الكل",

    // About
    about_label: "قصتنا",
    about_title: "شغف هادئ بالصنعة.",
    about_p1:
      "تتخصص Mona Beauty في عناية الشعر الفاخرة — منتجات تُختار لنتائج حقيقية، وتُختبر بأيدٍ حقيقية، وتُصنع للاستخدام اليومي.",
    about_p2:
      "من الشامبوهات المغذية إلى السيروم النهائي، كل منتج في مجموعتنا يُختار بهدف واحد: شعر يبدو ويُحسّ بأفضل حال.",
    about_founded: "تأسست",
    about_products: "منتج",
    about_clients: "عميل",

    // Why Us
    why_label: "لماذا تختارنا",
    why_title: "مبنيّة على الثقة.",
    perk_delivery_title: "توصيل سريع",
    perk_delivery_desc: "الغربية وشحن على مستوى الجمهورية خلال 2–5 أيام عمل.",
    perk_authentic_title: "100% أصلي",
    perk_authentic_desc: "كل منتج مصدره مورّدون موثّقون مباشرةً.",
    perk_returns_title: "إرجاع سهل",
    perk_returns_desc: "غير راضٍ؟ أعد الطلب خلال 14 يوماً بلا أسئلة.",
    perk_support_title: "دعم متخصص",
    perk_support_desc:
      "فريق التجميل لدينا جاهز للمساعدة — من الاثنين إلى السبت.",

    // Testimonials
    reviews_label: "آراء العملاء",
    reviews_title: "ماذا يقول عملاؤنا.",

    // Footer
    footer_desc:
      "منتجات عناية بالشعر والجمال مختارة بعناية وبنيّة. شغف هادئ بالجودة منذ 2019.",
    footer_shop: "تسوّق",
    footer_contact: "تواصل معنا",
    footer_all_products: "جميع المنتجات",
    footer_hair_care: "العناية بالشعر",
    footer_makeup: "المكياج",
    footer_skincare: "العناية بالبشرة",
    footer_location: "الغربية، مصر",
    footer_rights: "جميع الحقوق محفوظة",

    // Products Grid
    grid_shop_label: "تسوّق",
    grid_search: "ابحث عن منتج...",
    grid_sort: "ترتيب حسب",
    grid_sort_featured: "مميز",
    grid_sort_price_asc: "السعر: من الأقل",
    grid_sort_price_desc: "السعر: من الأعلى",
    grid_sort_name: "الاسم: أ–ي",
    grid_category: "الفئة",
    grid_all_cats: "جميع الفئات",
    grid_max_price: "الحد الأقصى للسعر",
    grid_filters: "الفلاتر",
    grid_no_products: "لم يُعثر على منتجات.",
    grid_products_count: "منتج",

    // Product Card
    product_sold_out: "نفذ المخزون",
    product_view: "عرض المنتج",

    // Product Detail
    detail_home: "الرئيسية",
    detail_products: "المنتجات",
    detail_description: "الوصف",
    detail_quantity: "الكمية",
    detail_add_cart: "أضف للسلة",
    detail_checkout: "إتمام الشراء",
    detail_how_to_use: "طريقة الاستخدام",
    detail_you_may: "قد يعجبك أيضاً",
    detail_not_found: "المنتج غير موجود",
    detail_back: "العودة للمتجر",

    // Cart
    cart_title: "سلة التسوق",
    cart_empty: "سلة التسوق فارغة.",
    cart_continue: "مواصلة التسوق",
    cart_summary: "ملخص الطلب",
    cart_subtotal: "المجموع الفرعي",
    cart_delivery: "التوصيل",
    cart_total: "الإجمالي",
    cart_checkout: "إتمام الشراء",

    // Wishlist
    wishlist_title: "المفضلة",
    wishlist_empty: "قائمة المفضلة فارغة.",
    wishlist_explore: "استكشف المنتجات",
    wishlist_saved: "عنصر محفوظ",

    // Checkout
    checkout_title: "إتمام الشراء",
    checkout_your_info: "١. بياناتك",
    checkout_payment: "٢. الدفع",
    checkout_order_summary: "ملخص الطلب",
    checkout_full_name: "الاسم الكامل *",
    checkout_address: "العنوان *",
    checkout_governorate: "المحافظة *",
    checkout_select_gov: "اختر محافظة",
    checkout_phone1: "رقم الهاتف 1 *",
    checkout_phone2: "رقم الهاتف 2",
    checkout_optional: "(اختياري)",
    checkout_continue: "متابعة للدفع",
    checkout_method: "طريقة الدفع",
    checkout_transfer_to: "حوّل إلى",
    checkout_copy: "نسخ",
    checkout_transfer_exact: "حوّل بالضبط",
    checkout_then_fill: "ثم أكمل البيانات أدناه.",
    checkout_sender_phone: "هاتف المُحوِّل *",
    checkout_amount: "المبلغ المحوَّل *",
    checkout_receipt: "لقطة شاشة التحويل *",
    checkout_click_upload: "انقر للرفع",
    checkout_file_types: "PNG, JPG حتى 5 ميجا",
    checkout_back: "رجوع",
    checkout_order_now: "تأكيد الطلب",
    checkout_placing: "جارٍ الإرسال...",
    checkout_10digits: "10 أرقام",
    checkout_street: "الشارع، المبنى، الدور...",
    checkout_your_name: "اسمك الكامل",

    // Quick Order
    quick_title: "طلب سريع",
    quick_quantity: "الكمية",
    quick_add: "أضف للسلة",
    quick_checkout: "إتمام الشراء",

    // Services
    services_label: "ما نقدّمه",
    services_title: "خدماتنا.",
    services_sub:
      "أكثر من مجرد منتجات — نقدّم الخبرة والاهتمام ونتائج حقيقية في كل زيارة.",
    svc_manicure_title: "مانيكير والعناية بالأظافر",
    svc_manicure_desc:
      "تشكيل احترافي للأظافر والعناية بالجلد المحيط وتطبيق الطلاء لأيدٍ تبدو وتُحسّ بأناقة.",
    svc_pedicure_title: "باديكير",
    svc_pedicure_desc:
      "علاج كامل للقدمين — تقشير، نقع مرطّب، عناية بالأظافر، وطلاء نهائي لقدمين ناعمتين وصحيتين.",
    svc_hair_title: "علاجات العناية بالشعر",
    svc_hair_desc:
      "ترطيب عميق وكيراتين وعلاجات إصلاح بتركيبات بمستوى الصالون مصمّمة لنوع شعرك.",
    svc_skin_title: "العناية بالبشرة والفيشيال",
    svc_skin_desc:
      "علاجات بشرة شخصية تشمل تنظيفاً عميقاً وأقنعة إشراق وعلاج الترطيب للحصول على بشرة متألقة.",
    svc_blowdry_title: "سشوار وتصفيف الشعر",
    svc_blowdry_desc:
      "سشوار احترافي وتصفيف بالحرارة للحصول على مظهر أنيق — مستقيم أو متموج أو بحجم كامل.",
    svc_scalp_title: "علاجات فروة الرأس",
    svc_scalp_desc:
      "عناية مركّزة بفروة الرأس لمعالجة الجفاف والدهنية وتساقط الشعر — الأساس لشعر صحي.",
    svc_protein_title: "بروتين وكيراتين",
    svc_protein_desc:
      "علاجات بروتين وكيراتين مكثّفة تُعيد بناء بنية الشعر التالف وتُزيل التجعّد لأسابيع.",
    svc_iron_title: "فرد وسترايتنر",
    svc_iron_desc:
      "تسريحات فرد احترافية بالسترايتنر وعلاجات فرد دائمة لشعر حريري وناعم يدوم طويلاً.",
    svc_color_title: "صباغة الشعر",
    svc_color_desc:
      "صباغة كاملة، هايلايت، بالياج، وتونر بأي لون تريده — من الألوان الطبيعية إلى التحولات الجريئة والمبهجة.",
    svc_bride_title: "ميكب وتجهيز عرايس",
    svc_bride_desc:
      "باقات عروس كاملة — ميكب، تصفيف شعر، ولمسات نهائية تجعل يومك الخاص لا يُنسى إلى الأبد.",
    svc_makeup_title: "ميكب وتجميل",
    svc_makeup_desc:
      "ميكب احترافي لكل المناسبات — من اللوكات اليومية الناعمة إلى الجلام الكامل للحفلات والمناسبات.",
    svc_cta:
      "زورنا في الفرع، أرسل لنا رسالة، أو اتصل بنا — نحن هنا دائماً لنساعدك على إبراز أجمل ما فيك.",
    svc_contact_btn: "تواصل معنا",

    // 404
    not_found_title: "الصفحة غير موجودة",
    not_found_desc: "الصفحة التي تبحث عنها غير موجودة.",
    not_found_home: "العودة للرئيسية",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
