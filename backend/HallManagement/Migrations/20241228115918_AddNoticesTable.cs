using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HallManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddNoticesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UploadFile",
                table: "Notices");

            migrationBuilder.AddColumn<string>(
                name: "NoticeFile",
                table: "Notices",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9718));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9723));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9724));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9725));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9726));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9752));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9755));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9756));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9758));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9759));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9538));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9564));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9566));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9568));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9571));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9780));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9784));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9787));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9788));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9789));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9815));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9858));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9862));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9864));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 17, 59, 17, 932, DateTimeKind.Local).AddTicks(9867));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NoticeFile",
                table: "Notices");

            migrationBuilder.AddColumn<string>(
                name: "UploadFile",
                table: "Notices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(508));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(516));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(517));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(519));

            migrationBuilder.UpdateData(
                table: "HallBlocks",
                keyColumn: "HallBlockId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(520));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(545));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(549));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(550));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(551));

            migrationBuilder.UpdateData(
                table: "HallFloors",
                keyColumn: "HallFloorId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(552));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(280));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(303));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(305));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(307));

            migrationBuilder.UpdateData(
                table: "Halls",
                keyColumn: "HallId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(343));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(575));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(580));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(581));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(582));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(583));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(608));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(619));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(622));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(624));

            migrationBuilder.UpdateData(
                table: "Students",
                keyColumn: "StudentId",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2024, 12, 28, 16, 46, 28, 289, DateTimeKind.Local).AddTicks(626));
        }
    }
}
