namespace Core.Entities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity,decimal discount)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
            Discount = discount;
        }

        public ProductItemOrdered ItemOrdered {get;set;}

        public decimal Price {get;set;}

        public int Quantity {get;set;}

        public decimal Discount{get;set;}
        
    }
}