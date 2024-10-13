import React, { useState } from "react";
import { Dialog, Menu, Transition, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon,
  Cog6ToothIcon,
  CalendarIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import ngFlag from "../assets/images/ng.png";
import { getAuth } from "firebase/auth";
import ProfileDropdown from "../components/ProfileDropdown";


const notifications = [
  {
    id: 1,
    type: "settings",
    content: "Your settings have been updated",
    time: "5 minutes ago",
    icon: Cog6ToothIcon,
  },
  {
    id: 2,
    type: "event",
    content: "New event: Team meeting",
    time: "1 hour ago",
    icon: CalendarIcon,
  },
  {
    id: 3,
    type: "profile",
    content: "Your profile has been viewed",
    time: "2 hours ago",
    icon: UserCircleIcon,
  },
  {
    id: 4,
    type: "error",
    content: "Application error: Please check logs",
    time: "3 hours ago",
    icon: ExclamationTriangleIcon,
  },
];

const searchableItems = [
  { name: "Dashboard", route: "/" },
  { name: "Products", route: "/products" },
  { name: "Favorites", route: "/favorites" },
  { name: "Inbox", route: "/inbox" },
  { name: "Order Lists", route: "/order-lists" },
  { name: "Product Stock", route: "/product-stock" },
  { name: "Pricing", route: "/pricing" },
  { name: "Calendar", route: "/calendar" },
  { name: "To-Do", route: "/to-do" },
  { name: "Contact", route: "/contact" },
  { name: "Invoice", route: "/invoice" },
  { name: "UI Elements", route: "/ui-elements" },
  { name: "Team", route: "/team" },
  { name: "Table", route: "/table" },
  { name: "Settings", route: "/settings" },
];

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Products", href: "/products", current: false },
  { name: "Favorites", href: "/favorites", current: false },
  { name: "Inbox", href: "/inbox", current: false },
  { name: "Order Lists", href: "/order-lists", current: false },
  { name: "Product Stock", href: "/product-stock", current: false },
];

const pages = [
  { name: "Pricing", href: "/pricing" },
  { name: "Calendar", href: "/calendar" },
  { name: "To-Do", href: "/to-do" },
  { name: "Contact", href: "/contact" },
  { name: "Invoice", href: "/invoice" },
  { name: "UI Elements", href: "/ui-elements" },
  { name: "Team", href: "/team" },
  { name: "Table", href: "/table" },
];

const userNavigation = [
  { name: "Settings", href: "/settings" },
  { name: "Logout", href: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredResults = searchableItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (route) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(route);
  };
  
  const auth = getAuth()
  const onLoggedOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
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
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <Transition.Child
                  as={React.Fragment}
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
                    <h1 className="text-xl font-bold text-white ">
                      <span className="text-blue-500">Dash</span>Stack
                    </h1>
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-blue-500 px-0 py-3 text-white w-5/6"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {location.pathname === item.href && (
                          <span
                            className=" inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-md rounded-br-md"
                            aria-hidden="true"
                          ></span>
                        )}
                        <span
                          className={
                            location.pathname === item.href
                              ? "text-white"
                              : ""
                          }
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-5 px-2">
                    <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Pages
                    </h3>
                    <nav className="mt-2 space-y-1">
                      {pages.map((page) => (
                        <Link
                          key={page.name}
                          to={page.href}
                          className={classNames(
                            location.pathname === page.href
                              ? "bg-blue-500 px-0 py-3 text-white w-5/6"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {page.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-5 px-2">
                    <nav className="mt-2 space-y-1">
                      {/* {userNavigation.map((page) => (
                        <Link
                          key={page.name}
                          to={page.href}
                          className={classNames(
                            location.pathname === page.href
                              ? "bg-customBlue text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          onClick={() => setSidebarOpen(true)}
                        >
                          {page.name}
                        </Link>
                      ))} */}
                      <Link
                        key="settings"
                        to="/settings"
                        className={classNames(
                          location.pathname === "/settings"
                            ? "bg-blue-500 px-0 py-3 text-white w-5/6"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        onClick={() => setSidebarOpen(false)}
                      >
                        Settings
                      </Link>
                    </nav>
                    <nav className="mt-2 space-y-1">
                      {/* {userNavigation.map((page) => (
                        <Link
                          key={page.name}
                          to={page.href}
                          className={classNames(
                            location.pathname === page.href
                              ? "bg-customBlue text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          onClick={() => setSidebarOpen(true)}
                        >
                          {page.name}
                        </Link>
                      ))} */}
                      <p
                        className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        onClick={() => {
                          setSidebarOpen(false);
                          onLoggedOut();
                        }}
                      >
                        Log out
                      </p>
                    </nav>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0"></div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex flex-grow flex-col overflow-y-auto bg-gray-800 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-white ">
                <span className="text-blue-500">Dash</span>Stack
              </h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2 border-b border-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-blue-500 text-white px-0 py-3 w-5/6"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  {location.pathname === item.href && (
                    <span
                      className=" inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-md rounded-br-md"
                      aria-hidden="true"
                    ></span>
                  )}
                  <span
                    className={
                      location.pathname === item.href ? "text-white" : ""
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="mt-5 px-2">
              <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                Pages
              </h3>
              <nav className="mt-2 space-y-1 border-b border-gray-700">
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className={classNames(
                      location.pathname === page.href
                        ? "bg-blue-500 px-0 py-3 text-white w-5/6"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-5 px-2">
              <nav className="mt-2 space-y-1">
                {/* {userNavigation.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className={classNames(
                      location.pathname === page.href
                        ? "bg-customBlue text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setSidebarOpen(true)}
                  >
                    {page.name}
                  </Link>
                ))} */}
                <Link
                  key="settings"
                  to="/settings"
                  className={classNames(
                    location.pathname === "/settings"
                      ? "bg-blue-500 px-0 py-3 text-white w-5/6"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  Settings
                </Link>
              </nav>
              <nav className="mt-2 space-y-1">
                {/* {userNavigation.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className={classNames(
                      location.pathname === page.href
                        ? "bg-customBlue text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    onClick={() => setSidebarOpen(true)}
                  >
                    {page.name}
                  </Link>
                ))} */}
                <p
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  onClick={() => {
                    setSidebarOpen(false);
                    onLoggedOut();
                  }}
                >
                  Log out
                </p>
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation bar */}
        <header className="bg-gray-800 shadow">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-end">
              <button
                type="button"
                className="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="ml-4 flex-shrink-0 lg:hidden">
                <h1 className="text-xl font-bold text-white hidden sm:block">
                  <span className="text-blue-500">Dash</span>Stack
                </h1>
              </div>
            </div>
            <div className="flex-1 px-2 text-sm flex justify-center lg:ml-6 lg:justify-start">
              <div className=" max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only text-sm">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-2xl leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-gray-700 focus:ring-gray-700 focus:text-white sm:text-sm"
                    placeholder="Search"
                    type="search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                {searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 text-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {searchResults.map((result) => (
                      <div
                        key={result.route}
                        className="cursor-pointer hover:bg-gray-700 px-4 py-2"
                        onClick={() => handleSearchResultClick(result.route)}
                      >
                        {result.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Popover className="relative text-white">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-white" : "text-gray-400",
                          "relative p-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        )}
                      >
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                          {notifications.length}
                        </span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-gray-800  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-white">
                              Notifications
                            </h3>
                          </div>
                          <div className="max-h-80 overflow-y-auto text-white">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className="px-4 py-3  hover:bg-gray-600 transition duration-150 ease-in-out flex items-start"
                              >
                                <notification.icon className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-white">
                                    {notification.content}
                                  </p>
                                  <p className="text-xs text-white mt-1">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-2 border-t border-gray-200">
                            <a
                              href="#"
                              className="text-sm font-medium text-blue-600 hover:text-white"
                            >
                              View all notifications
                            </a>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
              <div className="hidden md:ml-4 md:flex md:items-center">
                <img src={ngFlag} alt="Nig Flag" className="h-4 w-6 mr-2" />
                <span className="text-sm text-white">English</span>
                <ChevronDownIcon
                  className="ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <ProfileDropdown />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
