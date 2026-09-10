export type Route = `/users/${string}` | `/posts/${string}` | '/home';

export function navigate(route: Route) {
  window.location.href = route;
}

