using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class BasketItemDto
    {
        
        [Required]
        public int Id { get; set; }
        
        [Required]
        public string ProductName { get; set; }
        
        [Required]
        [Range(0.1,double.MaxValue,ErrorMessage ="Price Must be greater than zero")]
        public decimal Price { get; set; }
        
        [Required]
        [Range(1,double.MaxValue,ErrorMessage ="Quantity must be atlest 1")]
        public int Quantity { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        [Required]
        public string Category { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Discount {get;set;}

    }
}