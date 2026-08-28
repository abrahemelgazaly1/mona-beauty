# ❓ الأسئلة الشائعة - FAQ

## 🎯 أسئلة عامة

### س1: كيف أشغل المشروع؟
```cmd
npm install       # مرة واحدة فقط
npm run dev       # كل مرة
```
افتح: http://localhost:5173

---

### س2: كيف أدخل لوحة التحكم (Admin)?
**الطريقة:**
1. افتح: http://localhost:5173/admin/login
2. Email: `admin@monabeauty.com`
3. Password: `admin123`
4. اضغط Sign In

---

### س3: كيف أضيف منتج جديد؟
1. سجل دخول Admin
2. اذهب لـ Tab "Add Product"
3. املأ:
   - اسم المنتج
   - السعر (بالجنيه المصري)
   - الوصف
   - طريقة الاستخدام
   - الفئة (Category)
4. ارفع الصور (حتى 5 صور)
5. اضغط "Add Product"

---

### س4: كيف أحذف منتج؟
1. سجل دخول Admin
2. اذهب لـ Tab "Manage Products"
3. اضغط زر "Delete" تحت المنتج
4. اضغط "Yes" في رسالة التأكيد
5. اعمل Refresh للصفحة (F5)

---

### س5: كيف أعدل منتج؟
1. سجل دخول Admin
2. اذهب لـ Tab "Manage Products"
3. اضغط زر "Edit" تحت المنتج
4. ستنتقل لصفحة التعديل مع بيانات المنتج
5. عدل ما تريد
6. اضغط "Save Edit"

---

## 🗄️ أسئلة MongoDB

### س6: ما هي رسالة "MongoDB unavailable"؟
**الرسالة الكاملة:**
```
⚠️ MongoDB unavailable, using in-memory fallback
```

**السبب:**
- MongoDB مش متصل

**الحل:**
1. افتح [MONGODB_SETUP.md](MONGODB_SETUP.md)
2. اتبع "الخطوة 3: Network Access"
3. أضف `0.0.0.0/0`
4. انتظر 2 دقيقة
5. أعد تشغيل السيرفر

---

### س7: كيف أتأكد أن MongoDB شغال؟
```cmd
npm run test:mongo
```

**إذا رأيت:**
```
✅ Successfully connected to MongoDB!
```
يبقى كل شيء تمام ✅

**إذا رأيت:**
```
❌ MongoDB connection failed
```
افتح [MONGODB_SETUP.md](MONGODB_SETUP.md)

---

### س8: أين أجد رابط MongoDB؟
**في ملف `.env`:**
```
MONGODB_URI=mongodb+srv://...
```

**للحصول على رابط جديد:**
1. https://cloud.mongodb.com
2. Connect → Drivers
3. انسخ الرابط
4. استبدل `<password>` بكلمة المرور
5. أضف `/mona_beauty` قبل `?`

---

### س9: كيف أشوف البيانات في MongoDB؟
1. https://cloud.mongodb.com
2. Database → Browse Collections
3. Database: `mona_beauty`
4. Collections: `products` أو `orders`

---

## 🔧 أسئلة تقنية

### س10: ما هي المنافذ (Ports) المستخدمة؟
- **3001** - API Server (Backend)
- **5173** - Vite Dev Server (Frontend)

---

### س11: كيف أغير منفذ السيرفر؟
**في ملف `server.js`:**
```javascript
const PORT = 3001; // غير هذا الرقم
```

**في ملف `vite.config.ts`:**
```typescript
proxy: {
  "/api": {
    target: "http://localhost:3001", // غير هنا أيضاً
  }
}
```

---

### س12: ما الفرق بين dev و dev:api و dev:vite؟
- `npm run dev` - يشغل API + Frontend معاً ✅ (استخدم هذا)
- `npm run dev:api` - يشغل API Server فقط
- `npm run dev:vite` - يشغل Frontend فقط

---

### س13: كيف أوقف السيرفر؟
اضغط `Ctrl+C` في Terminal

---

## 🐛 أسئلة المشاكل

### س14: لما أضيف منتج في Admin، مش بيظهر في الموقع، ليه؟
**السبب:**
- Cache في المتصفح

**الحل:**
1. اعمل Hard Refresh: `Ctrl+Shift+R`
2. أو افتح الموقع في Private Window
3. أو امسح Cache من المتصفح

---

### س15: لما أحذف منتج، بيرجع تاني بعد Refresh؟
**السبب:**
- MongoDB مش متصل
- المشروع يستخدم in-memory data

**الحل:**
1. شغل `npm run test:mongo`
2. إذا فشل، افتح [MONGODB_SETUP.md](MONGODB_SETUP.md)
3. اتبع الخطوات
4. أعد تشغيل السيرفر

---

### س16: صفحة المنتج مش بتفتح (Cannot GET /products/1)
**السبب:**
- تم إصلاح هذه المشكلة! ✅

**إذا لازالت المشكلة موجودة:**
1. تأكد من MongoDB متصل
2. شغل `npm run test:mongo`
3. تأكد من وجود منتجات في قاعدة البيانات
4. افتح Console (F12) وشوف الأخطاء

---

### س17: زر "Proceed to checkout" مش شغال
**الحل:**
1. افتح Console (F12)
2. شوف الأخطاء
3. تأكد من أن الرابط: `http://localhost:5173/checkout`
4. جرب فتح الرابط مباشرة في المتصفح

---

### س18: رسالة "Invalid credentials" في تسجيل الدخول
**الأسباب:**
1. Email أو Password خطأ
2. API Server مش شغال

**الحل:**
1. تأكد من البيانات:
   - Email: `admin@monabeauty.com`
   - Password: `admin123`
2. افتح: http://localhost:3001/api/products
3. إذا لم تفتح، السيرفر مش شغال:
   ```cmd
   Ctrl+C
   npm run dev
   ```

---

### س19: خطأ "Port 3001 is already in use"
**السبب:**
- في process آخر يستخدم نفس المنفذ

**الحل (Windows):**
```cmd
# 1. اعرف رقم الـ Process
netstat -ano | findstr :3001

# 2. اقفل الـ Process
taskkill /PID [رقم_البروسس] /F

# 3. شغل المشروع
npm run dev
```

---

## 📱 أسئلة الاستخدام

### س20: كيف أضيف منتج للمفضلة (Wishlist)؟
1. في صفحة المنتج، اضغط على أيقونة القلب ❤️
2. أو في كارد المنتج، اضغط Quick Order ثم القلب

---

### س21: كيف أضيف منتج للسلة (Cart)؟
**طريقة 1:** في صفحة المنتج، اضغط "Add to Cart"  
**طريقة 2:** اضغط Quick Order ثم "Add to Cart"

---

### س22: كيف أشوف الطلبات (Orders) في Admin?
1. سجل دخول Admin
2. اذهب لـ Tab "Orders"
3. ستشاهد جميع الطلبات مع تفاصيلها

---

### س23: كيف أغير حالة الطلب (Order Status)?
1. في Admin → Orders Tab
2. تحت كل طلب، في زر "Change Status"
3. اختر الحالة الجديدة:
   - Pending (قيد الانتظار)
   - Processing (قيد المعالجة)
   - Shipped (تم الشحن)
   - Delivered (تم التوصيل)
   - Cancelled (ملغي)

---

## 🎨 أسئلة التصميم

### س24: كيف أغير ألوان الموقع؟
الألوان في ملف CSS/Tailwind config.

**في المستقبل:** سيتم إضافة Theme Customizer في Admin

---

### س25: كيف أغير الصور (Hero, Categories)?
الصور موجودة في:
```
src/assets/
├── hero.jpg
├── cat-hair.jpg
├── cat-makeup.jpg
└── ...
```

استبدل الصور بنفس الأسماء.

---

## 🔐 أسئلة الأمان

### س26: كيف أغير بيانات Admin؟
**في ملف `.env`:**
```
ADMIN_EMAIL=admin@monabeauty.com
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=mona-admin-secret-token
```

غيّر القيم وأعد تشغيل السيرفر.

---

### س27: هل 0.0.0.0/0 آمن في MongoDB؟
**للتطوير (Development):** ✅ مناسب  
**للإنتاج (Production):** ❌ غير آمن

**للأمان الأفضل:**
- استخدم IP محدد في Production
- فعّل Authentication
- استخدم SSL/TLS

---

## 📦 أسئلة النشر (Deployment)

### س28: كيف أنشر المشروع على الإنترنت؟
**خيارات:**
1. **Vercel** - للفرونت اند + Serverless Functions
2. **Heroku** - للتطبيق الكامل
3. **Railway** - سهل الاستخدام
4. **DigitalOcean** - VPS

**ملف `api/` مصمم لـ Vercel Serverless Functions**

---

### س29: هل يجب تغيير شيء قبل النشر؟
✅ نعم:
1. غيّر بيانات Admin في `.env`
2. غيّر Network Access في MongoDB لـ IP محدد
3. استخدم Environment Variables بدلاً من `.env` في Production
4. فعّل HTTPS

---

## 🔄 أسئلة التحديث

### س30: كيف أحدث المكتبات (Dependencies)?
```cmd
npm update
```

**للتحديث الكامل:**
```cmd
npm outdated               # شوف المكتبات القديمة
npm install <package>@latest  # حدّث مكتبة معينة
```

---

### س31: كيف أحدث Node.js?
1. حمّل أحدث إصدار من: https://nodejs.org
2. ثبّته
3. تأكد من الإصدار:
   ```cmd
   node --version
   npm --version
   ```

---

## 💡 نصائح

### س32: نصائح لتجنب المشاكل؟
1. ✅ دائماً شغل `npm run test:mongo` قبل البدء
2. ✅ تأكد من Network Access في MongoDB
3. ✅ اقرأ رسائل الأخطاء في Console (F12)
4. ✅ اعمل Refresh بعد أي تعديل
5. ✅ استخدم `Ctrl+Shift+R` للـ Hard Refresh

---

### س33: كيف أتعلم أكثر عن المشروع؟
1. اقرأ [README.md](README.md) - وثائق شاملة
2. اقرأ [INSTRUCTIONS_AR.md](INSTRUCTIONS_AR.md) - شرح بالعربي
3. افتح الكود واقرأه - أفضل طريقة للتعلم!
4. جرّب تعديلات بسيطة وشوف النتيجة

---

## 📞 أسئلة إضافية؟

إذا كان عندك سؤال غير موجود هنا:

1. ✅ افتح [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. ✅ افتح Console (F12) وشوف الخطأ
3. ✅ ابحث في Google عن رسالة الخطأ
4. ✅ اسأل في المجتمعات التقنية

---

**آخر تحديث:** 2024  
**الملفات ذات الصلة:**
- [START_HERE.md](START_HERE.md)
- [QUICK_START.md](QUICK_START.md)
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- [MONGODB_SETUP.md](MONGODB_SETUP.md)

**بالتوفيق! 🎉**
