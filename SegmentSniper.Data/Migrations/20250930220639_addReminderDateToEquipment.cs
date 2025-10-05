using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class addReminderDateToEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReminderDate",
                table: "Equipment",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ReminderDuration",
                table: "Equipment",
                type: "time",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReminderDate",
                table: "Equipment");

            migrationBuilder.DropColumn(
                name: "ReminderDuration",
                table: "Equipment");
        }
    }
}
