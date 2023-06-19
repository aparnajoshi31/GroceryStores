using API.DTOs;
using AutoMapper;
using Core.Entities.OrderAggregate;


namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration config;
        public OrderItemUrlResolver(Microsoft.Extensions.Configuration.IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrdered.ImageUrl)){
                return config["ApiUrl"] + source.ItemOrdered.ImageUrl;
            }

            return null;
        }
    }
}