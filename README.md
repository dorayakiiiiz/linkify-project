# Linkify – Bio-Link Aggregator Platform

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

