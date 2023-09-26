import { classNames } from "@/lib/functions";
import KebabMenu from "./KebabMenu";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};
const projects = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "GraphQL API",
    href: "#",
    status: "Complete",
    url: "/product-details-here",
    dueDate: "March 17, 2023",
    dueDateTime: "2023-03-17T00:00Z",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "New benefits plan",
    href: "#",
    status: "In progress",
    url: "/product-details-here",
    dueDate: "May 5, 2023",
    dueDateTime: "2023-05-05T00:00Z",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Onboarding emails",
    href: "#",
    status: "In progress",
    url: "/product-details-here",
    dueDate: "May 25, 2023",
    dueDateTime: "2023-05-25T00:00Z",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "iOS app",
    href: "#",
    status: "In progress",
    url: "/product-details-herer",
    dueDate: "June 7, 2023",
    dueDateTime: "2023-06-07T00:00Z",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Marketing site redesign",
    href: "#",
    status: "Archived",
    url: "/product-details-here",
    dueDate: "June 10, 2023",
    dueDateTime: "2023-06-10T00:00Z",
  },
];

export default async function ProductList() {
  const session = await getSession();

  if (!session) {
    return redirect('/auth/login');
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex">
              <img
                className="h-16 w-16 flex-none rounded-sm bg-gray-50"
                src={project.imageUrl}
                alt=""
              />
              <div className="ml-3 mt-2">
                <div className="flex items-start">
                  <p className="text-sm font-semibold leading-6 text-gray-900 mr-2">
                    {project.name}
                  </p>
                  <p
                    className={classNames(
                      statuses[project.status],
                      "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {project.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Last edited on{" "}
                    <time dateTime={project.dueDateTime}>
                      {project.dueDate}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <a
              href={project.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View live product<span className="sr-only">, {project.name}</span>
            </a>
            <KebabMenu />
          </div>
        </li>
      ))}
    </ul>
  );
}
