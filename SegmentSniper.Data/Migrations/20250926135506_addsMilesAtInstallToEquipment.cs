using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class addsMilesAtInstallToEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MilesLogged",
                table: "Equipment",
                newName: "TotalMilage");

            migrationBuilder.AddColumn<decimal>(
                name: "MilesAtInstall",
                table: "Equipment",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "Equipment",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MilesAtInstall",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "Equipment");

            migrationBuilder.RenameColumn(
                name: "TotalMilage",
                table: "Equipment",
                newName: "MilesLogged");
        }
    }
}
