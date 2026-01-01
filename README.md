# Linkify – Bio-Link Aggregator Platform
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![OpenAI](https://img.shields.io/badge/OpenAI-%23412991.svg?style=for-the-badge&logo=openai&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

> **Final Project for Introduction to Software Engineering (CSC13002)**
>
> *Faculty of Information Technology, VNU-HCM University of Science*
---
## Introduction

Linkify là một nền tảng **Software-as-a-Service (SaaS)** được thiết kế nhằm giải quyết bài toán giới hạn liên kết (“One-Link Policy”) trên các nền tảng mạng xã hội phổ biến như TikTok và Instagram. Nền tảng cho phép người dùng — bao gồm Creators, KOLs và KOCs — xây dựng một trang **landing page cá nhân hóa duy nhất**, tập trung toàn bộ liên kết quan trọng, sản phẩm, nội dung số và thông tin liên hệ.

Hệ thống được phát triển theo mô hình **Monolithic Architecture** với sự tách biệt rõ ràng giữa **Frontend** và **Backend**, đồng thời áp dụng các nguyên lý thiết kế phần mềm hiện đại như **Layered Architecture** và **Model–View–Controller (MVC)**. Cách tiếp cận này giúp đảm bảo tính mở rộng, khả năng bảo trì và tính nhất quán trong toàn bộ vòng đời phát triển phần mềm.

## Overview

Linkify hướng tới việc cung cấp một giải pháp liên kết tập trung, cho phép người dùng sử dụng **một đường dẫn duy nhất** (ví dụ: `linkify.me/username`) để điều hướng khán giả đến toàn bộ hệ sinh thái nội dung và sản phẩm của họ. Giải pháp này giúp loại bỏ nhu cầu thay đổi liên kết bio thường xuyên, đồng thời nâng cao hiệu quả tương tác và chuyển đổi.

Nền tảng được xây dựng với tư duy **product-centric**, trong đó trải nghiệm người dùng (User Experience) và khả năng hỗ trợ **monetization** cho Creator là trọng tâm thiết kế. Kiến trúc và luồng chức năng của hệ thống được tối ưu để phục vụ cả nhu cầu cá nhân hóa nội dung lẫn mục tiêu phát triển bền vững trong bối cảnh **Creator Economy**.

## System Architecture

Hệ thống Linkify được thiết kế theo mô hình **Client–Server Architecture**, trong đó Frontend và Backend được tách biệt rõ ràng và giao tiếp thông qua **RESTful APIs**. Cách tiếp cận này nhằm đảm bảo các yêu cầu cốt lõi về **scalability**, **maintainability** và **separation of concerns** trong suốt vòng đời phát triển phần mềm.

### Client-Side (Frontend)

Frontend của Linkify được xây dựng bằng **React.js (Vite)** và áp dụng **Layered Architecture**, cho phép tổ chức mã nguồn theo các tầng chức năng rõ ràng, giảm sự phụ thuộc chặt chẽ giữa giao diện và logic nghiệp vụ.

#### Presentation Layer

Tầng trình bày chịu trách nhiệm hiển thị và tương tác với người dùng, bao gồm:

- **Reusable UI Components**: Các thành phần giao diện tái sử dụng như Button, Input, Preview.
- **Pages (Smart Components)**: Các trang xử lý logic hiển thị và điều phối dữ liệu như LinksPage, DesignPage.
- **Layouts**: Quản lý cấu trúc và bố cục giao diện cho từng nhóm người dùng (AdminLayout, CreatorLayout).

#### Business Logic Layer

Tầng logic nghiệp vụ chịu trách nhiệm quản lý trạng thái và xử lý các quy trình ứng dụng:

- **Context API**: Quản lý trạng thái toàn cục của hệ thống (AuthContext, LinkContext, ShopContext).
- **Custom Hooks**: Đóng gói và tái sử dụng logic nghiệp vụ (useAuth, useLinks), giúp tăng tính mô-đun và khả năng kiểm thử.

#### Data Layer

Tầng dữ liệu đảm nhiệm việc giao tiếp với Backend và xử lý các vấn đề liên quan đến dữ liệu:

- **API Services**: Giao tiếp RESTful API thông qua Axios (authService, linkService).
- **Interceptors**: Tự động đính kèm JWT Token vào request và xử lý lỗi HTTP một cách tập trung.

### Server-Side (Backend)

Backend của Linkify được phát triển trên nền tảng **Node.js và Express.js**, tuân thủ mô hình **Model–View–Controller (MVC)** nhằm tách biệt rõ ràng giữa định tuyến, xử lý nghiệp vụ và truy cập dữ liệu.

#### Routing Layer

Chịu trách nhiệm định tuyến và phân phối request đến các controller tương ứng (auth, link, profile, shop).

#### Controller Layer

Tiếp nhận request từ client, thực hiện kiểm tra và xác thực dữ liệu đầu vào, sau đó điều phối luồng xử lý đến các service nghiệp vụ.

#### Business Service Layer

Xử lý các logic nghiệp vụ phức tạp và độc lập với tầng controller, bao gồm các dịch vụ như xử lý AI, kiểm duyệt nội dung và phân tích dữ liệu.

#### Data Access Layer (Models)

Định nghĩa các schema và thao tác dữ liệu với **MongoDB**, một hệ quản trị cơ sở dữ liệu NoSQL phù hợp cho dữ liệu phi cấu trúc như liên kết, logs và analytics (User, Link, Product).

#### Middleware Layer

Cung cấp các chức năng cắt ngang hệ thống, bao gồm:

- Xác thực và phân quyền bằng JWT.
- Upload và quản lý media thông qua Cloudinary.
- Xử lý lỗi tập trung và logging.

#### Third-Party Integrations

Hệ thống tích hợp với các dịch vụ bên thứ ba nhằm mở rộng chức năng:

- OpenAI: Cung cấp các tính năng AI.
- Cloudinary: Quản lý và phân phối media.
- Passport.js: Hỗ trợ xác thực OAuth.

## Functional Features and Use Cases

Hệ thống Linkify được thiết kế dựa trên **12 use cases cốt lõi**, được phân loại theo vai trò người dùng nhằm đảm bảo kiểm soát truy cập, phân quyền rõ ràng và tính mở rộng của nền tảng. Các use cases này phản ánh đầy đủ các luồng nghiệp vụ chính của hệ thống trong bối cảnh nền kinh tế sáng tạo.

### Core Use Cases by Role

| ID | Feature | Actor | Business Description |
|----|--------|-------|----------------------|
| U001 | Authentication | All Users | Hỗ trợ đăng ký và đăng nhập bằng Email/Password và OAuth (Google, Facebook). Mật khẩu được mã hóa và lưu trữ an toàn. |
| U002 | Profile Management | Creator | Quản lý thông tin hồ sơ cá nhân bao gồm avatar, tên hiển thị và bio. Hỗ trợ gợi ý nội dung bio thông qua AI. |
| U003 | Link Management | Creator | Tạo, cập nhật, xóa liên kết. Hỗ trợ sắp xếp thứ tự bằng kéo-thả và thiết lập lịch hiển thị/ẩn liên kết. |
| U004 | Theme Customization | Creator | Tùy chỉnh giao diện trang bio thông qua template, màu sắc và font chữ, kèm theo chức năng xem trước theo thời gian thực. |
| U005 | Public Bio Page and Interaction | Visitor | Hiển thị trang bio công khai, tối ưu cho thiết bị di động. Ghi nhận các sự kiện truy cập và tương tác (view, click). |
| U006 | Analytics and Insights | Creator | Cung cấp bảng điều khiển thống kê lượt xem, lượt nhấp và tỷ lệ chuyển đổi (CTR) theo thời gian. |
| U007 | User Management | Admin | Quản lý danh sách người dùng, hỗ trợ khóa hoặc mở khóa các tài khoản vi phạm. |
| U008 | Content Moderation | Admin | Rà soát và gỡ bỏ các liên kết vi phạm chính sách nền tảng như lừa đảo hoặc nội dung không phù hợp. |
| U009 | Creator Shop | Creator | Đăng tải và quản lý sản phẩm bao gồm hình ảnh, giá và liên kết mua hàng nhằm hỗ trợ affiliate hoặc bán hàng trực tiếp. |
| U010 | Donation Integration | Creator | Tích hợp chức năng nhận quyên góp thông qua liên kết thanh toán hoặc mã QR (ví dụ: ví điện tử, chuyển khoản ngân hàng). |
| U011 | AI Content Ideation | Creator | Ứng dụng generative AI để đề xuất ý tưởng nội dung dựa trên lĩnh vực và từ khóa của người dùng. |
| U012 | Administrative Dashboard | Admin | Cung cấp thống kê tổng quan toàn hệ thống, bao gồm số lượng người dùng và lưu lượng truy cập, nhằm giám sát trạng thái nền tảng. |

## Project Structure

Dự án Linkify được tổ chức theo mô hình **monorepo**, trong đó Frontend và Backend được quản lý trong cùng một repository nhưng tách biệt rõ ràng về không gian mã nguồn và trách nhiệm. Cấu trúc này hỗ trợ phát triển song song, kiểm soát phiên bản nhất quán và thuận lợi cho triển khai CI/CD.

### Overall Directory Layout

```bash
LINKIFY-PROJECT/
├── linkify-be/                # Backend (Node.js / Express)
│   ├── src/
│   │   ├── config/            # Cấu hình hệ thống (Database, Cloudinary, Environment)
│   │   ├── controllers/       # Xử lý request và điều phối luồng nghiệp vụ
│   │   ├── middleware/        # Middleware xác thực, upload, xử lý lỗi
│   │   ├── models/            # Mongoose Schemas (User, Link, Product, Analytic)
│   │   ├── routes/            # Định nghĩa RESTful API endpoints
│   │   ├── services/          # Business logic (AI, Analytics, Authentication)
│   │   ├── strategies/        # OAuth strategies (Google, Facebook)
│   │   ├── utils/             # Tiện ích dùng chung (Validators, Email, Helpers)
│   │   └── index.mjs          # Entry point của server
│   ├── .env                   # Biến môi trường Backend
│   └── package.json
│
└── linkify-fe/                # Frontend (React / Vite)
    ├── src/
    │   ├── components/        # UI components tái sử dụng
    │   ├── constants/         # Hằng số cấu hình (Themes, Fonts)
    │   ├── context/           # Global state management (Auth, Profile, Shop)
    │   ├── layouts/           # Layout wrappers (Dashboard, Public Profile)
    │   ├── pages/             # Các màn hình chức năng chính của ứng dụng
    │   ├── services/          # Tích hợp API (Axios-based services)
    │   ├── utils/             # Hàm tiện ích (format dữ liệu, helpers)
    │   ├── App.jsx            # Root component của ứng dụng
    │   └── main.jsx           # Điểm khởi tạo và render DOM
    ├── .env                   # Biến môi trường Frontend
    └── vite.config.js         # Cấu hình Vite
```
### Structural Design Rationale

Cấu trúc thư mục được thiết kế nhằm:

* Tăng cường **separation of concerns** giữa các tầng và module.
* Hỗ trợ **scalability** khi mở rộng tính năng hoặc đội ngũ phát triển.
* Dễ dàng bảo trì, kiểm thử và tái sử dụng mã nguồn.
* Phù hợp với kiến trúc đã mô tả ở phần *System Architecture* (Layered Architecture và MVC).

Cách tổ chức này đảm bảo tính nhất quán giữa kiến trúc logic và kiến trúc vật lý của hệ thống.

## Technology Stack

Hệ thống Linkify được xây dựng trên một tập hợp các công nghệ hiện đại, được lựa chọn nhằm đảm bảo hiệu năng, khả năng mở rộng, tính bảo trì và phù hợp với kiến trúc Client–Server đã đề xuất.

### Frontend

- React.js  
- Vite  
- Context API  
- React Router DOM  
- Axios  

### Backend

- Node.js  
- Express.js  

### Database

- MongoDB  
- Mongoose ODM  

### Authentication and Authorization

- JSON Web Token (JWT)  
- Passport.js (OAuth với Google và Facebook)  

### Cloud Services and External APIs

- Cloudinary (lưu trữ và phân phối media)  
- OpenAI API (các tính năng AI hỗ trợ nội dung)  

### Development and Deployment Tools

- Git (version control)  
- Postman (API testing)  
- Vercel (Frontend deployment)  

---

## Installation and Setup Guide

Phần này mô tả quy trình cài đặt và khởi chạy dự án trong môi trường phát triển cục bộ.

### Prerequisites

Trước khi cài đặt, cần đảm bảo các yêu cầu sau:

- Node.js phiên bản 16 trở lên  
- MongoDB (cài đặt cục bộ hoặc sử dụng MongoDB Atlas)  
- Tài khoản Cloudinary  
- OpenAI API Key (phục vụ các tính năng AI)  

### Backend Setup

```bash
cd linkify-be
npm install
````

Tạo file `.env` trong thư mục `linkify-be` và cấu hình các biến môi trường cần thiết:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=your_openai_api_key
```

Khởi chạy server:

```bash
npm start
```

Backend sẽ chạy tại: `http://localhost:5000`

### Frontend Setup

```bash
cd linkify-fe
npm install
```

Tạo file `.env` trong thư mục `linkify-fe` và cấu hình endpoint API:

```env
VITE_API_URL=http://localhost:5000/api
```

Khởi chạy ứng dụng frontend:

```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

