# MONA BEAUTY - E-commerce Website

## كيفية تشغيل المشروع

### 1. تثبيت المكتبات
```cmd
npm install
```

### 2. تشغيل السيرفر

يجب تشغيل السيرفر من terminal واحد:
```cmd
npm run dev
```

هذا الأمر سيشغل:
- API Server على المنفذ: `http://localhost:3001`
- Frontend (Vite) على المنفذ: `http://localhost:5173`

### 3. الدخول للموقع
افتح المتصفح على: `http://localhost:5173`

### 4. الدخول لـ Admin Dashboard

#### الطريقة الأولى - من خلال الرابط:
اذهب مباشرة إلى: `http://localhost:5173/admin/login`

#### بيانات تسجيل الدخول:
- **Email:** `admin@monabeauty.com`
- **Password:** `admin123`

بعد تسجيل الدخول ستُحول تلقائياً إلى: `http://localhost:5173/admin`

---

## الإعدادات (Environment Variables)

ملف `.env` يحتوي على:
```
MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
ADMIN_TOKEN=mona-admin-secret-token
ADMIN_EMAIL=admin@monabeauty.com
ADMIN_PASSWORD=admin123
```

---

## حل المشاكل الشائعة

### مشكلة: "Cannot GET /"
**الحل:** تأكد أن السيرفر شغال على المنفذ 3001 والفرونت اند على 5173

### مشكلة: "MongoDB unavailable"
**الحل:** 
1. تأكد من صحة رابط MongoDB في ملف `.env`
2. تأكد من الاتصال بالإنترنت
3. تأكد من السماح للـ IP address في MongoDB Atlas (Network Access > 0.0.0.0/0)

### مشكلة: صفحة تفاصيل المنتج لا تفتح
**الحل:** تم إصلاح هذه المشكلة - الآن الصفحة تجلب البيانات من MongoDB بدلاً من البيانات المحلية

### مشكلة: زر "Proceed to checkout" لا يعمل
**الحل:** تأكد من أن المسار `/checkout` موجود في الراوتر

---

## البنية الأساسية للمشروع

```
MONA BEAUTY/
├── api/                    # API Routes (Serverless Functions)
│   ├── auth/
│   │   └── login.js       # تسجيل دخول الـ Admin
│   ├── orders/
│   ├── products/
│   └── _lib/
│       ├── db.js          # الاتصال بـ MongoDB
│       └── utils.js       # Helper Functions
├── src/
│   ├── routes/            # صفحات الموقع
│   │   ├── index.tsx      # الصفحة الرئيسية
│   │   ├── products.tsx   # صفحة المنتجات
│   │   ├── products.$id.tsx  # تفاصيل المنتج
│   │   ├── cart.tsx       # سلة المشتريات
│   │   ├── checkout.tsx   # صفحة الدفع
│   │   ├── wishlist.tsx   # المفضلة
│   │   └── admin/
│   │       ├── login.tsx  # تسجيل دخول الـ Admin
│   │       └── index.tsx  # لوحة تحكم الـ Admin
│   ├── components/        # المكونات
│   ├── lib/
│   │   └── api.ts        # API Client Functions
│   └── data/
│       └── products.ts    # بيانات المنتجات المحلية (للنسخ الاحتياطي)
├── server.js              # Express API Server
└── .env                   # إعدادات البيئة
```

---

## الملاحظات المهمة

1. **MongoDB Connection**: السيرفر يستخدم MongoDB Atlas، وفي حالة فشل الاتصال يستخدم بيانات محلية (in-memory fallback)

2. **Admin Authentication**: يتم حفظ الـ token في localStorage بعد تسجيل الدخول

3. **API Proxy**: Vite يقوم بتوجيه جميع طلبات `/api/*` إلى `http://localhost:3001`

4. **Port Configuration**:
   - API Server: Port 3001
   - Frontend Dev Server: Port 5173

---

## أوامر NPM المتاحة

```cmd
npm run dev          # تشغيل السيرفر والفرونت اند معاً
npm run dev:api      # تشغيل API Server فقط
npm run dev:vite     # تشغيل Vite Dev Server فقط
npm run build        # بناء المشروع للـ Production
npm run preview      # معاينة النسخة المبنية
```
