using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StravaWebhookSubscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StravaWebhookSubscriptionId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StravaWebhookSubscription", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    StravaRefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StravaTokenExpiresAt = table.Column<long>(type: "bigint", nullable: false),
                    StravaTokenExpiresIn = table.Column<long>(type: "bigint", nullable: false),
                    StravaAthleteId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.AuthUserId);
                });

            migrationBuilder.CreateTable(
                name: "Bikes",
                columns: table => new
                {
                    BikeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrandName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModelName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModelYear = table.Column<int>(type: "int", nullable: true),
                    FrameType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MetersLogged = table.Column<double>(type: "float", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImportedFromStrava = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bikes", x => x.BikeId);
                    table.ForeignKey(
                        name: "FK_Bikes_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ML_SegmentEfforts",
                columns: table => new
                {
                    SegmentEffortId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    StravaSegmentEffortId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StravaSegmentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SegmentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ElapsedTime = table.Column<int>(type: "int", nullable: false),
                    SegmentPrTime = table.Column<int>(type: "int", nullable: false),
                    Distance = table.Column<double>(type: "float", nullable: false),
                    AverageSpeed = table.Column<double>(type: "float", nullable: true),
                    MaximumSpeed = table.Column<double>(type: "float", nullable: true),
                    ElevationGain = table.Column<double>(type: "float", nullable: true),
                    AverageGrade = table.Column<double>(type: "float", nullable: true),
                    MaximumGrade = table.Column<double>(type: "float", nullable: true),
                    AverageHeartRate = table.Column<double>(type: "float", nullable: true),
                    KomTime = table.Column<int>(type: "int", nullable: true),
                    QomTime = table.Column<int>(type: "int", nullable: true),
                    AthleteCount = table.Column<int>(type: "int", nullable: true),
                    EffortCount = table.Column<int>(type: "int", nullable: true),
                    StarCount = table.Column<int>(type: "int", nullable: true),
                    PrRank = table.Column<int>(type: "int", nullable: true),
                    Rank = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ML_SegmentEfforts", x => x.SegmentEffortId);
                    table.ForeignKey(
                        name: "FK_ML_SegmentEfforts_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ML_SegmentPredictionModels",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    SegmentPredictionModelData = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ML_SegmentPredictionModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ML_SegmentPredictionModels_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SegmentPredictionRegressionMetrics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    RegressionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NumberOfLeaves = table.Column<int>(type: "int", nullable: false),
                    MinimumExampleCountPerLeaf = table.Column<int>(type: "int", nullable: false),
                    LearningRate = table.Column<double>(type: "float", nullable: false),
                    NumberOfTrees = table.Column<int>(type: "int", nullable: false),
                    MeanAbsoluteError = table.Column<double>(type: "float", nullable: true),
                    MeanSquaredError = table.Column<double>(type: "float", nullable: true),
                    RootMeanSquaredError = table.Column<double>(type: "float", nullable: true),
                    LossFunction = table.Column<double>(type: "float", nullable: true),
                    RSquared = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SegmentPredictionRegressionMetrics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SegmentPredictionRegressionMetrics_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BikeActivities",
                columns: table => new
                {
                    BikeActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    BikeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StravaActivityId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ActivityDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DistanceInMeters = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BikeActivities", x => x.BikeActivityId);
                    table.ForeignKey(
                        name: "FK_BikeActivities_Bikes_BikeId",
                        column: x => x.BikeId,
                        principalTable: "Bikes",
                        principalColumn: "BikeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BikeActivities_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId");
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    EquipmentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BikeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuthUserId = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MilesLogged = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    InstallDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RetiredDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ReplaceAtMiles = table.Column<int>(type: "int", nullable: false),
                    MilesUntilReplaceReminder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.EquipmentId);
                    table.ForeignKey(
                        name: "FK_Equipment_Bikes_BikeId",
                        column: x => x.BikeId,
                        principalTable: "Bikes",
                        principalColumn: "BikeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Equipment_Users_AuthUserId",
                        column: x => x.AuthUserId,
                        principalTable: "Users",
                        principalColumn: "AuthUserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BikeActivities_AuthUserId",
                table: "BikeActivities",
                column: "AuthUserId");

            migrationBuilder.CreateIndex(
                name: "IX_BikeActivities_BikeId",
                table: "BikeActivities",
                column: "BikeId");

            migrationBuilder.CreateIndex(
                name: "IX_BikeActivities_StravaActivityId",
                table: "BikeActivities",
                column: "StravaActivityId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bikes_AuthUserId",
                table: "Bikes",
                column: "AuthUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_AuthUserId",
                table: "Equipment",
                column: "AuthUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Equipment_BikeId",
                table: "Equipment",
                column: "BikeId");

            migrationBuilder.CreateIndex(
                name: "IX_ML_SegmentEfforts_AuthUserId",
                table: "ML_SegmentEfforts",
                column: "AuthUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ML_SegmentPredictionModels_AuthUserId",
                table: "ML_SegmentPredictionModels",
                column: "AuthUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentPredictionRegressionMetrics_AuthUserId",
                table: "SegmentPredictionRegressionMetrics",
                column: "AuthUserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BikeActivities");

            migrationBuilder.DropTable(
                name: "Equipment");

            migrationBuilder.DropTable(
                name: "ML_SegmentEfforts");

            migrationBuilder.DropTable(
                name: "ML_SegmentPredictionModels");

            migrationBuilder.DropTable(
                name: "SegmentPredictionRegressionMetrics");

            migrationBuilder.DropTable(
                name: "StravaWebhookSubscription");

            migrationBuilder.DropTable(
                name: "Bikes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
