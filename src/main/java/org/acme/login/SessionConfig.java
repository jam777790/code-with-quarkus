package org.acme.login;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;
import jakarta.enterprise.event.Observes;
import io.quarkus.vertx.http.HttpServerStart;
import jakarta.inject.Inject;
import io.vertx.core.Vertx;

public class SessionConfig {
    @Inject
    Vertx vertx;
    public void init(@Observes Router router) {
        router.route().handler(
            SessionHandler
                .create(LocalSessionStore.create(vertx))
                .setSessionTimeout(60 * 60 * 1000L) // 1시간
                .setCookieHttpOnlyFlag(true)
        );
    }
}