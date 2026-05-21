package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.vertx.ext.web.RoutingContext;

@Path("/")
public class AuthResource {
    @Inject
RoutingContext context;

   @GET
@Produces(MediaType.TEXT_HTML)
public Response mainPage() {
String loginUser = context.session().get("loginUser");
System.out.println("=== [GET /] 세션 ID : " +
context.session().id());
System.out.println("=== [GET /] loginUser : " + loginUser);
String htmlPath = (loginUser != null)
? "META-INF/resources/login/main_after_login.html"
: "META-INF/resources/main_index.html";
InputStream html =
getClass().getClassLoader().getResourceAsStream(htmlPath);
return Response.ok(html).build();
}

    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public Response loginPage() {
        return loadHtml("META-INF/resources/login/login.html");
    }

    @POST
    @Path("/login_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
            @FormParam("username") String username,
            @FormParam("password") String password) {

        System.out.println("=================================");
        System.out.println("=== [LOGIN 요청 도착]");
        System.out.println("username : " + username);
        System.out.println("password : " + password);
        System.out.println("password length : " + (password == null ? "null" : password.length()));
        System.out.println("session id : " + context.session().id());
        System.out.println("=================================");

        if (username == null || username.trim().isEmpty()) {
            System.out.println("=== [LOGIN 실패] username 없음");
            return Response.seeOther(URI.create("/login?error=username_empty")).build();
        }

        if (password == null || password.trim().isEmpty()) {
            System.out.println("=== [LOGIN 실패] password 없음");
            return Response.seeOther(URI.create("/login?error=password_empty")).build();
        }

        User user = User.findByUsername(username);

        if (user == null) {
            System.out.println("=== [LOGIN 실패] 존재하지 않는 아이디");
            return Response.seeOther(URI.create("/login?error=not_found")).build();
        }

        System.out.println("=== [DB username] : " + user.username);
        System.out.println("=== [DB password] : " + user.password);
        System.out.println("=== [DB password length] : " + (user.password == null ? "null" : user.password.length()));

        if (user.password == null || !user.password.equals(password)) {
            System.out.println("=== [LOGIN 실패] 비밀번호 불일치");
            return Response.seeOther(URI.create("/login?error=password_wrong")).build();
        }

        context.session().put("loginUser", username);

        System.out.println("=== [LOGIN 성공]");
        System.out.println("=== 세션 저장 loginUser : " + context.session().get("loginUser"));
        System.out.println("=== 이동 주소 : /main_after_login");

        return Response
                .seeOther(URI.create("/main_after_login"))
                .build();
    }

    @GET
    @Path("/main_after_login")
    @Produces(MediaType.TEXT_HTML)
    public Response mainAfterLoginPage() {
        String loginUser = context.session().get("loginUser");

        System.out.println("=================================");
        System.out.println("=== [GET /main_after_login]");
        System.out.println("session id : " + context.session().id());
        System.out.println("loginUser : " + loginUser);
        System.out.println("=================================");

        if (loginUser == null) {
            System.out.println("=== [접근 차단] 로그인 세션 없음");
            return Response.seeOther(URI.create("/login?error=session_empty")).build();
        }

        return loadHtml("META-INF/resources/login/main_after_login.html");
    }

    @GET
    @Path("/logout")
    public Response logout() {
        System.out.println("=== 로그아웃 전 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 loginUser : " + context.session().get("loginUser"));

        context.session().destroy();

        return Response.seeOther(URI.create("/")).build();
    }

    @GET
    @Path("/register")
    @Produces(MediaType.TEXT_HTML)
    public Response registerPage() {
        return loadHtml("META-INF/resources/login/register.html");
    }

    @POST
    @Path("/register_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_HTML)
    public Response registerCheck(
            @FormParam("username") String username,
            @FormParam("password") String password,
            @FormParam("email") String email,
            @FormParam("phone") String phone) {

        System.out.println("=================================");
        System.out.println("=== [REGISTER 요청 도착]");
        System.out.println("username : " + username);
        System.out.println("email : " + email);
        System.out.println("phone : " + phone);
        System.out.println("password : " + password);
        System.out.println("password length : " + (password == null ? "null" : password.length()));
        System.out.println("=================================");

        if (username == null || username.trim().isEmpty()) {
            return Response.seeOther(URI.create("/register?error=username_empty")).build();
        }

        if (password == null || password.trim().isEmpty()) {
            return Response.seeOther(URI.create("/register?error=password_empty")).build();
        }

        if (email == null || email.trim().isEmpty()) {
            return Response.seeOther(URI.create("/register?error=email_empty")).build();
        }

        if (User.findByUsername(username) != null) {
            return Response.seeOther(URI.create("/register?error=duplicate_username")).build();
        }

        if (User.findByEmail(email) != null) {
            return Response.seeOther(URI.create("/register?error=duplicate_email")).build();
        }

        User newUser = new User();
        newUser.username = username;
        newUser.password = password;
        newUser.email = email;
        newUser.phone = phone;
        newUser.persist();

        System.out.println("=== [REGISTER 성공] DB 저장 완료");

        return Response.seeOther(URI.create("/register_success")).build();
    }

    @GET
    @Path("/register_success")
    @Produces(MediaType.TEXT_HTML)
    public Response registerSuccess() {
        return loadHtml("META-INF/resources/login/register_success.html");
    }

    private Response loadHtml(String htmlPath) {
        System.out.println("=== [HTML 로드 시도] " + htmlPath);

        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream(htmlPath);

        if (html == null) {
            System.out.println("=== [HTML 로드 실패] 파일 없음 : " + htmlPath);
            return Response.status(404)
                    .type(MediaType.TEXT_PLAIN)
                    .entity("HTML 파일을 찾을 수 없습니다: " + htmlPath)
                    .build();
        }

        System.out.println("=== [HTML 로드 성공] " + htmlPath);
        return Response.ok(html).build();
    }
}