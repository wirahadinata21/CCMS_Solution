using Microsoft.EntityFrameworkCore;
using CCMS.Student.API.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace CCMS.Student.API.Data;

public class StudentDbContext : DbContext
{
    public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }

    public DbSet<CCMS.Student.API.Entities.Student> Students => Set<CCMS.Student.API.Entities.Student>();
    public DbSet<Guardian> Guardians => Set<Guardian>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Mendukung audit trail otomatis atau konfigurasi khusus ECDA jika perlu
        base.OnModelCreating(modelBuilder);
    }
}