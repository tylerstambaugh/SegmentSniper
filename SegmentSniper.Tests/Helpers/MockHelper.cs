//using Moq;
//using SegmentSniper.Tests.Helpers;
//using System.Data.Entity;
////using Microsoft.EntityFrameworkCore;
//using System.Data.Entity.Infrastructure;
//using System.Linq.Expressions;

//namespace SegmentSniper.Tests.Helper
//{
//    public static class MockHelper
//    {
//        public abstract class MockableDbSetWithExtensions<T> : DbSet<T> where T : class
//        {
//            public abstract void AddOrUpdate(params T[] entities);
//            public abstract void AddOrUpdate(Expression<Func<T, object>> identifierExpression, params T[] entities);
//        }

//        /// <summary>
//        /// Creates a queryable Mock DbSet populated with the data supplied.
//        /// </summary>
//        /// <typeparam name="T"></typeparam>
//        /// <param name="data"></param>
//        /// <returns></returns>
//        public static Mock<MockableDbSetWithExtensions<T>> CreateMockDbSet<T>(List<T> data = null) where T : class
//        {
//            data = data ?? new List<T>();
//            var queryable = data.AsQueryable();
//            var mockSet = new Mock<MockableDbSetWithExtensions<T>>();

//            ConfigureQueryable(mockSet, queryable);

//            ConfigureFind(data, mockSet);

//            ConfigureAdd(data, mockSet);

//            ConfigureAddRange(data, mockSet);

//            ConfigureAddOrUpdate(data, mockSet);

//            ConfigureRemove(data, mockSet);

//            ConfigureAsNoTracking(mockSet);

//            //Simulate Include - Include call on mock simply returns the mock
//            mockSet.Setup(m => m.Include(It.IsAny<string>())).Returns(mockSet.Object);

//            return mockSet;
//        }

//        private static void ConfigureQueryable<T>(Mock<MockableDbSetWithExtensions<T>> mockSet, IQueryable<T> queryable) where T : class
//        {
//            mockSet
//                .As<IQueryable<T>>()
//                .Setup(m => m.Expression)
//                .Returns(queryable.Expression);
//            mockSet
//                .As<IQueryable<T>>()
//                .Setup(m => m.ElementType)
//                .Returns(queryable.ElementType);
//            mockSet
//                .As<IQueryable<T>>()
//                .Setup(m => m.GetEnumerator())
//                .Returns(queryable.GetEnumerator());
//            mockSet
//                .As<IDbAsyncEnumerable<T>>()
//                .Setup(m => m.GetAsyncEnumerator())
//                .Returns(new TestDbAsyncEnumerator<T>(queryable.GetEnumerator()));
//            mockSet
//                .As<IQueryable<T>>()
//                .Setup(m => m.Provider)
//                .Returns(new TestDbAsyncQueryProvider<T>(queryable.Provider));
//        }

//        private static void ConfigureFind<T>(List<T> data, Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            mockSet
//                .Setup(m => m.Find(It.IsAny<int>()))
//                .Returns<object[]>(i =>
//                {
//                    T foundObject = null;
//                    return foundObject;
//                });

//            mockSet
//                .Setup(m => m.Find(It.IsAny<long>()))
//                .Returns<object[]>(i =>
//                {
//                    T foundObject = null;
//                    return foundObject;
//                });

//            mockSet
//                .Setup(m => m.Find(It.IsAny<Guid>()))
//                .Returns<object[]>(i =>
//                {
//                    T foundObject = null;
//                    return foundObject;
//                });
//        }

//        private static void ConfigureAdd<T>(List<T> data, Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            T returnObject = null;
//            mockSet
//                .Setup(m => m.Add(It.IsAny<T>()))
//                .Callback<T>(t =>
//                {
//                    returnObject = t;
//                    data.Add(t);
//                })
//                .Returns(returnObject);
//        }

//        private static void ConfigureAddRange<T>(List<T> data, Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            IEnumerable<T> returnCollection = null;
//            mockSet
//                .Setup(m => m.AddRange(It.IsAny<IEnumerable<T>>()))
//                .Callback<IEnumerable<T>>(t =>
//                {
//                    returnCollection = t;
//                    data.AddRange(t);
//                })
//                .Returns(returnCollection);

//        }

//        private static void ConfigureAddOrUpdate<T>(List<T> data, Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            mockSet
//                .Setup(x => x.AddOrUpdate(It.IsAny<T[]>()))
//                .Callback<T[]>(entities =>
//                {
//                    foreach (var item in entities)
//                    {
//                        if (!data.Contains(item))
//                            data.Add(item);
//                    }
//                });
//        }

//        private static void ConfigureRemove<T>(List<T> data, Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            T returnObject = null;
//            mockSet
//                .Setup(m => m.Remove(It.IsAny<T>()))
//                .Callback<T>(t =>
//                {
//                    returnObject = t;
//                    data.Remove(t);
//                })
//                .Returns(returnObject);
//        }

//        public static Expression<Func<T, object>>[] AnyIncludes<T>() where T : class
//        {
//            return It.IsAny<Expression<Func<T, object>>[]>();
//        }

//        private static void ConfigureAsNoTracking<T>(Mock<MockableDbSetWithExtensions<T>> mockSet) where T : class
//        {
//            mockSet
//                .Setup(m => m.AsNoTracking())
//                .Returns(() => mockSet.Object);
//        }
//    }
//}
