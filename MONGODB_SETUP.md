# 🗄️ إعداد MongoDB Atlas - خطوة بخطوة

## 📌 المشكلة الأساسية

عندما ترى هذه الرسالة:
```
⚠️ MongoDB unavailable, using in-memory fallback
```

**السبب:** MongoDB Atlas يمنع الاتصال من IP address الخاص بك

---

## ✅ الحل الكامل

### الخطوة 1: تسجيل الدخول لـ MongoDB Atlas

1. اذهب إلى: https://cloud.mongodb.com
2. سجل دخول بحسابك:
   - Username: `abrahemelgazaly2@gmail.com` (أو الإيميل الذي استخدمته)
   - Password: كلمة مرورك

### الخطوة 2: اختيار الـ Cluster

بعد تسجيل الدخول:
1. ستجد في الصفحة الرئيسية **Cluster0** (أو اسم الـ cluster الخاص بك)
2. تأكد أنه في حالة **Active** (أخضر)

### الخطوة 3: Network Access - الخطوة الأهم! ⭐

هذه الخطوة هي **أهم خطوة** لحل المشكلة:

1. من القائمة اليسرى، اضغط على **"Network Access"**
   
2. ستجد قائمة بـ IP Addresses المسموح لها بالاتصال
   
3. اضغط على الزر الأخضر **"+ ADD IP ADDRESS"**
   
4. ستظهر نافذة، اختر:
   - **الخيار الأول:** "ALLOW ACCESS FROM ANYWHERE"
   - أو اكتب يدوياً: `0.0.0.0/0`
   
5. اضغط **"Confirm"**

6. **انتظر 1-2 دقيقة** ⏰
   - MongoDB يحتاج وقت لتطبيق التغييرات
   - لا تستعجل!

### الخطوة 4: Database Access (اختياري - للتأكد)

1. من القائمة اليسرى، اضغط على **"Database Access"**

2. تأكد من وجود مستخدم اسمه: `abrahemelgazaly2_db_user`

3. تأكد أن الصلاحيات: **"Atlas Admin"** أو **"Read and write to any database"**

4. إذا كنت تريد تغيير كلمة المرور:
   - اضغط على **"EDIT"** بجانب المستخدم
   - اضغط **"Edit Password"**
   - اكتب كلمة مرور جديدة
   - احفظها في ملف `.env`

### الخطوة 5: الحصول على Connection String

1. ارجع للصفحة الرئيسية (اضغط **"Database"** من القائمة)

2. في **Cluster0**, اضغط على زر **"Connect"**

3. اختر **"Drivers"**

4. اختر:
   - Driver: **Node.js**
   - Version: أحدث إصدار

5. انسخ الـ **Connection String**:
   ```
   mongodb+srv://abrahemelgazaly2_db_user:<password>@cluster0.scrz78b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

6. **مهم جداً:**
   - استبدل `<password>` بكلمة المرور الفعلية (بدون أقواس `<>`)
   - أضف `/mona_beauty` قبل علامة الاستفهام `?`
   
   **مثال:**
   ```
   mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
   ```

7. افتح ملف `.env` والصق الرابط:
   ```
   MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
   ```

### الخطوة 6: اختبار الاتصال

1. افتح terminal في مجلد المشروع

2. شغل الاختبار:
   ```cmd
   npm run test:mongo
   ```

3. **النتيجة المتوقعة:**
   ```
   ✅ Successfully connected to MongoDB!
   📦 Available collections:
      - products
      - orders
   🛍️ Products in database: 12
   📋 Orders in database: 0
   ```

4. إذا رأيت **❌ Connection failed**:
   - انتظر دقيقة إضافية
   - تأكد من Network Access مرة أخرى
   - تأكد من كلمة المرور في `.env`

---

## 🔍 التحقق من البيانات في MongoDB

### عرض المنتجات:

1. في MongoDB Atlas، اضغط **"Database"**
2. في Cluster0، اضغط **"Browse Collections"**
3. اختر Database: **mona_beauty**
4. اختر Collection: **products**
5. ستشاهد جميع المنتجات

### عرض الطلبات:

1. نفس الخطوات السابقة
2. لكن اختر Collection: **orders**

---

## 🎯 Seed - إضافة منتجات أولية

إذا كانت قاعدة البيانات فارغة:

1. السيرفر سيضيف منتجات تلقائياً من ملف `data/db.json`

2. أو يمكنك استخدام:
   ```cmd
   node seed-mongo.mjs
   ```

3. ثم تحقق:
   ```cmd
   npm run test:mongo
   ```

---

## ⚠️ مشاكل شائعة وحلولها

### ❌ Error: querySrv ECONNREFUSED

**السبب:** IP address غير مسموح  
**الحل:** ارجع للخطوة 3 (Network Access)

### ❌ Error: Authentication failed

**السبب:** كلمة المرور خطأ  
**الحل:** 
1. تحقق من كلمة المرور في MongoDB Atlas (Database Access)
2. تأكد من الرابط في `.env` صحيح
3. تأكد من عدم وجود مسافات زائدة

### ❌ Error: connect ETIMEDOUT

**السبب:** مشكلة في الشبكة أو Firewall  
**الحل:**
1. تحقق من اتصال الإنترنت
2. جرب من شبكة أخرى
3. تعطيل الـ Firewall مؤقتاً للاختبار

### ❌ Error: Database not found

**السبب:** اسم قاعدة البيانات خطأ  
**الحل:** تأكد من وجود `/mona_beauty` في الرابط

---

## 📊 مراقبة الأداء

### عرض الإحصائيات:

1. في MongoDB Atlas، اذهب لـ **"Metrics"**
2. شاهد:
   - عدد الاتصالات النشطة
   - عدد العمليات (Operations)
   - استخدام التخزين

### Logs:

1. اذهب لـ **"Logs"**
2. شاهد سجل الاتصالات والأخطاء

---

## 🔐 أمان قاعدة البيانات

### ⚠️ تحذير: 0.0.0.0/0 يسمح لأي شخص بالمحاولة

**للأمان الأفضل:**

1. بدلاً من `0.0.0.0/0`, استخدم IP الخاص بك فقط:
   - في Network Access، اضغط "Add Current IP Address"
   - سيتم إضافة IP الحالي تلقائياً

2. **لكن:** كل ما يتغير الـ IP (إعادة تشغيل الراوتر، تغيير الشبكة)، ستحتاج لإضافته مرة أخرى

**الحل الوسط:**
- استخدم `0.0.0.0/0` في التطوير (Development)
- استخدم IP محدد في الإنتاج (Production)

---

## 📱 الاتصال من أجهزة أخرى

إذا أردت تشغيل المشروع من كمبيوتر آخر:

1. انسخ المشروع للكمبيوتر الجديد
2. انسخ ملف `.env` معه
3. شغل `npm install`
4. تأكد من Network Access في MongoDB (0.0.0.0/0)
5. شغل `npm run test:mongo`
6. شغل `npm run dev`

---

## ✅ Checklist نهائي

قبل أن تبدأ العمل، تأكد من:

- [ ] تسجيل الدخول لـ MongoDB Atlas
- [ ] Cluster في حالة Active
- [ ] Network Access يحتوي على 0.0.0.0/0
- [ ] ملف `.env` يحتوي على Connection String صحيح
- [ ] كلمة المرور في الرابط صحيحة
- [ ] `/mona_beauty` موجود في الرابط
- [ ] تم اختبار الاتصال بنجاح (`npm run test:mongo`)

---

**إذا اتبعت هذه الخطوات بدقة، سيعمل MongoDB 100% ✅**

**لو لسه في مشكلة، افتح [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**
