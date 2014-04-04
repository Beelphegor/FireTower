using System;
using AcklenAvenue.Data;
using FluentNHibernate.Automapping;
using FluentNHibernate.Cfg;
using FluentNHibernate.Conventions.Helpers;
using FireTower.Domain;

namespace FireTower.Data
{
    public class MappingScheme : IDatabaseMappingScheme<MappingConfiguration>
    {
        public Action<MappingConfiguration> Mappings
        {
            get
            {
                var autoPersistenceModel = AutoMap.Assemblies(typeof (IEntity).Assembly)
                                                  .Where(t => typeof (IEntity).IsAssignableFrom(t))
                                                  .UseOverridesFromAssemblyOf<UserSessionAutoMappingOverride>()
                                                  
                    //.IncludeBase<LessonActionBase>()
                                                  .Conventions.Add(DefaultCascade.SaveUpdate());

                return x => x.AutoMappings.Add(autoPersistenceModel);
            }
        }
    }
}