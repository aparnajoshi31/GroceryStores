using Core.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderToReturnDto
    {
        public int Id{get;set;}
         public string BuyerEmail {get;set;}

        public IReadOnlyList<OrderItemDto> OrderItems {get;set;}

        public decimal SubTotal {get;set;}

       public decimal Total{get;set;}
    }
}