import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeNavOptions } from "../redux/dashboard/dashboardSlice.js";
import Icons from "../utils/Icons.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { options } = useSelector((state) => state.dashboard);
  const handleSidebarNavClick = (index, mobile) => {
    //this will not work if we do
    // dummyArr=navoptions because it is a deep copy same ref
    if (mobile) {
      setSidebarOpen(false);
    }
    dispatch(changeNavOptions(index));
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#191a56]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <h3 className="text-white">Welcome, School Name</h3>
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {options.map((item, index) => {
                        return (
                          <Link to={item.link}>
                            <div
                              onClick={() =>
                                handleSidebarNavClick(index, "mobile")
                              }
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "bg-white text-slate-600"
                                  : "text-white hover:bg-slate-100 hover:bg-opacity-20",
                                "group cursor-pointer flex items-center px-2 py-2 text-base font-medium rounded-md"
                              )}
                            >
                              <item.icon
                                className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300"
                                aria-hidden="true"
                              />
                              {item.name}
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64">
          <div className=" flex min-h-0 flex-1 flex-col bg-[#191a56]">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <h2 className="text-white">Desktop sidebar</h2>
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {options.map((item, index) => {
                  return (
                    <Link to={item.link}>
                      <div
                        onClick={() => handleSidebarNavClick(index)}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-white text-slate-600"
                            : "text-white hover:bg-slate-100 hover:bg-opacity-20",
                          "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        {Icons(item.icon)}

                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
