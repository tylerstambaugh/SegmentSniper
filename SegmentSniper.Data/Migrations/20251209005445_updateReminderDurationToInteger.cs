using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateReminderDurationToInteger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReminderDuration",
                table: "Equipment");

            migrationBuilder.AddColumn<int>(
                name: "ReminderDurationInMonths",
                table: "Equipment",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReminderDurationInMonths",
                table: "Equipment");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "ReminderDuration",
                table: "Equipment",
                type: "time",
                nullable: true);
        }
    }
}
