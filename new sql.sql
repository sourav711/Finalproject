create database CG_DOCS;
use CG_DOCS
go

create table Users
(
					User_Id int identity(1,1) primary key,
					Username nvarchar(100) not null unique,
					Password nvarchar(30) not null,
					CreatedAt smalldatetime default(GetDate()),
					Email nvarchar(100),
					Gender varchar(30),
					Mobile bigint,
)

create table Folder
(
					Folder_Id int identity(1,1) primary key,
					Folder_name nvarchar(100),
					CreatedBy int FOREIGN KEY REFERENCES users(User_Id),
					CreatedAt smalldatetime default(GETDATE()),
					IsDeleted bit default 0,
					IsFavourite bit default 0
)
create table Files
(
						Document_Id int identity(1,1) primary key,
						Document_Name nvarchar(100),
						Content_Type nvarchar(100),
						Size bigint,
						CreatedBy int FOREIGN KEY REFERENCES users(User_Id),
						FolderId int FOREIGN KEY REFERENCES Folder(Folder_Id),
						CreatedAt smalldatetime default(GETDATE()),
						IsDeleted bit default 0,
						FavouriteFiles bit default 0
)
insert into Users values
('admin','root',GETDATE(),'xyz@gmail.com','Male',9996563779)
insert into Folder values
('folder1','1',GETDATE(),0,0)
insert into Files values
('File1','text',2019,1,1,GETDATE(),0,0)

select * from Users