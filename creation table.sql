create database cgdocs;
use cgdocs
go

create table users(
User_Id int identity(1,1) primary key,
Username nvarchar(100) unique,
Password nvarchar(30),
CreatedAt smalldatetime
)

create table folders(
folders_Id int identity(1,1) primary key,
folder_name nvarchar(100),
CreatedBy int FOREIGN KEY REFERENCES users(User_Id),
CreatedAt smalldatetime,
IsDeleted bit
)
create table documents(
Document_Id int identity(1,1) primary key,
Document_Name nvarchar(100),
Content_Type nvarchar(100),
Size int,
CreatedBy int FOREIGN KEY REFERENCES users(User_Id),
CreatedAt smalldatetime,
FolderId int FOREIGN KEY REFERENCES folders(folders_Id),
IsDeleted bit
)
insert into users values
('admin','root','2022-05-30 14:50:00')
insert into folders values
('folder1','3','2022-05-30 14:52:00',0)
insert into documents values
('doc1','text',10,3,'2022-05-30 14:53:00',1,0)