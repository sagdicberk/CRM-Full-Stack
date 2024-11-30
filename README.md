# 📊 **CRM Projesi**

Bu proje, bir şirketin iş yaptığı diğer şirketleri, müşterileri ve çalışanları yönetebilmesi için geliştirilmiş bir **CRM (Müşteri İlişkileri Yönetimi)** sistemidir. Fırsatlar, görev yönetimi ve çalışanların performansı gibi süreçler kolayca takip edilebilir. Ayrıca kullanıcılar, yetkileri doğrultusunda uygulamaya erişim sağlar.

[Uygulama Tanıtım Videosu](https://youtu.be/TdUD6dezf8Q)

---

## 🚀 **Proje Özellikleri**

### 🏢 **Müşteri Yönetimi**

- Şirketin iş yaptığı diğer şirketleri görüntüleme ve yönetme.
- Müşterilere ait fırsatları takip etme.

### 📋 **Görev Yönetimi**

- Fırsatlara çalışan atama ve görüşmeler düzenleme.
- Atanmış görevleri izleme ve yönetme.

### 👥 **Çalışan Yönetimi**

- Çalışan bilgilerini görüntüleme ve güncelleme.
- Görev atamaları ile çalışanların performansını izleme.

### 📊 **İstatistik Sayfası**

- Uygulamadaki veriler grafikler üzerinde görselleştirilebilir.
- En fazla fırsat getiren 5 müşteri gibi analizler yapılabilir.

### 📝 **Profil Sayfası**

- Kullanıcıya atanmış görevler tablo halinde görüntülenir.
- Detaylı görev bilgileri için ayrı bir detay sayfası bulunur.

### 🔒 **Yetki Yönetimi**

- Kullanıcılar, yalnızca yetkili oldukları sayfaları görüntüleyebilir.

---

## ⚠️ **Eksikler ve Planlanan İyileştirmeler**

1. **Form Validasyonları:**  
   Bazı sayfalarda form validasyonları eksik.

2. **Görev Tamamlama Fonksiyonları:**  
   Görevlerin tamamlanması için gerekli fonksiyonlar mevcut, ancak iş mantığı henüz eklenmedi.

3. **RBAC (Rol Tabanlı Erişim Kontrolü):**  
   Frontend'de admin yetkisi belirtilmiş, ancak backend controller'larında gerekli düzenlemeler eksik.

4. **Bildirim Sistemi:**  
   Görev atamalarında bildirim gönderecek bir sistem planlanıyor.

5. **İstatistik Sayfası Hatası:**  
   Backend'de veri tipi hatası mevcut. Veri düzgün geliyor, ancak log hatası oluşuyor.

6. **ModelMapper**  
   Model Mapper ekleyerek Obje dönüşümleri daha kolay yönetilebilir.

---

## 🛠️ **Kullanılan Teknolojiler**

Projeyi çalıştırmadan önce aşağıdaki yazılımların yüklü ve uygun sürümlerde olduğundan emin olun:

### **Gereken Yazılımlar**

- **Java 17**
- **Angular 18**
- **PostgreSQL**

### **Diğer Teknolojiler ve Kütüphaneler**

- **Spring Boot 3.3.4**
- **Angular Libraries:** ngx-charts, Toastr, font-awesome, Tailwind CSS

---

## 🚀 **Kurulum Adımları**

### **1. Gerekli Yazılımların Kurulumu**

Java 17, Angular 18 ve PostgreSQL’in yüklü olduğundan emin olun.

### **2. Veritabanı Yapılandırması**

- PostgreSQL üzerinde **CRM** adında bir veritabanı oluşturun.
- PostgreSQL giriş bilgilerinizi `CRM/src/main/resources/application.properties` dosyasından güncelleyin.

### **3. Backend Uygulamasının Çalıştırılması**

Backend’i bir IDE (IntelliJ, Eclipse vb.) veya terminal üzerinden çalıştırabilirsiniz:

```bash
cd CRM
mvn spring-boot:run
```

### 4. **Angular Uygulamasının Çalıştırılması**

Angular uygulamasını çalıştırmak için terminalde şu adımları izleyin:

```bash
cd CRM-Angular
npm install
ng serve --open
```

### ⚠️ **Uyarı:**

- **CORS Ayarları:** Backend (8080) ve Frontend (4200) için varsayılan portları kullanmalısınız. Portlarda değişiklik yaparsanız, gerekli güncellemeleri unutmayın.
