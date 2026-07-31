-- Orlando DB tables (matches current Prisma schema)
-- id = cuid (~25 chars) from Prisma — NVARCHAR(50) to stay under SQL Server 900-byte PK limit
-- Run after: CREATE DATABASE Orlando;  then USE Orlando;

USE Orlando;
GO

/* ========== User ========== */
CREATE TABLE [User] (
  [id]           NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [email]        NVARCHAR(255) NOT NULL,
  [name]         NVARCHAR(255) NOT NULL,
  [phone]        NVARCHAR(50)  NOT NULL,
  [passwordHash] NVARCHAR(255) NOT NULL,
  [role]         NVARCHAR(20)  NOT NULL CONSTRAINT [DF_User_role] DEFAULT (N'TENANT'), -- ADMIN | TENANT
  [createdAt]    DATETIME2     NOT NULL CONSTRAINT [DF_User_createdAt] DEFAULT (SYSUTCDATETIME()),
  [updatedAt]    DATETIME2     NOT NULL CONSTRAINT [DF_User_updatedAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
  CONSTRAINT [User_email_key] UNIQUE ([email])
);
GO

/* ========== Chalet ========== */
CREATE TABLE [Chalet] (
  [id]          NVARCHAR(50)   NOT NULL, -- cuid from Prisma
  [name]        NVARCHAR(255)  NOT NULL,
  [description] NVARCHAR(MAX)  NOT NULL,
  [location]    NVARCHAR(255)  NOT NULL,
  [price]       DECIMAL(10, 2) NOT NULL,
  [capacity]    INT            NOT NULL,
  [rating]      FLOAT          NULL,
  [features]    NVARCHAR(MAX)  NOT NULL, -- JSON array as string
  [isActive]    BIT            NOT NULL CONSTRAINT [DF_Chalet_isActive] DEFAULT ((1)),
  [createdAt]   DATETIME2      NOT NULL CONSTRAINT [DF_Chalet_createdAt] DEFAULT (SYSUTCDATETIME()),
  [updatedAt]   DATETIME2      NOT NULL CONSTRAINT [DF_Chalet_updatedAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [Chalet_pkey] PRIMARY KEY ([id])
);
GO

/* ========== ChaletImage ========== */
CREATE TABLE [ChaletImage] (
  [id]        NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [chaletId]  NVARCHAR(50)  NOT NULL,
  [url]       NVARCHAR(500) NOT NULL,
  [sortOrder] INT           NOT NULL CONSTRAINT [DF_ChaletImage_sortOrder] DEFAULT ((0)),
  CONSTRAINT [ChaletImage_pkey] PRIMARY KEY ([id]),
  CONSTRAINT [ChaletImage_chaletId_fkey]
    FOREIGN KEY ([chaletId]) REFERENCES [Chalet]([id]) ON DELETE CASCADE
);
GO
CREATE INDEX [ChaletImage_chaletId_idx] ON [ChaletImage]([chaletId]);
GO

/* ========== Booking ========== */
CREATE TABLE [Booking] (
  [id]              NVARCHAR(50)   NOT NULL, -- cuid from Prisma
  [userId]          NVARCHAR(50)   NOT NULL,
  [chaletId]        NVARCHAR(50)   NOT NULL,
  [checkIn]         DATE           NOT NULL,
  [checkOut]        DATE           NOT NULL,
  [guestCount]      INT            NOT NULL,
  [specialRequests] NVARCHAR(MAX)  NULL,
  [totalPrice]      DECIMAL(10, 2) NOT NULL,
  [status]          NVARCHAR(20)   NOT NULL CONSTRAINT [DF_Booking_status] DEFAULT (N'PENDING'), -- PENDING | CONFIRMED | CANCELLED
  [bookingCode]     NVARCHAR(50)   NOT NULL,
  [createdAt]       DATETIME2      NOT NULL CONSTRAINT [DF_Booking_createdAt] DEFAULT (SYSUTCDATETIME()),
  [updatedAt]       DATETIME2      NOT NULL CONSTRAINT [DF_Booking_updatedAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [Booking_pkey] PRIMARY KEY ([id]),
  CONSTRAINT [Booking_bookingCode_key] UNIQUE ([bookingCode]),
  CONSTRAINT [Booking_userId_fkey]
    FOREIGN KEY ([userId]) REFERENCES [User]([id]),
  CONSTRAINT [Booking_chaletId_fkey]
    FOREIGN KEY ([chaletId]) REFERENCES [Chalet]([id])
);
GO
CREATE INDEX [Booking_chaletId_checkIn_checkOut_idx] ON [Booking]([chaletId], [checkIn], [checkOut]);
CREATE INDEX [Booking_userId_idx] ON [Booking]([userId]);
CREATE INDEX [Booking_status_idx] ON [Booking]([status]);
GO

/* ========== QrCode ========== */
CREATE TABLE [QrCode] (
  [id]        NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [bookingId] NVARCHAR(50)  NOT NULL,
  [token]     NVARCHAR(100) NOT NULL,
  [status]    NVARCHAR(20)  NOT NULL CONSTRAINT [DF_QrCode_status] DEFAULT (N'ACTIVE'), -- ACTIVE | USED | EXPIRED | REVOKED
  [validFrom] DATE          NOT NULL,
  [validTo]   DATE          NOT NULL,
  [usedAt]    DATETIME2     NULL,
  [createdAt] DATETIME2     NOT NULL CONSTRAINT [DF_QrCode_createdAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [QrCode_pkey] PRIMARY KEY ([id]),
  CONSTRAINT [QrCode_token_key] UNIQUE ([token]),
  CONSTRAINT [QrCode_bookingId_fkey]
    FOREIGN KEY ([bookingId]) REFERENCES [Booking]([id]) ON DELETE CASCADE
);
GO
CREATE INDEX [QrCode_bookingId_idx] ON [QrCode]([bookingId]);
CREATE INDEX [QrCode_status_idx] ON [QrCode]([status]);
GO

/* ========== Payment ========== */
CREATE TABLE [Payment] (
  [id]            NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [bookingId]     NVARCHAR(50)  NOT NULL,
  [transactionId] NVARCHAR(100) NOT NULL,
  [status]        NVARCHAR(20)  NOT NULL CONSTRAINT [DF_Payment_status] DEFAULT (N'SUCCESS'), -- SUCCESS | FAILED
  [createdAt]     DATETIME2     NOT NULL CONSTRAINT [DF_Payment_createdAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [Payment_pkey] PRIMARY KEY ([id]),
  CONSTRAINT [Payment_bookingId_key] UNIQUE ([bookingId]), -- 1:1 with Booking
  CONSTRAINT [Payment_transactionId_key] UNIQUE ([transactionId]),
  CONSTRAINT [Payment_bookingId_fkey]
    FOREIGN KEY ([bookingId]) REFERENCES [Booking]([id]) ON DELETE CASCADE
);
GO

/* ========== ContactMessage ========== */
CREATE TABLE [ContactMessage] (
  [id]        NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [name]      NVARCHAR(255) NOT NULL,
  [email]     NVARCHAR(255) NOT NULL,
  [phone]     NVARCHAR(50)  NOT NULL,
  [message]   NVARCHAR(MAX) NOT NULL,
  [createdAt] DATETIME2     NOT NULL CONSTRAINT [DF_ContactMessage_createdAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [ContactMessage_pkey] PRIMARY KEY ([id])
);
GO

/* ========== Alert ========== */
CREATE TABLE [Alert] (
  [id]        NVARCHAR(50)  NOT NULL, -- cuid from Prisma
  [type]      NVARCHAR(20)  NOT NULL CONSTRAINT [DF_Alert_type] DEFAULT (N'INFO'), -- INFO | WARNING | ERROR
  [message]   NVARCHAR(MAX) NOT NULL,
  [isRead]    BIT           NOT NULL CONSTRAINT [DF_Alert_isRead] DEFAULT ((0)),
  [createdAt] DATETIME2     NOT NULL CONSTRAINT [DF_Alert_createdAt] DEFAULT (SYSUTCDATETIME()),
  CONSTRAINT [Alert_pkey] PRIMARY KEY ([id])
);
GO
CREATE INDEX [Alert_isRead_idx] ON [Alert]([isRead]);
GO
