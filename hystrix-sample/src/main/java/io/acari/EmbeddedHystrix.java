package io.acari;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.WebRequest;

@Controller
public class EmbeddedHystrix {
    @RequestMapping("/hystrix")
    public String home(Model model, WebRequest request) {
        model.addAttribute("basePath", extractPath(request));
        return "hystrix/index";
    }

    private String extractPath(WebRequest request) {
        String path = request.getContextPath()
                + request.getAttribute("org.springframework."
                        + "web.servlet.HandlerMapping.pathWithinHandlerMapping",
                RequestAttributes.SCOPE_REQUEST);
        return path;
    }
}
