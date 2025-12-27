using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class makeReminderDurationNullableInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReminderDurationInMonths",
                table: "Equipment",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReminderDurationInMonths",
                table: "Equipment",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
