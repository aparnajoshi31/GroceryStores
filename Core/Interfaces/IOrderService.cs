using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IOrderService
    {
         Task<Order> CreateOrderAsync(string buyerEmail,string basketId);

         Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);

         Task<Order> GetOrderByIdAsync(int id , string buyerEmail);

         
    }
}