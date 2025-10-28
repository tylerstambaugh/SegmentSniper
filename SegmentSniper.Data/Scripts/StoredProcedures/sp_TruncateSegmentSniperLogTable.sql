USE [SegmentSniper]
GO

CREATE PROCEDURE [dbo].[TruncateSegmentSniperLogTable]
AS
BEGIN
    SET NOCOUNT ON;

    -- Delete all records except the most recent 2,500
    DELETE FROM [dbo].[SegmentSniperLog]
    WHERE [Id] NOT IN (
        SELECT TOP 2500 [Id]
        FROM [dbo].[SegmentSniperLog]
        ORDER BY [TimeStamp] DESC
    );
END
GO