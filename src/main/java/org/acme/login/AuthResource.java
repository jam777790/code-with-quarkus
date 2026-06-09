package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.jboss.resteasy.reactive.RestForm;

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

    @GET
    @Path("/profile")
    @Produces(MediaType.TEXT_HTML)
    public Response profilePage() {
    // ①세션체크(로그인안한사용자차단)
    String loginUser = context.session().get("loginUser");
    if (loginUser == null) {
    return Response
    .seeOther(URI.create("/login"))
    .build();
    }
    // ②DB에서사용자정보조회
    User user = User.findByUsername(loginUser);
    // ③세션에사용자정보저장(HTML에서활용)
    context.session().put("userEmail", user.email);
    context.session().put("userPhone", user.phone);
    context.session().put("profileImage",
    user.profileImage != null ? user.profileImage : "default.png");
    // ④프로필페이지반환
    InputStream html = getClass()
    .getClassLoader()
    .getResourceAsStream(
    "META-INF/resources/login/profile.html");
    return Response.ok(html).build();
    }

    @GET
    @Path("/profile/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response profileInfo() {
    // 세션 체크
    String loginUser = context.session().get("loginUser");
    if (loginUser == null) {
    return Response.status(401).build();
    }
    // DB 조회
    User user = User.findByUsername(loginUser);
    // JSON 응답
    return Response.ok(
    Map.of(
    "username", user.username,
    "email", user.email != null ? user.email : "",
    "phone", user.phone != null ? user.phone : "",
    "profileImage", user.profileImage != null
    ? user.profileImage : ""
    )
    ).build();
    }

    @POST
@Path("/profile/upload")
@Transactional
@Consumes(MediaType.MULTIPART_FORM_DATA)
public Response profileUpload(
        @RestForm("profileImage") org.jboss.resteasy.reactive.multipart.FileUpload file) {

    String loginUser = context.session().get("loginUser");

    if (loginUser == null) {
        return Response
                .seeOther(URI.create("/login"))
                .build();
    }

    try {
        if (file == null || file.fileName() == null || file.fileName().isEmpty()) {
            return Response
                    .seeOther(URI.create("/profile?error=no_file"))
                    .build();
        }

        String original = file.fileName();

        if (!original.contains(".")) {
            return Response
                    .seeOther(URI.create("/profile?error=invalid_type"))
                    .build();
        }

        String ext = original.substring(original.lastIndexOf('.') + 1).toLowerCase();

        if (!ext.matches("jpg|jpeg|png|gif|webp")) {
            return Response
                    .seeOther(URI.create("/profile?error=invalid_type"))
                    .build();
        }

        if (file.size() > 5 * 1024 * 1024) {
            return Response
                    .seeOther(URI.create("/profile?error=too_large"))
                    .build();
        }

        String newFileName = UUID.randomUUID() + "." + ext;

        java.nio.file.Path uploadDir = Paths.get(
                "src/main/resources/META-INF/resources/uploads/profile"
        );

        java.nio.file.Files.createDirectories(uploadDir);

        java.nio.file.Files.copy(
                file.uploadedFile(),
                uploadDir.resolve(newFileName),
                java.nio.file.StandardCopyOption.REPLACE_EXISTING
        );

        User user = User.findByUsername(loginUser);
        user.profileImage = newFileName;

        return Response
                .seeOther(URI.create("/profile"))
                .build();

    } catch (Exception e) {
        e.printStackTrace();

        return Response
                .seeOther(URI.create("/profile?error=upload_fail"))
                .build();
    }
}

@POST
@Path("/profile/update")
@Transactional
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public Response profileUpdate(
        @FormParam("email") String email,
        @FormParam("phone") String phone) {

    String loginUser = context.session().get("loginUser");

    if (loginUser == null) {
        return Response
                .seeOther(URI.create("/login"))
                .build();
    }

    User found = User.findByEmail(email);

    if (found != null && !found.username.equals(loginUser)) {
        return Response
                .seeOther(URI.create("/profile?error=duplicate_email"))
                .build();
    }

    User user = User.findByUsername(loginUser);

    user.email = email;
    user.phone = phone;

    return Response
            .seeOther(URI.create("/profile?success=updated"))
            .build();
}

@POST
@Path("/profile/password")
@Transactional
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public Response profilePassword(
        @FormParam("currentPassword") String currentPassword,
        @FormParam("newPassword") String newPassword) {

    String loginUser = context.session().get("loginUser");

    if (loginUser == null) {
        return Response
                .seeOther(URI.create("/login"))
                .build();
    }

    User user = User.findByUsername(loginUser);

    if (user == null) {
        return Response
                .seeOther(URI.create("/login"))
                .build();
    }

    if (user.password == null || !user.password.equals(currentPassword)) {
        return Response
                .seeOther(URI.create("/profile?error=wrong_password"))
                .build();
    }

    user.password = newPassword;

    return Response
            .seeOther(URI.create("/profile?success=password_changed"))
            .build();
}
}


