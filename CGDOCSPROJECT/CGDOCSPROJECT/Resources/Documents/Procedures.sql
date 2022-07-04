use EmployeeTable
go

--create a store procedure for insertion into table employee_MaritalStatus
create procedure prc_insertStatus
					@MaritalStatus varchar(20),
					@CreatedBy varchar(30)
AS
Begin
Set NOCOUNT ON;
INSERT INTO employee_MaritalStatus
(
				MaritalStatus,
				CreatedBy
				)
VALUES
(
				@MaritalStatus,
				@CreatedBy
				)
end
Go
--Statement for execution
EXEC prc_insertStatus 
					@MaritalStatus='unmarried',
					@createdBy='Sourav'
go


select * from employee_MaritalStatus
go


--create a procedure for showing record of particular status id
create procedure prc_getStatus
							@user_id int
as
begin
SET NOCOUNT ON;
select maritalStatusId,MaritalStatus from employee_MaritalStatus 
where 
	maritalStatusId=@user_id
end
GO
--Statement for execution
EXEC prc_getStatus 
		@user_id=1
Go




--create a procedure for updating record of particular status id
create proc prc_UpdateMaritalStatus
@user_id int,
@status varchar(30),
@UpdatedBy varchar(30),
@IsActive bit
as
begin
set nocount on;
Update employee_MaritalStatus 
set 
	MaritalStatus=@status, 
	UpdatedBy=@UpdatedBy,
	UpdatedAt=GETDATE(),
	IsActive=@IsActive
where 
	maritalStatusId=@user_id
end
GO
--Statement for execution
Exec prc_UpdateMaritalStatus 
	@UpdatedBy='Sourav',
	@status='married',
	@user_Id=1,
	@IsActive=1
Go



--create a procedure for deleting record of particular status id
create proc prc_DeleteStatus
		@user_id int,
		@updatedBy varchar(30)
as
begin
set NOCOUNT on;
update employee_MaritalStatus 
set 
	IsDeleted=1,
	UpdatedBy=@updatedBy,
	UpdatedAt=getDate()
where 
	maritalStatusId=@user_id
end
go
--statement for execution
exec prc_DeleteStatus 
@user_id=1,
@UpdatedBy='sahil'
Go



--Creating a store procedure to insert records into Employee_Details
CREATE PROCEDURE prc_insertEmployeeDetails
		@FirstName varchar(30),
		@MiddleName varchar(30),
		@LastName varchar(30),
		@DOB nvarchar(40),
		@MaritalStatus int ,
		@MobileNumber bigint,
		@Landline bigint,
		@Email nvarchar(40),
		@Age int,
		@CreatedBy varchar(30)
AS
BEGIN
SET NOCOUNT ON;
-- inserting
INSERT INTO Employee_Details
( FirstName , MiddleName , LastName , DOB, MaritalStatus, MobileNumber, Landline , Email , Age  , CreatedBy)
VALUES
(@FirstName , @MiddleName , @LastName , @DOB, @MaritalStatus, @MobileNumber,@Landline , @Email , @Age , @CreatedBy )
END
--statement for execution
EXEC prc_insertEmployeeDetails 'Sahil' , 'Kumar' ,'Talwar' , '07/11/2000' , 1, 9315046709 ,2019212, 'sahil711@gmail.com' , 19 ,'sahil'  ;
Go
Select * from Employee_Details

--store procedure to see record from Employee details table
CREATE PROCEDURE prc_getEmployeeDetail
	@user_id int,
	@IsActive bit
AS
BEGIN
SET NOCOUNT ON;
--query to get particular record
select EmployeeId,FirstName,MiddleName,LastName,DOB,MaritalStatus,MobileNumber,Landline,Email,Age from Employee_Details 
where 
		EmployeeId = @user_id;
END
begin
Select case
		when @IsActive=0 
		then 'Account is InActive'
		when @IsActive=1 
		then 'Account is Active'
end
end
Go
--for execution of this store procedure
exec prc_getEmployeeDetail	
			@user_id=1,
			@IsActive=0;
Go



--Store procedure for updation in employee details table 
CREATE PROCEDURE UpdateEmployeeDetail
@user_id int,
@FirstName varchar(30),
@LastName varchar(30),
@DOB nvarchar(40),
@MaritalStatus int ,
@MobileNumber bigint,
@Email nvarchar(40),
@Age int,
@UpdatedBy varchar(30)

AS
BEGIN
SET NOCOUNT ON;
-- Updating details here
UPDATE Employee_Details 
SET 
	MaritalStatus = @MaritalStatus,
	FirstName=@FirstName,
	LastName=@LastName,
	DOB=@DOB,
	Email=@Email,
	Age=@Age ,
	MobileNumber = @MobileNumber,
	UpdatedBy=@UpdatedBy,
	UpdatedAt=GETDATE()
WHERE 
	EmployeeId = @user_id
END
go
--for execution of this store procedure
exec UpdateEmployeeDetail 
			@user_id=1 ,
			@FirstName='sourav',
			@LastName='Talwar',
			@DOB='07/12/2000',
			@MaritalStatus=1,
			@MobileNumber= 9315046707,
			@Email='xyz@gmail.com',
			@Age=21 ,
			@UpdatedBy='kumar' ;
go



--Store procedure to soft delete from employee details table
CREATE PROCEDURE prc_DeleteEmployeeDetail
@delete_id int,
@UpdatedBy varchar(30)
AS
BEGIN
SET NOCOUNT ON;
--query for soft deletion we are just updating IsDeleted and IsActive in Table we are not deleting data.
UPDATE Employee_Details 
SET 
	IsDeleted=1,
	UpdatedBy=@UpdatedBy,
	UpdatedAt=GETDATE()
WHERE 
	EmployeeId = @delete_id
END
GO
--for execution of this store procedure
exec prc_DeleteEmployeeDetail
							@delete_id=1,
							@updatedBy='sourav';
GO