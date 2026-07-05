# MONA BEAUTY - دليل سريع

## طريقة التشغيل السهلة

### الطريقة الأولى: باستخدام Batch File (موصى بها)
اضغط دبل كليك على ملف `start.bat` وسيتم فتح نافذتين:
- نافذة للـ API Server (Backend)
- نافذة للـ Frontend (Vite)

### الطريقة الثانية: من Terminal
افتح Terminal في مجلد المشروع واكتب:
```cmd
npm run dev
```

## روابط الصفحات المهمة

بعد التشغيل:
- **الصفحة الرئيسية:** http://localhost:3000
- **المنتجات:** http://localhost:3000/products
- **تسجيل دخول Admin:** http://localhost:3000/admin/login

## بيانات تسجيل الدخول للـ Admin

```
Email: admin@monabeauty.com
Password: admin123
```

## حل المشاكل

### 1. المنتجات لا تظهر
- **السبب:** مشكلة في MongoDB
- **الحل:** افتح ملف `.env` وتأكد من أن السطر الأول هو:
```
MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
```

### 2. صفحة المنتج لا تفتح
- **السبب:** السيرفر غير شغال أو MongoDB غير متصل
- **الحل:** 
  1. تأكد من أن النافذتين (API + Frontend) شغالين
  2. افتح http://localhost:3001/api/products في المتصفح
  3. إذا ظهرت منتجات، يبقى المشكلة في Frontend
  4. إذا ظهر خطأ، يبقى المشكلة في Backend أو MongoDB

### 3. صفحة Checkout لا تفتح من Cart
- **الحل:** تأكد من:
  1. السلة فيها منتجات
  2. افتح Console (F12) وشوف الأخطاء
  3. جرب تفتح الصفحة مباشرة: http://localhost:3000/checkout

### 4. الحذف من Admin لا يعمل
- **الحل:**
  1. تأكد إنك مسجل دخول كـ Admin
  2. افتح DevTools → Application → Local Storage
  3. لازم يكون فيه `admin_token`
  4. إذا مش موجود، سجل دخول تاني

## MongoDB Atlas Settings

للتأكد من إعدادات MongoDB:

1. **IP Whitelist:**
   - اذهب إلى: Network Access
   - تأكد من وجود `0.0.0.0/0` في القائمة
   - إذا مش موجود، اضغط "Add IP Address" واختر "Allow Access from Anywhere"

2. **Database User:**
   - اذهب إلى: Database Access
   - تأكد من وجود المستخدم: `abrahemelgazaly2_db_user`
   - الصلاحيات لازم تكون: "Atlas Admin" أو "Read and write to any database"

## صفحات Admin Dashboard

بعد تسجيل الدخول ستجد 3 تبويبات:

### 1. Add Product
- إضافة منتج جديد
- رفع صور (حتى 5 صور)
- الصورة الأولى هي اللي تظهر على الكارت

### 2. Manage Products
- عرض جميع المنتجات
- تعديل / حذف / Sold Out
- بحث عن المنتجات

### 3. Orders
- عرض جميع الطلبات
- تغيير حالة الطلب
- حذف الطلبات

## ملاحظات مهمة

1. **الصور:** 
   - يتم تحويلها إلى Base64 قبل الحفظ
   - الحد الأقصى: 5 صور لكل منتج

2. **الطلبات:**
   - يتم حفظها مع جميع التفاصيل في MongoDB
   - تحتوي على معلومات العميل والدفع والصورة

3. **رقم فودافون كاش:**
   - محفوظ في الكود: 01092175699
   - لتغييره، افتح: `src/lib/constants.ts`

## أسئلة شائعة

**س: كيف أضيف منتج جديد؟**
ج: سجل دخول Admin → Add Product → املأ البيانات → ارفع الصور → Add Product

**س: كيف أشوف الطلبات؟**
ج: سجل دخول Admin → Orders tab

**س: كيف أغير حالة طلب؟**
ج: في Orders tab → اضغط على "Change Status" → اختر الحالة الجديدة

**س: البيانات بتروح بعد Restart؟**
ج: لأ، البيانات محفوظة في MongoDB Atlas وتبقى موجودة دايماً (ما دام MongoDB متصل)

## للدعم الفني

إذا واجهت أي مشكلة:
1. افتح Console في المتصفح (F12)
2. شوف الأخطاء الحمراء
3. اكتب النص كامل للمساعدة في الحل
