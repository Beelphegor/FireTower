using System;
using AcklenAvenue.Testing.Moq;
using AcklenAvenue.Testing.Nancy;
using Machine.Specifications;
using Moq;
using Nancy;
using Nancy.Testing;
using FireTower.Domain;
using FireTower.Domain.Entities;
using It = Machine.Specifications.It;

namespace FireTower.Api.Specs.Users
{
    public class when_logging_in_with_correct_credentials_but_user_is_not_activated : given_a_login_module_context
    {
        const string EmailAddress = "some@email.com";
        const string Password = "password";
        static readonly Guid Token = Guid.NewGuid();
        static BrowserResponse _result;
        static User _matching;
        static UserSession _userSession;
        static DateTime _expires;

        Establish context =
            () =>
                {
                    var encryptedPassword = new EncryptedPassword("encrypted password");
                    Mock.Get(PasswordEncryptor).Setup(x => x.Encrypt(Password)).Returns(encryptedPassword);

                    _matching = new User
                                    {
                                        Email = EmailAddress,
                                        EncryptedPassword = encryptedPassword.Password,
                                        Activated = false
                                    };

                    Mock.Get(ReadOnlyRepository).Setup(
                        x =>
                        x.First(
                            ThatHas.AnExpressionFor<User>().ThatMatches(_matching).ThatDoesNotMatch(new User()).Build()))
                        .Returns(_matching);
                };

        Because of =
            () => _result = Browser.PostSecureJson("/login", new { email = EmailAddress, password = Password });

        It should_return_a_bad_request =
            () => _result.StatusCode.ShouldEqual(HttpStatusCode.Forbidden);
    }
}