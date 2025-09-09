IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = N'SegmentSniperDb')
BEGIN
    CREATE DATABASE SegmentSniperDb;
END;
GO
USE SegmentSniperDb;
GO


IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [StravaWebhookSubscription] (
    [Id] int NOT NULL IDENTITY,
    [StravaWebhookSubscriptionId] int NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_StravaWebhookSubscription] PRIMARY KEY ([Id])
);

CREATE TABLE [Users] (
    [AuthUserId] nvarchar(255) NOT NULL,
    [StravaRefreshToken] nvarchar(max) NULL,
    [StravaTokenExpiresAt] bigint NOT NULL,
    [StravaTokenExpiresIn] bigint NOT NULL,
    [StravaAthleteId] bigint NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([AuthUserId])
);

CREATE TABLE [Bikes] (
    [BikeId] nvarchar(450) NOT NULL,
    [AuthUserId] nvarchar(255) NOT NULL,
    [IsPrimary] bit NOT NULL,
    [Name] nvarchar(max) NULL,
    [Description] nvarchar(max) NULL,
    [BrandName] nvarchar(max) NULL,
    [ModelName] nvarchar(max) NULL,
    [ModelYear] int NULL,
    [FrameType] nvarchar(max) NULL,
    [MetersLogged] float NOT NULL,
    [DateAdded] datetime2 NOT NULL,
    [ImportedFromStrava] bit NOT NULL,
    CONSTRAINT [PK_Bikes] PRIMARY KEY ([BikeId]),
    CONSTRAINT [FK_Bikes_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId]) ON DELETE CASCADE
);

CREATE TABLE [ML_SegmentEfforts] (
    [SegmentEffortId] int NOT NULL IDENTITY,
    [AuthUserId] nvarchar(255) NOT NULL,
    [StravaSegmentEffortId] nvarchar(max) NOT NULL,
    [StravaSegmentId] nvarchar(max) NOT NULL,
    [SegmentName] nvarchar(max) NOT NULL,
    [ElapsedTime] int NOT NULL,
    [SegmentPrTime] int NOT NULL,
    [Distance] float NOT NULL,
    [AverageSpeed] float NULL,
    [MaximumSpeed] float NULL,
    [ElevationGain] float NULL,
    [AverageGrade] float NULL,
    [MaximumGrade] float NULL,
    [AverageHeartRate] float NULL,
    [KomTime] int NULL,
    [QomTime] int NULL,
    [AthleteCount] int NULL,
    [EffortCount] int NULL,
    [StarCount] int NULL,
    [PrRank] int NULL,
    [Rank] int NULL,
    CONSTRAINT [PK_ML_SegmentEfforts] PRIMARY KEY ([SegmentEffortId]),
    CONSTRAINT [FK_ML_SegmentEfforts_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId]) ON DELETE CASCADE
);

CREATE TABLE [ML_SegmentPredictionModels] (
    [Id] nvarchar(450) NOT NULL,
    [AuthUserId] nvarchar(255) NOT NULL,
    [SegmentPredictionModelData] varbinary(max) NOT NULL,
    [CreatedDate] datetime2 NOT NULL,
    [UpdatedDate] datetime2 NOT NULL,
    CONSTRAINT [PK_ML_SegmentPredictionModels] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ML_SegmentPredictionModels_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId]) ON DELETE CASCADE
);

CREATE TABLE [SegmentPredictionRegressionMetrics] (
    [Id] int NOT NULL IDENTITY,
    [AuthUserId] nvarchar(255) NOT NULL,
    [RegressionType] nvarchar(max) NOT NULL,
    [NumberOfLeaves] int NOT NULL,
    [MinimumExampleCountPerLeaf] int NOT NULL,
    [LearningRate] float NOT NULL,
    [NumberOfTrees] int NOT NULL,
    [MeanAbsoluteError] float NULL,
    [MeanSquaredError] float NULL,
    [RootMeanSquaredError] float NULL,
    [LossFunction] float NULL,
    [RSquared] float NULL,
    CONSTRAINT [PK_SegmentPredictionRegressionMetrics] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_SegmentPredictionRegressionMetrics_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId]) ON DELETE CASCADE
);

CREATE TABLE [BikeActivities] (
    [BikeActivityId] uniqueidentifier NOT NULL,
    [AuthUserId] nvarchar(255) NOT NULL,
    [BikeId] nvarchar(450) NOT NULL,
    [StravaActivityId] nvarchar(450) NOT NULL,
    [ActivityDate] datetime2 NOT NULL,
    [DistanceInMeters] float NOT NULL,
    CONSTRAINT [PK_BikeActivities] PRIMARY KEY ([BikeActivityId]),
    CONSTRAINT [FK_BikeActivities_Bikes_BikeId] FOREIGN KEY ([BikeId]) REFERENCES [Bikes] ([BikeId]) ON DELETE CASCADE,
    CONSTRAINT [FK_BikeActivities_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId])
);

CREATE TABLE [Equipment] (
    [EquipmentId] nvarchar(450) NOT NULL,
    [BikeId] nvarchar(450) NOT NULL,
    [AuthUserId] nvarchar(255) NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [Description] nvarchar(max) NULL,
    [MilesLogged] decimal(18,2) NOT NULL,
    [InstallDate] datetime2 NULL,
    [RetiredDate] datetime2 NULL,
    [Price] decimal(18,2) NOT NULL,
    [ReplaceAtMiles] int NOT NULL,
    [MilesUntilReplaceReminder] int NOT NULL,
    CONSTRAINT [PK_Equipment] PRIMARY KEY ([EquipmentId]),
    CONSTRAINT [FK_Equipment_Bikes_BikeId] FOREIGN KEY ([BikeId]) REFERENCES [Bikes] ([BikeId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Equipment_Users_AuthUserId] FOREIGN KEY ([AuthUserId]) REFERENCES [Users] ([AuthUserId])
);

CREATE INDEX [IX_BikeActivities_AuthUserId] ON [BikeActivities] ([AuthUserId]);

CREATE INDEX [IX_BikeActivities_BikeId] ON [BikeActivities] ([BikeId]);

CREATE UNIQUE INDEX [IX_BikeActivities_StravaActivityId] ON [BikeActivities] ([StravaActivityId]);

CREATE INDEX [IX_Bikes_AuthUserId] ON [Bikes] ([AuthUserId]);

CREATE INDEX [IX_Equipment_AuthUserId] ON [Equipment] ([AuthUserId]);

CREATE INDEX [IX_Equipment_BikeId] ON [Equipment] ([BikeId]);

CREATE INDEX [IX_ML_SegmentEfforts_AuthUserId] ON [ML_SegmentEfforts] ([AuthUserId]);

CREATE INDEX [IX_ML_SegmentPredictionModels_AuthUserId] ON [ML_SegmentPredictionModels] ([AuthUserId]);

CREATE UNIQUE INDEX [IX_SegmentPredictionRegressionMetrics_AuthUserId] ON [SegmentPredictionRegressionMetrics] ([AuthUserId]);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20250828005814_initialCreate', N'9.0.8');

COMMIT;
GO

