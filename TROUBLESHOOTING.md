# 🔧 دليل حل المشاكل - MONA BEAUTY

## 🧪 اختبار الاتصال بـ MongoDB

قبل ما تشغل المشروع، جرب الأمر ده عشان تتأكد إن MongoDB شغال:

```cmd
npm run test:mongo
```

### النتيجة المتوقعة إذا كان كل شيء صحيح:
```
✅ .env file loaded
📍 MongoDB URI: mongodb+srv://abrahemelgazaly2_db_user:6vra83F...
🔄 Testing MongoDB connection...
✅ Successfully connected to MongoDB!
📦 Available collections:
   - products
   - orders
🛍️  Products in database: X
📋 Orders in database: X
✅ Test completed successfully!
```

### إذا ظهر خطأ:
```
❌ MongoDB connection failed
```

**اتبع الخطوات التالية:**

---

## 🔴 المشكلة #1: MongoDB Connection Failed

### الأسباب المحتملة:

#### 1. IP Address غير مسموح به في MongoDB Atlas

**الحل:**

1. اذهب إلى: https://cloud.mongodb.com
2. سجل دخول بحسابك
3. اختر Cluster الخاص بك (Cluster0)
4. من القائمة الجانبية، اضغط على **Network Access**
5. اضغط على **"+ ADD IP ADDRESS"**
6. اختر **"ALLOW ACCESS FROM ANYWHERE"**
7. سيظهر `0.0.0.0/0` (هذا يعني السماح لجميع الأجهزة)
8. اضغط **Confirm**
9. انتظر 1-2 دقيقة
10. جرب الاتصال مرة أخرى

#### 2. اسم المستخدم أو كلمة المرور خطأ

افتح ملف `.env` وتأكد من البيانات:
```
MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
```

**للتحقق من الرابط في MongoDB Atlas:**

1. اذهب إلى MongoDB Atlas
2. اضغط على **Database** من القائمة اليسرى
3. اضغط على **Connect** في cluster الخاص بك
4. اختر **Drivers**
5. انسخ Connection String الجديد
6. استبدل `<password>` بكلمة المرور الفعلية
7. استبدل `/test` بـ `/mona_beauty`
8. الصق الرابط الجديد في ملف `.env`

#### 3. الإنترنت مش شغال

تأكد من اتصالك بالإنترنت:
```cmd
ping google.com
```

إذا ظهرت استجابة، الإنترنت شغال ✅

---

## 🔴 المشكلة #2: Cannot GET / أو صفحة فارغة

### السبب:
السيرفر مش شغال أو في مشكلة في المنفذ

### الحل:

1. **اقفل أي terminal مفتوح:**
   - اضغط `Ctrl+C` في كل terminal
   
2. **تأكد من عدم وجود process على المنفذ 3001:**
   ```cmd
   netstat -ano | findstr :3001
   ```
   
   إذا وجدت process شغال، اقفله:
   ```cmd
   taskkill /PID [رقم_البروسس] /F
   ```

3. **شغل المشروع من جديد:**
   ```cmd
   npm run dev
   ```

4. **انتظر الرسائل التالية:**
   ```
   ✅  .env loaded, MONGODB_URI starts: mongodb+srv://abrahemelgaza
   ✅  MongoDB connected
   ✅  API server running at http://localhost:3001
   ```

---

## 🔴 المشكلة #3: صفحة تفاصيل المنتج لا تفتح

### السبب المحتمل:
الصفحة كانت تستخدم بيانات محلية بدلاً من MongoDB

### الحل:
✅ **تم إصلاح هذه المشكلة!**

الآن صفحة المنتجات تجلب البيانات من MongoDB مباشرة.

**للتأكد:**
1. افتح أي منتج من الموقع
2. انظر في URL: `http://localhost:5173/products/[ID]`
3. يجب أن تظهر صفحة التفاصيل

**إذا لم تظهر:**
- تأكد من أن MongoDB متصل (شغل `npm run test:mongo`)
- تأكد من وجود منتجات في قاعدة البيانات
- افتح Console في المتصفح (F12) وشوف الأخطاء

---

## 🔴 المشكلة #4: زر "Proceed to checkout" لا يعمل

### السبب:
مشكلة في التوجيه (Routing)

### الحل:

1. **تأكد من وجود الملف:**
   ```
   src\routes\checkout.tsx
   ```

2. **تأكد من أن الرابط صحيح في cart.tsx:**
   ```tsx
   <Link to="/checkout">Proceed to checkout</Link>
   ```

3. **جرب الدخول مباشرة:**
   افتح: `http://localhost:5173/checkout`
   
   إذا فتحت الصفحة، المشكلة في الـ Link
   إذا لم تفتح، المشكلة في الـ Route

4. **اعمل Refresh للصفحة:**
   اضغط `Ctrl+Shift+R` (Hard Refresh)

---

## 🔴 المشكلة #5: الحذف من Admin Dashboard لا يعمل

### السبب:
مشكلة في الاتصال بـ API أو MongoDB

### الحل:

1. **افتح Console في المتصفح (F12)**

2. **ابحث عن الأخطاء:**
   - إذا رأيت: `401 Unauthorized` → المشكلة في Token
   - إذا رأيت: `404 Not Found` → المشكلة في الرابط
   - إذا رأيت: `500 Internal Server Error` → المشكلة في السيرفر

3. **للمشكلة في Token:**
   - سجل خروج من Admin
   - سجل دخول مرة أخرى
   - جرب الحذف مرة أخرى

4. **للمشكلة في MongoDB:**
   - شغل `npm run test:mongo`
   - تأكد من الاتصال
   - أعد تشغيل السيرفر

5. **اعمل Refresh بعد الحذف:**
   - اضغط F5 أو اعمل Refresh للصفحة
   - يجب أن يختفي المنتج

---

## 🔴 المشكلة #6: MongoDB unavailable, using in-memory fallback

### الرسالة الكاملة:
```
⚠️  MongoDB unavailable, using in-memory fallback: querySrv ECONNREFUSED _mongodb._tcp.cluster0.scrz78b.mongodb.net
```

### السبب:
فشل الاتصال بـ MongoDB

### الحل:

#### الخطوة 1: تحقق من رابط MongoDB
افتح `.env` وتأكد من الرابط:
```
MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
```

#### الخطوة 2: تحقق من Network Access
اتبع خطوات **المشكلة #1** أعلاه

#### الخطوة 3: تحقق من الاتصال
```cmd
npm run test:mongo
```

#### الخطوة 4: أعد تشغيل السيرفر
```cmd
Ctrl+C
npm run dev
```

**ملاحظة:** إذا رأيت هذه الرسالة، المشروع سيستخدم بيانات محلية مؤقتة. أي تعديلات لن تُحفظ!

---

## 🔴 المشكلة #7: Invalid credentials في تسجيل الدخول للـ Admin

### السبب:
Email أو Password خطأ، أو API مش شغال

### الحل:

1. **تأكد من البيانات الصحيحة:**
   ```
   Email: admin@monabeauty.com
   Password: admin123
   ```

2. **تأكد من أن API شغال:**
   افتح في المتصفح: `http://localhost:3001/api/products`
   
   يجب أن ترى قائمة المنتجات بصيغة JSON

3. **تحقق من Console:**
   افتح F12 → Console
   ابحث عن رسالة: `POST http://localhost:3001/api/auth/login`

4. **إذا رأيت 404:**
   السيرفر مش شغال أو المسار خطأ
   
   **الحل:**
   ```cmd
   Ctrl+C
   npm run dev
   ```

---

## 📋 Checklist - قائمة التحقق قبل التشغيل

قبل ما تشغل المشروع، تأكد من:

- [ ] تم تثبيت Node.js
- [ ] تم تثبيت المكتبات (`npm install`)
- [ ] ملف `.env` موجود وبه البيانات الصحيحة
- [ ] MongoDB Atlas -> Network Access يسمح بـ 0.0.0.0/0
- [ ] لا يوجد process على المنفذ 3001
- [ ] الإنترنت شغال
- [ ] تم اختبار الاتصال بـ `npm run test:mongo`

---

## 🆘 إذا فشل كل شيء

### الحل النهائي:

1. **احذف node_modules:**
   ```cmd
   rmdir /s /q node_modules
   ```

2. **احذف package-lock.json:**
   ```cmd
   del package-lock.json
   ```

3. **أعد تثبيت المكتبات:**
   ```cmd
   npm install
   ```

4. **اختبر الاتصال:**
   ```cmd
   npm run test:mongo
   ```

5. **شغل المشروع:**
   ```cmd
   npm run dev
   ```

---

## 📞 معلومات إضافية

### كيف أعرف أن السيرفر شغال؟

افتح المتصفح واكتب:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api/products`

إذا فتحت الصفحات، كل شيء شغال ✅

### كيف أشوف البيانات في MongoDB؟

1. اذهب إلى MongoDB Atlas
2. اضغط على **Browse Collections**
3. اختر Database: `mona_beauty`
4. اختر Collection: `products` أو `orders`
5. شاهد البيانات

### كيف أضيف منتجات جديدة؟

1. اذهب إلى `http://localhost:5173/admin/login`
2. سجل دخول
3. في Tab "Add Product"
4. املأ البيانات
5. ارفع الصور
6. اضغط "Add Product"

---

## ✅ الخلاصة

معظم المشاكل تُحل بـ:

1. ✅ تشغيل `npm run test:mongo` للتحقق من MongoDB
2. ✅ التأكد من Network Access في MongoDB Atlas
3. ✅ إعادة تشغيل السيرفر (`Ctrl+C` ثم `npm run dev`)
4. ✅ فتح Console (F12) لرؤية الأخطاء
5. ✅ التأكد من أن الملف `.env` صحيح

---

**🎯 إذا واجهت مشكلة غير موجودة هنا، افتح Console (F12) وانسخ رسالة الخطأ.**
