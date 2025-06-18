import {createApiRoutes} from "@/lib/api-router";

export const greetings = createApiRoutes({
  "/api/hello": {
    async GET(_req) {
      return Response.json({
        message: "Hello, world!",
        method: "GET",
      });
    },
    async PUT(_req) {
      return Response.json({
        message: "Hello, world!",
        method: "PUT",
      });
    },
  },

  "/api/hello/:name": async (req) => {
    const name = req.params.name;
    return Response.json({
      message: `Hello, ${name}!`,
    });
  },
});
