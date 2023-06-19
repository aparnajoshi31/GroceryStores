using Core.Entities;
using System.Threading.Tasks;
namespace Core.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> GetProductByIDAsync(int id);
        Task<IReadOnlyList<Product>> GetProductsAsync();

        Task<IReadOnlyList<ProductCategory>> GetProductCategoriesAsync();

    }
}