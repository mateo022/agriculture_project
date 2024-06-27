using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using System;
using RestAPIBackendWebService.Domain.Lot.Entities;

public class RestAPIDbContext : DbContext
{
    public RestAPIDbContext(DbContextOptions<RestAPIDbContext> options)
        : base(options)
    {
    }

    public DbSet<FarmEntity> Farms { get; set; }
    public DbSet<LotEntity> Lots { get; set; }
    public DbSet<GroupEntity> Groups { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FarmEntity>()
            .HasMany(f => f.Lots)
            .WithOne(l => l.Farm)
            .HasForeignKey(l => l.FarmId);

        modelBuilder.Entity<LotEntity>()
            .HasMany(l => l.Groups)
            .WithOne(g => g.Lot)
            .HasForeignKey(g => g.LotId);
    }
}
