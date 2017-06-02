package io.acari;

import org.springframework.http.MediaType;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MessageStreamServlet extends HttpServlet {

    /**
     * Handle incoming GETs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        handleRequest(request, response);
    }

    private void handleRequest(HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Content-Type", MediaType.TEXT_PLAIN_VALUE + ";charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
        response.setHeader("Pragma", "no-cache");

        final PrintWriter writer = response.getWriter();
        writer.write("DOES WERK\n\n");
        writer.flush();
        writer.close();
    }
}
