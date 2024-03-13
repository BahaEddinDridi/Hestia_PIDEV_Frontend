interface SidebarprofilProps {
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const Sidebarprofil: React.FC<SidebarprofilProps> = ({ activeSection, setActiveSection }) => {
    return (
      <div className="">
  
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2  ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-label="Toggle Sidebar"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
  
        <aside
          id="separator-sidebar"
          className="fixed top-30sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-5  py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  onClick={() => setActiveSection('personal')}
                  className={`flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${activeSection === 'personal' ? 'bg-red-500 text-white' : ''
                    }`}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  <span className="ms-3">Personal Information</span>
                </a>
              </li>
  
            </ul>
            
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  onClick={() => setActiveSection('other')}
                  className={`flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group ${activeSection === 'other' ? 'bg-red-500 text-white' : ''
                    }`}
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2a5 5 0 0 1 5 5c0 .99-.29 1.91-.78 2.68a8.019 8.019 0 0 0-2.48-1.8c-.13-.07-.27-.13-.4-.2-.15-.09-.29-.18-.43-.27-.24-.16-.48-.33-.73-.49-.36-.24-.72-.49-1.08-.73-.39-.26-.79-.52-1.19-.77-.17-.11-.34-.22-.51-.32-.15-.09-.31-.17-.46-.26-.32-.18-.65-.37-1.01-.54-.16-.08-.33-.16-.5-.23-.15-.06-.3-.13-.45-.19-.22-.1-.44-.2-.67-.29-.11-.05-.23-.1-.35-.15a5 5 0 0 1 8.45-4.29c.1.15.2.31.29.46s.17.3.25.46.15.32.22.48c.13.27.26.54.37.82a8.019 8.019 0 0 0-2.59 1.85A5 5 0 0 1 12 4zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"></path>
                  </svg>
                  <span className="ms-3">Other Information</span>
                </a>
              </li>
  
            </ul>
          </div>
        </aside>
  
  
  
  
      </div>
    );
  }
  
  export default Sidebarprofil;