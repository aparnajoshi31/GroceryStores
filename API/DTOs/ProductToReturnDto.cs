using Core.Entities;

namespace API.DTOs
{
    //moving data between layers 
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string ProductCategory { get; set; }
        public int AvailableQuantity { get; set; }
        public decimal Discount { get; set; }
        public string Specification { get; set; }

    }
}