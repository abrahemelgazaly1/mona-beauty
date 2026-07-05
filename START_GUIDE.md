# دليل تشغيل MONA BEAUTY

## كيفية تشغيل المشروع

### 1. تشغيل السيرفر (API + Frontend)

```cmd
npm run dev
```

هذا الأمر سيشغل:
- API Server على `http://localhost:3001`
- Frontend (Vite) على `http://localhost:3000`

### 2. تشغيل السيرفر فقط (إذا كنت تريد تشغيله بشكل منفصل)

```cmd
npm run dev:api
```

### 3. تشغيل Frontend فقط

```cmd
npm run dev:vite
```

## الدخول إلى Admin Dashboard

### URL للوصول إلى Admin Login:
```
http://localhost:3000/admin/login
```

### بيانات الدخول:
- **Email:** admin@monabeauty.com
- **Password:** admin123

بعد تسجيل الدخول، سيتم تحويلك تلقائياً إلى صفحة Admin Dashboard على:
```
http://localhost:3000/admin
```

## حل المشاكل الشائعة

### المشكلة 1: MongoDB Connection Error
إذا ظهرت رسالة:
```
⚠️  MongoDB unavailable, using in-memory fallback: querySrv ECONNREFUSED
```

**الحل:**
1. تأكد من أن رابط MongoDB في ملف `.env` صحيح:
```
MONGODB_URI=mongodb+srv://abrahemelgazaly2_db_user:6vra83FsOl35r5y4@cluster0.scrz78b.mongodb.net/mona_beauty?retryWrites=true&w=majority&appName=Cluster0
```

2. تأكد من إعدادات MongoDB Atlas:
   - IP Whitelist يجب أن يحتوي على `0.0.0.0/0` (للسماح لجميع العناوين)
   - المستخدم `abrahemelgazaly2_db_user` له الصلاحيات الكاملة

### المشكلة 2: صفحة المنتج لا تفتح
إذا كان عند الضغط على منتج يظهر URL لكن لا تفتح الصفحة:

**السبب:** المنتجات يتم جلبها الآن من MongoDB، وليس من البيانات المحلية.

**الحل:**
1. تأكد من أن السيرفر يعمل على `localhost:3001`
2. افتح Console في المتصفح (F12) وشاهد الأخطاء
3. تأكد من أن MongoDB متصل بشكل صحيح

### المشكلة 3: Checkout لا يعمل
إذا كان زر "Proceed to Checkout" في صفحة Cart لا يحولك إلى صفحة Checkout:

**الحل:**
- الصفحة موجودة على: `http://localhost:3000/checkout`
- تأكد من أن هناك منتجات في السلة
- افتح Console وشاهد إذا كان هناك أخطاء في JavaScript

### المشكلة 4: Cannot GET /
إذا ظهرت هذه الرسالة عند الدخول إلى Frontend:

**الحل:**
1. تأكد من أن Vite Server يعمل على Port 3000
2. أعد تشغيل السيرفر بالكامل:
```cmd
npm run dev
```

### المشكلة 5: حذف المنتج لا يعمل
إذا كنت تحذف منتج من Admin Dashboard ولا يتم الحذف:

**السبب:** المشكلة في اتصال MongoDB أو في الـ Authorization Token.

**الحل:**
1. تأكد من تسجيل الدخول كـ Admin
2. افتح DevTools → Application → Local Storage
3. تأكد من وجود `admin_token` في Local Storage
4. تحقق من Console لمعرفة الخطأ

## الصفحات المتاحة

- **Home Page:** `http://localhost:3000/`
- **Products Page:** `http://localhost:3000/products`
- **Product Detail:** `http://localhost:3000/products/{product_id}`
- **Cart:** `http://localhost:3000/cart`
- **Checkout:** `http://localhost:3000/checkout`
- **Wishlist:** `http://localhost:3000/wishlist`
- **Admin Login:** `http://localhost:3000/admin/login`
- **Admin Dashboard:** `http://localhost:3000/admin` (يتطلب تسجيل دخول)

## ملاحظات مهمة

1. **الـ Port:** 
   - Frontend يعمل على Port 3000
   - Backend/API يعمل على Port 3001

2. **MongoDB:**
   - البيانات تُحفظ في MongoDB Atlas
   - إذا فشل الاتصال، سيتم استخدام In-Memory Database كبديل مؤقت
   - البيانات المؤقتة ستضيع عند إعادة تشغيل السيرفر

3. **الصور:**
   - الصور يتم تحويلها إلى Base64 قبل الحفظ في MongoDB
   - الحد الأقصى لحجم الصورة الواحدة: 5MB
   - عدد الصور الأقصى لكل منتج: 5 صور

4. **الطلبات (Orders):**
   - يتم حفظ الطلبات في MongoDB
   - يمكن للـ Admin رؤية جميع الطلبات من Dashboard
   - تحتوي على جميع بيانات العميل والدفع

## التواصل مع MongoDB Atlas

إذا كنت تريد الوصول إلى MongoDB Atlas مباشرة:

1. اذهب إلى: https://cloud.mongodb.com/
2. سجل دخول بالحساب المرتبط بالـ Cluster
3. اختر Cluster: `Cluster0`
4. اضغط على "Browse Collections" لرؤية البيانات

## API Endpoints

### Products
- `GET /api/products` - جلب كل المنتجات
- `GET /api/products/:id` - جلب منتج واحد
- `POST /api/products` - إضافة منتج جديد (يتطلب Admin Token)
- `PUT /api/products/:id` - تحديث منتج (يتطلب Admin Token)
- `PATCH /api/products/:id` - تحديث جزئي (Sold Out) (يتطلب Admin Token)
- `DELETE /api/products/:id` - حذف منتج (يتطلب Admin Token)

### Orders
- `GET /api/orders` - جلب كل الطلبات (يتطلب Admin Token)
- `POST /api/orders` - إنشاء طلب جديد
- `PATCH /api/orders/:id` - تحديث حالة الطلب (يتطلب Admin Token)
- `DELETE /api/orders/:id` - حذف طلب (يتطلب Admin Token)

### Auth
- `POST /api/auth/login` - تسجيل دخول Admin

## نصائح للتطوير

1. **إذا كنت تريد إضافة منتجات جديدة:**
   - سجل دخول كـ Admin
   - اذهب إلى "Add Product" tab
   - املأ البيانات وارفع الصور
   - اضغط "Add Product"

2. **إذا كنت تريد تعديل منتج:**
   - من "Manage Products" tab
   - اضغط "Edit" على المنتج المطلوب
   - سيتم فتح صفحة "Add Product" مع البيانات الموجودة
   - عدّل واضغط "Save Edit"

3. **لمراجعة الطلبات:**
   - اذهب إلى "Orders" tab
   - ستجد جميع الطلبات مع جميع التفاصيل
   - يمكنك تغيير حالة الطلب أو حذفه
