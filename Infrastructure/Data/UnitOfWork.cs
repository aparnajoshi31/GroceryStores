using System.Collections;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        public StoreContext context { get; }
        private Hashtable _repositories;
        public UnitOfWork(StoreContext context)
        {
            this.context = context;
        }

        public async Task<int> Complete()
        {
           return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (_repositories == null) _repositories = new Hashtable();

            //getting the type of entity
            var type = typeof(TEntity).Name;

            if (!_repositories.ContainsKey(type))
            {

                var repositoryType = typeof(GenericRepository<>);

                //creating an instance of the Repository
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType
                (typeof(TEntity)), context);

                //Adding the repository to the HashTable
                _repositories.Add(type, repositoryInstance);

            }

            return (IGenericRepository<TEntity>)_repositories[type];
        }
    }
}