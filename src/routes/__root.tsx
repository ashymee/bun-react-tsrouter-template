import {createRootRoute, Link, Outlet} from "@tanstack/react-router";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        {[
          {to: "/", title: "Home"},
          {to: "/about", title: "About"},
        ].map((item, index) => (
          <Link key={index} to={item.to} className="[&.active]:font-bold">
            {item.title}
          </Link>
        ))}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
