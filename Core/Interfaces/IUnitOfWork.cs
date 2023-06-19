using Core.Entities;

namespace Core.Interfaces
{
    public interface  IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
    
        //This will save the number of changes
        Task<int> Complete();
    }
}