namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;

        private int pageSize = 5;

        public int PageSize
        {
            get => pageSize;
            //client will not be able to set the maxpagesize after 50
            set => pageSize = (value > MaxPageSize ? MaxPageSize : value);

        }

        public int? CategoryId { get; set; }

        public string Sort { get; set; }

        public string search;

        public string Search{
            get =>  search;
            set =>  search = value.ToLower();
        }
    }
}