using System.Runtime.Serialization.Json;
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {

            if (!context.ProductCategories.Any())
            {
                var categoriesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var categories = JsonSerializer.Deserialize<List<ProductCategory>>(categoriesData);

                context.ProductCategories.AddRange(categories);
                //context.Products.AddRange((IEnumerable<Product>)types);
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                context.Products.AddRange(products);
            }
            
    

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();

        }
    }
}