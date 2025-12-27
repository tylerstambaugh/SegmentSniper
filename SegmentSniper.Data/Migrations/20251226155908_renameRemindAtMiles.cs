using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegmentSniper.Data.Migrations
{
    /// <inheritdoc />
    public partial class renameRemindAtMiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MilesUntilReplaceReminder",
                table: "Equipment",
                newName: "RemindAtMiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RemindAtMiles",
                table: "Equipment",
                newName: "MilesUntilReplaceReminder");
        }
    }
}
