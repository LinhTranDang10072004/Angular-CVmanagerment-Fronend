-- Test script để kiểm tra kết nối database và dữ liệu
-- Chạy script này trong SQL Server Management Studio hoặc Azure Data Studio

USE cv_management;
GO

-- Kiểm tra các bảng đã được tạo
SELECT 
    TABLE_NAME,
    TABLE_TYPE
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'dbo'
ORDER BY TABLE_NAME;
GO

-- Kiểm tra dữ liệu trong bảng users
SELECT 
    user_id,
    username,
    email,
    full_name,
    created_at,
    updated_at
FROM users;
GO

-- Kiểm tra dữ liệu trong bảng roles
SELECT 
    role_id,
    role_name,
    description
FROM roles;
GO

-- Kiểm tra dữ liệu trong bảng user_roles
SELECT 
    ur.user_role_id,
    u.username,
    r.role_name
FROM user_roles ur
JOIN users u ON ur.user_id = u.user_id
JOIN roles r ON ur.role_id = r.role_id;
GO

-- Test query để lấy thông tin user với role
SELECT 
    u.user_id,
    u.username,
    u.email,
    u.full_name,
    u.created_at,
    u.updated_at,
    STRING_AGG(r.role_name, ', ') as roles
FROM users u
LEFT JOIN user_roles ur ON u.user_id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.role_id
GROUP BY u.user_id, u.username, u.email, u.full_name, u.created_at, u.updated_at;
GO
