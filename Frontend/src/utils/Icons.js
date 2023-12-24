import {
  ArrowLeftCircleIcon,
  Bars3Icon,
  DocumentArrowUpIcon,
  HomeIcon,
  ListBulletIcon,
  PlusCircleIcon,
  PresentationChartBarIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Icons = (str) => {
  switch (str) {
    case "ArrowLeftCircleIcon":
      return (
        <ArrowLeftCircleIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );
    case "Bars3Icon":
      return (
        <Bars3Icon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "DocumentArrowUpIcon":
      return (
        <DocumentArrowUpIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "HomeIcon":
      return (
        <HomeIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "PlusCircleIcon":
      return (
        <PlusCircleIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "PresentationChartBarIcon":
      return (
        <PresentationChartBarIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "UsersIcon":
      return (
        <UsersIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "XMarkIcon":
      return (
        <XMarkIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );

    case "ListBulletIcon":
      return (
        <ListBulletIcon
          className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
          aria-hidden="true"
        />
      );
  }
};
export default Icons;
