namespace FireTower.Domain
{
    public class EmailBodyRenderer : IEmailBodyRenderer
    {
        readonly ITemplateProvider _templateProvider;
        readonly IViewEngine _viewEngine;

        public EmailBodyRenderer(ITemplateProvider templateProvider, IViewEngine viewEngine)
        {
            _templateProvider = templateProvider;
            _viewEngine = viewEngine;
        }

        public string Render<T>(T model)
        {
            return _viewEngine.Render(model, _templateProvider.GetTemplateFor(model));
        }
    }
}