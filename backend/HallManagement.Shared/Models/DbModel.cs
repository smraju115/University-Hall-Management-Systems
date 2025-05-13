using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace HallManagement.Shared.Models
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Picture { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Religion { get; set; }
        public string? AboutMe { get; set; }
        public string? OTP { get; set; }
        public DateTime? OTPExpireTime { get; set; }
        public int? RoleId { get; set; } = default!;
        public bool? IsActive { get; set; } = default!;
    }
    public class Feedback
    {
        public int FeedbackId { get; set; }
        //[Required, EnumDataType(typeof(FeedbackTypeEnum))]
        public string FeedbackType { get; set; } = default!;
        [Required, Column(TypeName = "date")]
        public DateTime DateSubmitted { get; set; } = default!;

        [Required]
        public int Rating { get; set; } = default!;

        [Required]
        [StringLength(200)]
        public string FeedbackDetails { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int? CreatedUserId { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; } = default!;

        public int? ModifiedUserId { get; set; } = default!;

        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }
        //Navigation
        public Student? Student { get; set; }
    }

    public class Hall
    {
        public int HallId { get; set; }

        [Required]
        [StringLength(100)]
        public string HallName { get; set; } = default!;
        //[Required, EnumDataType(typeof(HallTypeEnum))]
        public string HallType { get; set; } = default!;

        [Required]
        public int HallCapacity { get; set; } = default!; // number of students

        [Required]
        public int TotalRooms { get; set; } = default!;

        [Required, Column(TypeName = "date")]
        public DateTime YearInaugurated { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int? CreatedUserId { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; } = default!;

        public int? ModifiedUserId { get; set; } = default!;

        [Required]
        public bool IsActive { get; set; } = true;

        public ICollection<HallBlock> HallBlocks { get; set; } = [];

    }

    public class HallBlock
    {
        public int HallBlockId { get; set; }

        [Required]
        [StringLength(200)]
        public string BlockName { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public int? CreatedUserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedUserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required, ForeignKey("Hall")]
        public int HallId { get; set; }
        //Navigation
        public Hall? Hall { get; set; }

        public ICollection<HallFloor> HallFloors { get; set; } = [];
    }

    public class HallFloor
    {

        public int HallFloorId { get; set; }

        [Required]
        public int FloorNo { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int? CreatedUserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedUserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        [ForeignKey("HallBlock")]
        public int HallBlockId { get; set; }
        //Navigation
        public HallBlock? HallBlock { get; set; }
        public ICollection<Room> Rooms { get; set; } = [];
    }

    public class PaymentHistory
    {
        public int PaymentHistoryId { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentType { get; set; } = default!;

        [Required]
        [Column(TypeName = "money")]
        public decimal AmountPaid { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentVia { get; set; } = default!;

        [Required]
        [StringLength(30)]
        public string TransactionId { get; set; } = default!;
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int? CreatedUserId { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedUserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;

        [Required, ForeignKey("Student")]
        public int StudentId { get; set; }

        // Navigation Property
        public Student? Student { get; set; }
    }

    public class Room
    {
        public int RoomId { get; set; }

        [Required]
        [StringLength(20)]
        public string RoomNo { get; set; } = default!;

        [Required]
        public string RoomType { get; set; } = default!; //Single, Double, FourBed
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public int? CreatedUserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedUserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        [ForeignKey("HallFloor")]
        public int HallFloorId { get; set; }
        //Navigation
        public HallFloor? HallFloor { get; set; }

        public ICollection<SeatWithRoom> SeatWithRooms { get; set; } = [];


    }

    public class SeatWithRoom
    {
        public int SeatWithRoomId { get; set; }
        [Required]
        public int SeatNumber { get; set; }
        [Required]
        [Column(TypeName = "money")]
        public decimal RoomFare { get; set; }

        [Required]
        public bool IsBooked { get; set; } = false;
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int? CreatedUserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedUserId { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;
        [Required]
        [ForeignKey("Room")]

        public int RoomId { get; set; }

        //Navigation
        public Room? Room { get; set; }
        public ICollection<StudentRoom> StudentRooms { get; set; } = [];

    }

    public class Student
    {
        public int StudentId { get; set; }

        [Required]
        [StringLength(100)]
        public string StudentName { get; set; } = default!;

        [Required]
        [StringLength(100)]
        public string Department { get; set; } = default!;

        [Required]
        public int RegistrationNumber { get; set; }

        [Required]
        public int RollNumber { get; set; }

        [Required, Column(TypeName = "date")]
        public DateTime DoB { get; set; }
        [Required]
        public string Gender { get; set; } = default!;

        [Required]
        [StringLength(10)]
        public string Session { get; set; } = default!;
        [StringLength(100)]
        public string Picture { get; set; } = default!;

        [Required]
        [StringLength(20)]
        public string StudentPhone { get; set; } = default!;
        [StringLength(20)]
        public string? StudentAltPhone { get; set; } = default!;

        [Required]
        [EmailAddress]
        public string StudentEmail { get; set; } = default!;

        [Required]
        [StringLength(500)]
        public string PermanentAddress { get; set; } = default!;
        [Required]
        [StringLength(500)]
        public string PresentAddress { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public int? CreatedUserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedUserId { get; set; }
        [Required]
        public bool IsActive { get; set; } = true;


        //Navigation
        public ICollection<StudentRoom> StudentRooms { get; set; } = [];
        public ICollection<PaymentHistory> PaymentHistories { get; set; } = [];

    }

    public class StudentRoom
    {
        public int StudentRoomId { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime? FromDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? ToDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public int? CreatedUserId { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedUserId { get; set; } = default!;
        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [Required]
        [ForeignKey("SeatWithRoom")]
        public int SeatWithRoomId { get; set; }

        //Navigation

        public Student? Student { get; set; }
        public SeatWithRoom? SeatWithRoom { get; set; }
    }
    public class Request
    {
        public int RequestId { get; set; }
        [Required]
        public string RequestType { get; set; } = default!; //RoomChange Request, Maintenance Request
        [Required, StringLength(500)]
        public string RequestDetails { get; set; } = default!;
        public string Status { get; set; } = "Pending"; //Approved Done , Reject , Change by Admin
        [Required, Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; } = DateTime.Now;
        public int? CreatedUserId { get; set; } = default!;
        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedUserId { get; set; } = default!;
        public bool IsActive { get; set; } = true;
       
    }
    
    public class Notice
    {
            public int NoticeId { get; set; }

            [Required, StringLength(500)]
            public string Title { get; set; } = default!;

            [StringLength(1000)]
            public string NoticeFile { get; set; } = default!;

            [Required, Column(TypeName = "date")]
            public DateTime? CreatedDate { get; set; } = DateTime.Now;

            public int? CreatedUserId { get; set; } = default!;

            [Column(TypeName = "date")]
            public DateTime? ModifiedDate { get; set; }
            public int? ModifiedUserId { get; set; } = default!;
            public bool IsActive { get; set; } = true;
    }

   
    public class HallDbContext : IdentityDbContext<AppUser>
    {
        public HallDbContext(DbContextOptions<HallDbContext> options) : base(options) { }
        public DbSet<AppUser> AppUsers { get; set; } = default!;
        public DbSet<Feedback> Feedbacks { get; set; } = default!;
        public DbSet<Hall> Halls { get; set; } = default!;
        public DbSet<HallBlock> HallBlocks { get; set; } = default!;
        public DbSet<HallFloor> HallFloors { get; set; } = default!;
        public DbSet<PaymentHistory> PaymentHistories { get; set; } = default!;
        public DbSet<Room> Rooms { get; set; } = default!;
        public DbSet<SeatWithRoom> SeatWithRooms { get; set; } = default!;
        public DbSet<Student> Students { get; set; } = default!;
        public DbSet<StudentRoom> StudentRooms { get; set; } = default!;
        public DbSet<Request> Requests { get; set; } = default!;
        public DbSet<Notice> Notices  { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<HallBlock>()
                .HasOne(hb => hb.Hall)
                .WithMany(h => h.HallBlocks)
                .HasForeignKey(hb => hb.HallId);

            modelBuilder.Entity<HallFloor>()
                .HasOne(hf => hf.HallBlock)
                .WithMany(hb => hb.HallFloors)
                .HasForeignKey(hf => hf.HallBlockId);

            modelBuilder.Entity<Room>()
                .HasOne(r => r.HallFloor)
                .WithMany(hf => hf.Rooms)
                .HasForeignKey(r => r.HallFloorId);

            modelBuilder.Entity<SeatWithRoom>()
                .HasOne(swr => swr.Room)
                .WithMany(r => r.SeatWithRooms)
                .HasForeignKey(swr => swr.RoomId);

            modelBuilder.Entity<StudentRoom>()
                .HasOne(sr => sr.Student)
                .WithMany(s => s.StudentRooms)
                .HasForeignKey(sr => sr.StudentId);

            modelBuilder.Entity<StudentRoom>()
                .HasOne(sr => sr.SeatWithRoom)
                .WithMany(swr => swr.StudentRooms)
                .HasForeignKey(sr => sr.SeatWithRoomId);

            modelBuilder.Entity<PaymentHistory>()
                .HasOne(ph => ph.Student)
                .WithMany(s => s.PaymentHistories)
                .HasForeignKey(ph => ph.StudentId);

            // Seed data for each entity
            modelBuilder.Entity<Hall>().HasData(
                new Hall { HallId = 1, HallName = "Rose Hall", HallType = "Male", HallCapacity = 200, TotalRooms = 50, YearInaugurated = new DateTime(2005, 1, 1), IsActive = true },
                new Hall { HallId = 2, HallName = "Lily Hall", HallType = "Residential", HallCapacity = 150, TotalRooms = 30, YearInaugurated = new DateTime(2010, 1, 1), IsActive = true },
                new Hall { HallId = 3, HallName = "Tulip Hall", HallType = "Residential", HallCapacity = 100, TotalRooms = 20, YearInaugurated = new DateTime(2015, 1, 1), IsActive = true },
                new Hall { HallId = 4, HallName = "Jasmine Hall", HallType = "Residential", HallCapacity = 180, TotalRooms = 40, YearInaugurated = new DateTime(2020, 1, 1), IsActive = true },
                new Hall { HallId = 5, HallName = "Orchid Hall", HallType = "Residential", HallCapacity = 250, TotalRooms = 60, YearInaugurated = new DateTime(2000, 1, 1), IsActive = true }
            );

            modelBuilder.Entity<HallBlock>().HasData(
                new HallBlock { HallBlockId = 1, BlockName = "Block A", HallId = 1, IsActive = true },
                new HallBlock { HallBlockId = 2, BlockName = "Block B", HallId = 1, IsActive = true },
                new HallBlock { HallBlockId = 3, BlockName = "Block A", HallId = 2, IsActive = true },
                new HallBlock { HallBlockId = 4, BlockName = "Block B", HallId = 2, IsActive = true },
                new HallBlock { HallBlockId = 5, BlockName = "Block C", HallId = 3, IsActive = true }
            );

            modelBuilder.Entity<HallFloor>().HasData(
                new HallFloor { HallFloorId = 1, FloorNo = 1, HallBlockId = 1, IsActive = true },
                new HallFloor { HallFloorId = 2, FloorNo = 2, HallBlockId = 1, IsActive = true },
                new HallFloor { HallFloorId = 3, FloorNo = 1, HallBlockId = 2, IsActive = true },
                new HallFloor { HallFloorId = 4, FloorNo = 2, HallBlockId = 2, IsActive = true },
                new HallFloor { HallFloorId = 5, FloorNo = 3, HallBlockId = 3, IsActive = true }
            );

            modelBuilder.Entity<Room>().HasData(
                new Room { RoomId = 1, RoomNo = "101", RoomType = "Single", HallFloorId = 1, IsActive = true },
                new Room { RoomId = 2, RoomNo = "102", RoomType = "Double", HallFloorId = 1, IsActive = true },
                new Room { RoomId = 3, RoomNo = "201", RoomType = "Single", HallFloorId = 2, IsActive = true },
                new Room { RoomId = 4, RoomNo = "202", RoomType = "Double", HallFloorId = 2, IsActive = true },
                new Room { RoomId = 5, RoomNo = "301", RoomType = "Suite", HallFloorId = 3, IsActive = true }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student { StudentId = 1, StudentName = "Alice", Department = "CSE", RegistrationNumber = 12345, RollNumber = 101, DoB = new DateTime(2000, 1, 1), Gender = "Female", Session = "2018-19", StudentPhone = "01710000001", StudentEmail = "alice@example.com", PermanentAddress = "Dhaka", PresentAddress = "Dhaka", IsActive = true, Picture = "1.jpg" },
                new Student { StudentId = 2, StudentName = "Bob", Department = "EEE", RegistrationNumber = 12346, RollNumber = 102, DoB = new DateTime(2000, 2, 2), Gender = "Male", Session = "2018-19", StudentPhone = "01710000002", StudentEmail = "bob@example.com", PermanentAddress = "Chittagong", PresentAddress = "Chittagong", IsActive = true, Picture = "2.jpg" },
                new Student { StudentId = 3, StudentName = "Carol", Department = "BBA", RegistrationNumber = 12347, RollNumber = 103, DoB = new DateTime(2000, 3, 3), Gender = "Female", Session = "2018-19", StudentPhone = "01710000003", StudentEmail = "carol@example.com", PermanentAddress = "Sylhet", PresentAddress = "Sylhet", IsActive = true, Picture = "3.jpg" },
                new Student { StudentId = 4, StudentName = "Dave", Department = "MBA", RegistrationNumber = 12348, RollNumber = 104, DoB = new DateTime(2000, 4, 4), Gender = "Male", Session = "2018-19", StudentPhone = "01710000004", StudentEmail = "dave@example.com", PermanentAddress = "Khulna", PresentAddress = "Khulna", IsActive = true, Picture = "4.jpg" },
                new Student { StudentId = 5, StudentName = "Eve", Department = "Law", RegistrationNumber = 12349, RollNumber = 105, DoB = new DateTime(2000, 5, 5), Gender = "Female", Session = "2018-19", StudentPhone = "01710000005", StudentEmail = "eve@example.com", PermanentAddress = "Barisal", PresentAddress = "Barisal", IsActive = true, Picture = "5.jpg" }
            );       
        }
    }
}
