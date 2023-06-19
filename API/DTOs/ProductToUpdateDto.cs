namespace API.DTOs
{
    public class ProductToUpdateDto
    {
        
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int ProductCategoryID { get; set; }
        public int AvailableQuantity { get; set; }
        public decimal Discount { get; set; }
        public string Specification { get; set; }
    }
}