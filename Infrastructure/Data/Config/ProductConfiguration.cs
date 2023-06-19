using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p=> p.Id).IsRequired();
            builder.Property(p=>p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p=>p.Description).IsRequired();
            builder.Property(p=>p.AvailableQuantity).IsRequired();
            builder.Property(p=>p.ImageUrl).IsRequired();
            builder.Property(p=>p.Price).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(p=>p.Discount).HasColumnType("decimal(18,2)");
            builder.Property(p=>p.Specification).HasMaxLength(100);

           builder.HasOne(p => p.ProductCategory).WithMany().HasForeignKey(p=> p.ProductCategoryID);
        }
    }
}