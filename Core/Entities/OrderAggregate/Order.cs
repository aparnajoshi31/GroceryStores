namespace Core.Entities.OrderAggregate
{
    public class Order:BaseEntity
    {
        public Order()
        {
        }
        public Order(IReadOnlyList<OrderItem> orderItems,string buyerEmail, decimal subTotal)
        {
            BuyerEmail = buyerEmail;
            OrderItems = orderItems;
            SubTotal = subTotal;
        }

        public string BuyerEmail {get;set;}

        public DateTime OrderDate {get;set;} = DateTime.UtcNow;

        public IReadOnlyList<OrderItem> OrderItems {get;set;}

        public decimal SubTotal {get;set;}

        public decimal GetTotal(){
            return SubTotal;
        }
    }
}